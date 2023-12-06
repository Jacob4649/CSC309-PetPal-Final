from django.db import models
from accounts.models import User

# Create your models here.

class ShelterBlog(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    # Shelter FK
    creation_time = models.DateTimeField(auto_now_add=True)
    shelter = models.ForeignKey(User, on_delete=models.CASCADE)
    

class ShelterLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shelter_blog = models.ForeignKey(ShelterBlog, on_delete=models.CASCADE)