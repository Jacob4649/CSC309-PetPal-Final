from django.db import models
from accounts.models import User

class Listing(models.Model):
    """Model for a pet listing"""

    creation_time = models.DateTimeField(auto_now_add=True)
    """Creation time of the listing"""

    last_update_time = models.DateTimeField(auto_now=True)
    """Last update time of the listing"""

    shelter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listings')
    """Shelter that posted the listing"""

    name = models.CharField(max_length=256)
    """Name of the pet in the listing"""

    species = models.CharField(max_length=256)
    """Species of the pet in the listing"""

    breed = models.CharField(max_length=256)
    """Breed of the pet in the listing"""

    weight_lbs = models.FloatField()
    """Weight of the pet in the listing"""

    height_feet = models.FloatField()
    """Height of the pet in the listing"""

    age_months = models.IntegerField()
    """Age of the pet in the listing"""

    class ListingStatus(models.IntegerChoices):
        ADOPTED = 1, 'Adopted'
        CANCELED = 2, 'Canceled'
        OPEN = 3, 'Open'

    listing_status = models.IntegerField(choices=ListingStatus.choices)
    """Status of the listing"""

    description = models.TextField()
    """Description of the listing"""