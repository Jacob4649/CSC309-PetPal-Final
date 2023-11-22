from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from notifications.models import PetSeekerNotification, ShelterNotification
from notifications.pagination import SmallNonCustomizablePaginationBatch

from notifications.serializers import PetSeekerNotificationSerializer, ShelterNotificationSerializer
from petpal.helpers import optional_fields
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions


class NotificationsViewSet(ModelViewSet):

    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = SmallNonCustomizablePaginationBatch

    def get_serializer_class(self):
        return ShelterNotificationSerializer if self.request.user.is_shelter else PetSeekerNotificationSerializer
    
    def get_queryset(self):
        queryset = ShelterNotification.objects.filter(shelter_id=self.request.user.id) \
            if self.request.user.is_shelter \
            else PetSeekerNotification.objects.filter(pet_seeker_id=self.request.user.id)
        
        if 'read' in self.request.query_params and self.request.query_params['read']:
            queryset = queryset.filter(is_read=self.request.query_params['read'])

        return queryset.order_by('-creation')

    def partial_update(self, request, *args, **kwargs):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return JsonResponse(self.get_serializer_class()(notification).data, status = 200)
    
    def update(self, request, *args, **kwargs):
        return HttpResponse(status = 404)

    # probably unnecessary
    # def get_object(self):

    #     object = super.get_object()

    #     # check whether notification is for current user
    #     if self.request.user.is_shelter:
    #         # shelter validation
    #         if object.shelter != self.request.user:
    #             # invalid user
    #             return None
    #     else:
    #         # user validation
    #         if object.pet_seeker != self.request.user:
    #             # invalid user
    #             return None

    #     return object
    
    # def update(self, request, *args, **kwargs):

    #     if self.get_object() is None:
    #         return JsonResponse(dict(message='Can only modify own notification'), status = 403)

    #     return super().update(request, *args, **kwargs)

    # def destroy(self, request, *args, **kwargs):

    #     if self.get_object() is None:
    #         return JsonResponse(dict(message='Can only delete own notification'), status = 403)

    #     return super().destroy(request, *args, **kwargs)
