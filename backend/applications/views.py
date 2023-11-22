from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, ListAPIView, CreateAPIView
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.db.models import Q

from notifications.models import PetSeekerNotification, ShelterNotification, create_notification
from .serializers import ApplicationSerializer
from .models import Application
from listings.models import Listing
from rest_framework.viewsets import ModelViewSet
from applications.serializers import ApplicationSerializer
from applications.models import Application
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from petpal.helpers import required_fields, optional_fields
from .pagination import SmallNonCustomizablePaginationBatch
from accounts.models import User
from django.urls import reverse_lazy


# Create your views here.
class ApplicationsViewSet(ModelViewSet):
    # View set for Applications

    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()
    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = SmallNonCustomizablePaginationBatch

    def get_queryset(self):

        user = self.request.user 

        # getting applications associated with a given shelter
        if user.is_shelter:
            listings = [listing.id for listing in Listing.objects.filter(shelter_id=user.id)]
            queryset = Application.objects.filter(listing_id__in=listings)

        # if we are a cleint accessing this, we can filter on the user_id
        else:
            queryset = Application.objects.filter(user_id=user.id)

        # Filtering by status
        status = self.request.query_params.get("status", None)
        if status:
            queryset = queryset.filter(status=status)

        # Filtering by creation time or last updated time
        sort_order = self.request.query_params.get("sort_order", None)

        if sort_order == "last_updated_time":
            queryset = queryset.order_by('-last_updated_time')
        else:
            queryset = queryset.order_by('-created_time')


        return queryset

    def update(self, request, *args, **kwargs):
        object = self.get_object()
        listing = Listing.objects.get(id=object.listing.id)

        # check if user is a shelter
        if request.user.is_shelter:
            # check if correct shelter
            if listing.shelter != request.user:
                return JsonResponse(dict(message="Shelters can only modify applications to their own shelter"), 
                                    status=403)

            # check if application is not pending 
            if object.application_status != 2:
                return JsonResponse(dict(message="Shelters cannot modify a non-pending application"), 
                                    status=403)

            # check if shelter does a status that is not approve or deny
            if request.data.get('application_status') != 1 and request.data.get('application_status') != 3:
                return JsonResponse(dict(message="Shelter not authorized to apply this update"),
                                    status=403)

        # check if user is a pet seeker
        if not request.user.is_shelter:
            # check if correct user
            if object.user != request.user:
                return JsonResponse(dict(message="Pet seekers can only modify their own applications"), 
                                    status=403)

            # check if status is withdrawn or declined
            if object.application_status == 4 or object.application_status == 3:
                return JsonResponse(dict(message="Pet seekers cannot modify a withdrawn/declined applications"),
                                    status=403)

            # check if user is doing anything but withdraw
            if request.data.get('application_status') != 4:
                return JsonResponse(dict(message="Seeker not authorized to apply this update"),
                                    status=403)

        object.application_status = request.data['application_status']

        object.save()

        # notify seeker
        if request.user.is_shelter:
            notif_target = object.user
            application_status_string = {
                1: 'Approved',
                2: 'Pending',
                3: 'Declined',
                4: 'Withdrawn',
            }
            create_notification(notif_target, PetSeekerNotification.NotificationType.STATUS_UPDATE, 'Application Status Update',
                                f'Application to {object.listing.name}: {application_status_string[object.application_status]}', object.id)

        serializer = self.get_serializer(object)
        return JsonResponse(serializer.data, status=200)

    @required_fields({
        'content': str
    })
    def create(self, request, *args, **kwargs):
        if request.user.is_shelter:
            return JsonResponse(dict(message="Shelters can not create applications"), 
                                status=403)
        
        try:
            listing = Listing.objects.get(id=request.data.get('listing', None))
        except:
            return JsonResponse(dict(message="Listing does not exist", 
                                     status=404))
        
        # check if listing status is not open
        if listing.listing_status != 3:
            return JsonResponse(dict(message="Listing is not open for application"), 
                                status=400)
        
        if len(Application.objects.filter(listing=listing, user = User.objects.get(pk=request.user.pk))) != 0:
            return JsonResponse(dict(message="Users can not create multiple applications for the same listing"), 
                                status=403)
        
        content = request.data['content']

        application = Application.objects.create(application_status=2, 
                                content=content, 
                                listing=listing,
                                user=request.user)
        
        create_notification(listing.shelter, ShelterNotification.NotificationType.APPLICATION,
                            f'New Application By {request.user.email}',
                            f'{request.user.email} has applied for {listing.name}!',
                            application.id)

        # create application object
        serializer = self.get_serializer(application)
        
        return JsonResponse(serializer.data, status=201)

    def destroy(self, request, *args, **kwargs):
        return JsonResponse(dict(message="Not Authorized to delete any applications"), 
                            status=404)

    
