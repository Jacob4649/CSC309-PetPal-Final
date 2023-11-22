from django.urls import path, include
from rest_framework.routers import DefaultRouter
from applications.views import ApplicationsViewSet

# urlpatterns = [
#     path('pets/<int:pk>/applications/', ApplicationCreate.as_view(), name="application"),
# ]

router = DefaultRouter()
router.register(r'', ApplicationsViewSet, basename="applications")

urlpatterns = [
    path('', include(router.urls))
]