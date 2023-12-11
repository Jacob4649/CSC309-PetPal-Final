from django.urls import include, path
from rest_framework.routers import DefaultRouter

from listings.views import ListingPicView, ListingViewSet

router = DefaultRouter()
router.register(r'', ListingViewSet, basename="listing")

urlpatterns = [
    path('', include(router.urls)),
    path('<int:id>/listing_image', ListingPicView.as_view(), name='listing_image')
]