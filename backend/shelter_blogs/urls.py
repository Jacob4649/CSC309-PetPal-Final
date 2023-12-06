from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ShelterBlogsViewset

router = DefaultRouter()
router.register(r'', ShelterBlogsViewset, basename="shelter-blogs")

urlpatterns = [
    path('', include(router.urls))
]