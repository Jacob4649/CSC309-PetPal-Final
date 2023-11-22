from django.db import models
# from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import AbstractUser
from accounts.models import User
from applications.models import Application



# Create your models here.
class ApplicationMessage(models.Model):
    is_user = models.BooleanField()
    time_sent = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    application = models.ForeignKey(Application, on_delete=models.CASCADE)

class ShelterComment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author_comments")
    replying_to = models.ForeignKey("ShelterComment", on_delete=models.CASCADE, null=True, blank=True)
    shelter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments_on_shelter")
    message = models.TextField()
    time_sent = models.DateTimeField(auto_now_add=True)