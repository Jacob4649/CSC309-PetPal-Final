from django.urls import include, path
from rest_framework.routers import DefaultRouter

from accounts.views import PetSeekerViewSet, ProfilePicView, ShelterViewSet

router = DefaultRouter()
router.register(r'pet_seekers', PetSeekerViewSet)
router.register(r'shelters', ShelterViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('<int:id>/profile_image', ProfilePicView.as_view(), name='profile_image')
]