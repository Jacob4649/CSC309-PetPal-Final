from typing import Optional, Union
from django.db import models
from django.urls import reverse_lazy
from accounts.models import User
from django.conf import settings

# Create your models here.
class ShelterNotification(models.Model):
    class NotificationType(models.IntegerChoices):
        MESSAGE = 1
        APPLICATION = 2
        COMMENT = 3
        # RATING = 4

    shelter = models.ForeignKey(User, on_delete=models.CASCADE)
    # ref for the enum https://docs.djangoproject.com/en/4.2/ref/models/fields/#:~:text=Enumeration%20types&text=These%20work%20similar%20to%20enum,%2Dreadable%20name%2C%20or%20label%20.
    type = models.IntegerField(choices=NotificationType.choices)
    title = models.TextField()
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    creation = models.DateTimeField(auto_now_add=True)
    url = models.CharField(max_length=512, null=True)


class PetSeekerNotification(models.Model):
    class NotificationType(models.IntegerChoices):
        MESSAGE = 1
        STATUS_UPDATE = 2
        # for new listings matching a user's preferences -- might want to leave this out of this phase or out in general
        NEW_LISTING = 3
    
    pet_seeker = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.IntegerField(choices=NotificationType.choices)
    title = models.TextField()
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    creation = models.DateTimeField(auto_now_add=True)
    url = models.CharField(max_length=512, null=True)
    

def create_notification(user: User, notif_type: int, title: str, content: str, model_pk: Optional[int] = None) -> Union[PetSeekerNotification, ShelterNotification]:
    """Creates a new notification"""
    if user.is_shelter: # determine whether the target user is a shelter
        return _create_shelter_notification(user, notif_type, title, content, model_pk)
    else:
        return _create_seeker_notification(user, notif_type, title, content, model_pk)


def _create_shelter_notification(user: User, notif_type: int, title: str, content: str, model_pk: Optional[int] = None) -> ShelterNotification:
    """Creates a shelter notification"""
    url = None
    base_url = settings.BASE_URL
    if notif_type == ShelterNotification.NotificationType.APPLICATION:
        # application url
        url = base_url + reverse_lazy('applications-detail', kwargs={'pk': model_pk})
    elif notif_type == ShelterNotification.NotificationType.COMMENT:
        # comment url
        url = base_url + reverse_lazy('shelter_comments', kwargs={'pk': model_pk})
    elif notif_type == ShelterNotification.NotificationType.MESSAGE:
        # message or application url
        url = base_url + reverse_lazy('comments:application_messages', kwargs={'application_id': model_pk})
    return ShelterNotification.objects.create(
        shelter=user,
        type=notif_type,
        title=title,
        content=content,
        is_read=False,
        url=url
    )


def _create_seeker_notification(user: User, notif_type: int, title: str, content: str, model_pk: Optional[int] = None) -> PetSeekerNotification:
    """Creates a pet seeker notification"""
    url = None
    base_url = settings.BASE_URL
    if notif_type == PetSeekerNotification.NotificationType.MESSAGE:
        # message or application url
        url = base_url + reverse_lazy('comments:application_messages', kwargs={'application_id': model_pk})
    elif notif_type == PetSeekerNotification.NotificationType.NEW_LISTING:
        # listing url
        url = base_url + reverse_lazy('listing-detail', kwargs={'pk': model_pk})
    elif notif_type == PetSeekerNotification.NotificationType.STATUS_UPDATE:
        # application url
        url = base_url + reverse_lazy('applications-detail', kwargs={'pk': model_pk})
    return PetSeekerNotification.objects.create(
        pet_seeker=user,
        type=notif_type,
        title=title,
        content=content,
        is_read=False,
        url=url
    )