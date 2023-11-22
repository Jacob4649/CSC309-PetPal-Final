from django.urls import path, include
from rest_framework.routers import DefaultRouter
from notifications.views import NotificationsViewSet

# urlpatterns = [
#     path('pets/<int:pk>/applications/', ApplicationCreate.as_view(), name="application"),
# ]

router = DefaultRouter()
router.register(r'', NotificationsViewSet, basename="notifications")

urlpatterns = [
    path('', include(router.urls))
]