from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from notifications.pagination import SmallNonCustomizablePaginationBatch

from notifications.serializers import PetSeekerNotificationSerializer, ShelterNotificationSerializer
from petpal.helpers import optional_fields
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions
from .serializers import ShelterBlogSerializer
from .models import ShelterBlog, ShelterLike
from rest_framework.decorators import action

# Create your views here.

class ShelterBlogsViewset(ModelViewSet):

    authentication_classes = (JWTAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    serializer_class=ShelterBlogSerializer

    def get_queryset(self):
        shelter_blogs = ShelterBlog.objects.all()

        shelter_name =  self.request.query_params.get('shelter', None)
        print(shelter_name)
        if shelter_name is not None: 
            shelter_blogs =  shelter_blogs.filter(shelter__name__icontains=shelter_name.lower())
        
        shelter_blogs = shelter_blogs.order_by("-creation_time")
        return shelter_blogs
    
    def create(self, request, *args, **kwargs):
        print("pk")
        print(request.user.pk)
        if request.user.is_shelter:
            request.data['shelter'] = request.user.pk
        else:
            return JsonResponse(dict(message="Only shelters can create shelter blogs"), status = 403)
        return super().create(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        return JsonResponse(dict(message="Not Authorized to delete any shelter blogs"), 
                            status=403)

    def update(self, request, *args, **kwargs):
        return JsonResponse(dict(message="Not Authorized to update any shelter blogs"), 
                            status=403)
    
    def partial_update(self, request, *args, **kwargs):
        return JsonResponse(dict(message="Not Authorized to update any shelter blogs"), 
                            status=403)
    
    @action(detail=True, methods=['post'])
    def like(self, request, *args, **kwargs):
        user = request.user
        shelter_blog_id = kwargs["pk"]
        print(shelter_blog_id)

        try:
            shelter_blog = ShelterBlog.objects.get(pk=shelter_blog_id)
        except:
            return JsonResponse(dict(message="Blog Not Found"), 
                            status=403)
    
        shelter_like = ShelterLike.objects.filter(shelter_blog=shelter_blog, user=user)
        print("shelter like length before")
        print(len(shelter_like))
        if len(shelter_like) == 0:
            ShelterLike.objects.create(shelter_blog=shelter_blog, user=user)
            print("shelter like length after")
            print(len(shelter_like))
            return JsonResponse(dict(message="Liked"), status=200)
        else:
            shelter_like.delete()
            print("shelter like length after")
            print(len(shelter_like))
            return JsonResponse(dict(message="Unliked"), status=200)
    
        
            


        
