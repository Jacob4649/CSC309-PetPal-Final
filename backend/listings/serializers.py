from rest_framework import serializers

from listings.models import Listing

class ListingSerializer(serializers.ModelSerializer):
    """Serializer for listings"""
    id = serializers.ReadOnlyField()

    class Meta:
        model = Listing
        fields = ['id',
                  'shelter',
                  'name',
                  'species',
                  'breed',
                  'weight_lbs',
                  'height_feet',
                  'age_months',
                  'listing_status',
                  'description']