from django.core.validators import validate_email
from django.core.files.images import ImageFile
from django.http import FileResponse, HttpResponse, JsonResponse
from rest_framework import permissions
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from tempfile import NamedTemporaryFile

from accounts.models import User
from accounts.serializers import ShelterSerializer, PetSeekerSerializer, CustomTokenObtainPairSerializer
from applications.models import Application
from listings.models import Listing
from petpal.helpers import required_fields, optional_fields
from petpal.helpers import email as email_type


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ProfilePicView(APIView):
    
    authentication_classes = (JWTAuthentication,)
    permission_classes = []

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('id', None)

        if user_id is None:
            return HttpResponse(status=404)
        
        user = None
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return JsonResponse(dict(message='User not found'), status=404)
        
        if user.profile_pic.name == '':
            return JsonResponse(dict(message='User has no profile pic'), status=404)

        content_type = 'image/png' if user.profile_pic.name.lower().endswith('png') else 'image/jpeg'

        # create response and set content type
        response = HttpResponse(user.profile_pic, content_type=content_type)
        
        # set file as attachment and specify name
        response['Content-Disposition'] = f'attachment; filename="{user.profile_pic.name}"'
        
        return response
    
    def put(self, request, *args, **kwargs):

        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        user_id = kwargs.get('id', None)

        if user_id is None:
            return HttpResponse(status=404)
        
        user = None
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return JsonResponse(dict(message='User not found'), status=404)
        
        if user_id != request.user.id:
            return JsonResponse(dict(message='Can only set own profile picture'), status=403)

        content_type = request.content_type

        if not content_type.endswith('png') and not content_type.endswith('jpeg'):
            return JsonResponse(dict(message='Can only upload png or jpeg as profile pic'), status=400)
        
        extension = 'png' if content_type.endswith('png') else 'jpg'

        with NamedTemporaryFile("wb+") as f:
            f.write(bytes(request.body))
            f.seek(0)
            user.profile_pic = ImageFile(f, f'{request.user.id}.{extension}')
            user.save()

        serializer = ShelterSerializer if user.is_shelter else PetSeekerSerializer

        return JsonResponse(serializer(user).data, status=200)


class ShelterViewSet(ModelViewSet):
    serializer_class = ShelterSerializer
    queryset = User.objects.filter(is_shelter=True)
    authentication_classes = (JWTAuthentication,)

    def get_permissions(self):
        if self.action == 'create':
            permission_group = [permissions.AllowAny]
        else:
            permission_group = [permissions.IsAuthenticated]
        return [permission() for permission in permission_group]

    @required_fields({
        'email': email_type,
        'name': str,
        'password1': str,
        'password2': str
    })
    def create(self, request, *args, **kwargs):
        if request.data['password1'] != request.data['password2']:
            return JsonResponse(dict(message='Passwords do not match.'), status=401)
        if User.objects.filter(email=request.data['email']).exists():
            return JsonResponse(dict(message="Email is not unique"), status=400)
        User.objects.create_shelter(request.data['email'],
                                    request.data['name'],
                                    request.data['password1'])
        return JsonResponse(dict(), status=200)

    @required_fields({
        'email': email_type,
        'name': str,
        'password': str
    })
    def update(self, request, *args, **kwargs):
        shelter = self.get_object()
        if self.request.user != shelter:
            return JsonResponse(dict(message='You are not authorized to update this account.'), status=403)

        return super().update(request, *args, **kwargs)

    @optional_fields({
        'email': email_type,
        'name': str,
        'password': str
    })
    def partial_update(self, request, *args, **kwargs):
        shelter = self.get_object()
        if self.request.user != shelter:
            return JsonResponse(dict(message='You are not authorized to update this account.'), status=403)

        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        shelter = self.get_object()
        if self.request.user != shelter:
            return JsonResponse(dict(message='You are not authorized to delete this account.'), status=403)

        return super().destroy(request, *args, **kwargs)


class PetSeekerViewSet(ModelViewSet):
    serializer_class = PetSeekerSerializer
    queryset = User.objects.filter(is_shelter=False)
    authentication_classes = (JWTAuthentication,)

    def get_permissions(self):
        if self.action == 'create':
            permission_group = [permissions.AllowAny]
        else:
            permission_group = [permissions.IsAuthenticated]
        return [permission() for permission in permission_group]

    def list(self, request, *args, **kwargs):
        return JsonResponse(dict(message='Cannot list pet seekers.'), status=404)

    @required_fields({
        'email': email_type,
        'name': str,
        'password1': str,
        'password2': str
    })
    def create(self, request, *args, **kwargs):
        if request.data['password1'] != request.data['password2']:
            return JsonResponse(dict(message="Passwords do not match"), status=400)
        if User.objects.filter(email=request.data['email']).exists():
            return JsonResponse(dict(message="Email is not unique"), status=400)

        user = User.objects.create_pet_seeker(request.data['email'],
                                              request.data['name'],
                                              request.data['password1'])
        return JsonResponse(dict(), status=200)

    @required_fields({
        'email': email_type,
        'name': str,
        'password': str
    })
    def update(self, request, *args, **kwargs):
        pet_seeker = self.get_object()
        if self.request.user != pet_seeker:
            return JsonResponse(dict(message='You are not authorized to update this account.'), status=403)

        return super().update(request, *args, **kwargs)

    @optional_fields({
        'email': email_type,
        'name': str,
        'password': str
    })
    def partial_update(self, request, *args, **kwargs):
        shelter = self.get_object()
        if self.request.user != shelter:
            return JsonResponse(dict(message='You are not authorized to update this account.'), status=403)

        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        shelter = self.get_object()
        if self.request.user != shelter:
            return JsonResponse(dict(message='You are not authorized to delete this account.'), status=403)

        return super().destroy(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        pet_seeker = self.get_object()
        # seekers can view their own profiles
        if not request.user.is_shelter and request.user.id != pet_seeker.id:
            return JsonResponse(dict(message='You are not authorized to view this account.'), status=403)
        if request.user.is_shelter:
            # TODO: Fix this
            my_listings = [listing.id for listing in Listing.objects.filter(shelter_id=request.user.id)]
            applications = [x for x in Application.objects.filter(listing_id__in=my_listings,
                                                                  user_id=pet_seeker.id,
                                                                  application_status=2)]

            # shelters can only view users with pending applications
            if not len(applications) > 0:
                return JsonResponse(dict(message='You are not authorized to view this account.'), status=403)

        serializer = PetSeekerSerializer(pet_seeker)
        return JsonResponse(serializer.data)
