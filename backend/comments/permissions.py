from rest_framework import permissions
from applications.models import Application
from accounts.models import User
from django.shortcuts import get_object_or_404

class canAccessApplicationMessages(permissions.BasePermission):
    # idea is that we check if the user is a shelter or the user who is associated with the application, that is the only way they can view the messages
    def has_permission(self, request, view):
        application = get_object_or_404(Application, pk=view.kwargs.get('application_id', None))
        listing = application.listing
        user = get_object_or_404(User, pk=request.user.pk)
        return listing.shelter.pk == user.pk or application.user.pk == user.pk