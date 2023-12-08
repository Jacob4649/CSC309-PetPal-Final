from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, ListAPIView
from django.shortcuts import get_object_or_404

from notifications.models import PetSeekerNotification, ShelterNotification, create_notification
from .serializers import ApplicationMessageSerializer, ShelterCommentSerializer, ShelterBlogCommentSerializer
from .models import ApplicationMessage, ShelterComment, ShelterBlogComment
from shelter_blogs.models import ShelterBlog
from .permissions import canAccessApplicationMessages
from .pagination import SmallNonCustomizablePaginationBatch, SmallTimestampPagination
from .models import Application
from accounts.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import JsonResponse
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone



# add the extra check to make sure the accessing user is signed in
class ApplicationMessageListCreate(ListCreateAPIView):
    serializer_class = ApplicationMessageSerializer
    permission_classes = [IsAuthenticated, canAccessApplicationMessages]
    authentication_classes = (JWTAuthentication,)
    pagination_class = SmallNonCustomizablePaginationBatch
    
    def list(self, request, *args, **kwargs):
        try:
            Application.objects.get(pk=self.kwargs.get('application_id', None))
        except:
            return JsonResponse({"message": "application_id is invalid"}, status=404)
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        try:
            application = Application.objects.get(pk=self.kwargs.get('application_id', None))
            application.last_updated_time = timezone.now()
            application.save()
        except:
            return JsonResponse({"message": "application_id is invalid"}, status=404)
        return super().create(request, *args, **kwargs)
    
    def get_queryset(self):
        application = Application.objects.get(id=self.kwargs.get('application_id', None))
        return ApplicationMessage.objects.filter(application=application).order_by('-time_sent')
    
    def perform_create(self, serializer):
        # potentially change the way in which the user is accessed
        application = Application.objects.get(id=self.kwargs.get('application_id', None))
        is_user = not self.request.user.is_shelter
        # is_user=not User.objects.get(pk=self.request.data.get('user_id', None)).is_shelter
        new_message = ApplicationMessage.objects.create(**serializer.validated_data, is_user=is_user, application=application)
        if is_user:
            # message from user, show notif to shelter
            shelter = application.listing.shelter
            create_notification(shelter, ShelterNotification.NotificationType.MESSAGE, f'New Message From {self.request.user.email}',
                            new_message.content, application.id)
        else:
            # message from shelter, show notif to user
            applicant = application.user
            create_notification(applicant, PetSeekerNotification.NotificationType.MESSAGE, f'New Message From {self.request.user.email}',
                            new_message.content, application.id)
        

# add extra check to assure the user is signed in
class ShelterCommentsListCreate(ListCreateAPIView):
    serializer_class = ShelterCommentSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = [IsAuthenticated]
    pagination_class = SmallTimestampPagination

    def get_queryset(self):
        shelter = User.objects.get(pk=self.kwargs.get('shelter_id', None))
        return ShelterComment.objects.filter(shelter=shelter, replying_to=None).order_by('-time_sent')
    
    def list(self, request, *args, **kwargs):
        try:
            User.objects.get(pk=self.kwargs.get('shelter_id', None))
        except:
            return JsonResponse({"message": "shelter_id is invalid"}, status=404)
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        try:
            User.objects.get(pk=self.kwargs.get('shelter_id', None))
        except:
            return JsonResponse({"message": "shelter_id is invalid"}, status=404)
        replying_to = request.data.get("replying_to_id", None)
        if replying_to:
            try:
                ShelterComment.objects.get(pk=replying_to)
            except:
                return JsonResponse({"message": "replying_to_id is invalid"}, status=400)
        return super().create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        author = User.objects.get(pk=self.request.user.pk)
        # author = User.objects.get(pk=self.request.data.get("user_id", None))
        replying_to = serializer.validated_data.pop('replying_to_id', None)
        if replying_to:
            replying_to = ShelterComment.objects.get(pk=replying_to)
        

        shelter = User.objects.get(id=self.kwargs.get('shelter_id', None))

        created = serializer.save(author=author, replying_to=replying_to, shelter=shelter) 
        create_notification(shelter, ShelterNotification.NotificationType.COMMENT, f'New Comment From {self.request.user.email}',
                            created.message, shelter.id)

# add extra check to assure that the user is signed in --  might need a check to make sure that other shelters aren't commenting on this shelter's page
class ShelterCommentReplyList(ListAPIView):
    serializer_class = ShelterCommentSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = [IsAuthenticated]
    pagination_class = SmallNonCustomizablePaginationBatch

    def get_queryset(self):
        replying_to = get_object_or_404(ShelterComment, id=self.kwargs.get('shelter_comment_id', None))
        return ShelterComment.objects.filter(replying_to=replying_to).order_by('-time_sent')
    

# add extra check to assure the user is signed in
class ShelterBlogCommentsListCreate(ListCreateAPIView):
    serializer_class = ShelterBlogCommentSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = [IsAuthenticated]
    pagination_class = SmallTimestampPagination

    def get_queryset(self):
        shelter_blog = ShelterBlog.objects.get(pk=self.kwargs.get('shelter_blog_id', None))
        return ShelterBlogComment.objects.filter(shelter_blog=shelter_blog, replying_to=None).order_by('-time_sent')
    
    def list(self, request, *args, **kwargs):
        try:
            ShelterBlog.objects.get(pk=self.kwargs.get('shelter_blog_id', None))
        except:
            return JsonResponse({"message": "shelter_blog_idid is invalid"}, status=404)
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        try:
            ShelterBlog.objects.get(pk=self.kwargs.get('shelter_blog_id', None))
        except:
            return JsonResponse({"message": "shelter_blog_id is invalid"}, status=404)
        replying_to = request.data.get("replying_to_id", None)
        if replying_to:
            try:
                ShelterBlogComment.objects.get(pk=replying_to)
            except:
                return JsonResponse({"message": "replying_to_id is invalid"}, status=400)
        return super().create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        author = User.objects.get(pk=self.request.user.pk)
        # author = User.objects.get(pk=self.request.data.get("user_id", None))
        replying_to = serializer.validated_data.pop('replying_to_id', None)
        if replying_to:
            replying_to = ShelterBlogComment.objects.get(pk=replying_to)
        

        shelter_blog = ShelterBlog.objects.get(id=self.kwargs.get('shelter_blog_id', None))

        serializer.save(author=author, replying_to=replying_to, shelter_blog=shelter_blog) 

# add extra check to assure that the user is signed in --  might need a check to make sure that other shelters aren't commenting on this shelter's page
class ShelterBlogCommentReplyList(ListAPIView):
    serializer_class = ShelterBlogCommentSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = [IsAuthenticated]
    pagination_class = SmallNonCustomizablePaginationBatch

    def get_queryset(self):
        replying_to = get_object_or_404(ShelterBlogComment, id=self.kwargs.get('shelter_blog_comment_id', None))
        return ShelterBlogComment.objects.filter(replying_to=replying_to).order_by('-time_sent')