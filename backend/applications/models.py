from django.db import models
from django.urls import reverse_lazy

from accounts.models import User
from listings.models import Listing
from django.conf import settings



class Application(models.Model):

    # Probably need to change with our User (User Associated with Application)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Would be one to many relationship (Listing Associated with Application)
    # Needs to refer to listing model !!
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)

    # Creation Date of the Application 
    created_time = models.DateTimeField(auto_now_add=True)

    # update time of the application
    last_updated_time = models.DateTimeField(auto_now=True)

    # Application Status
    class ApplicationStatus(models.IntegerChoices):
        APPROVED = 1, 'Approved'
        PENDING = 2, 'Pending'
        DECLINED = 3, 'Declined'
        WITHDRAWN = 4, 'Withdrawn'

    application_status = models.IntegerField(choices=ApplicationStatus.choices)

    # Main Message by Applicant
    content = models.TextField()

    # Generate View Application link
    def get_application_url(self):
        return settings.BASE_FRONTEND_URL + reverse_lazy("applications-detail", kwargs={'pk': self.id})
    
    # need to add profile image of pets

