from django.conf import settings
from django.urls import reverse_lazy
from rest_framework import serializers

from listings.models import Listing

class ListingSerializer(serializers.ModelSerializer):
    """Serializer for listings"""
    id = serializers.ReadOnlyField()
    creation_time = serializers.DateTimeField(read_only=True)
    listing_image_link = serializers.SerializerMethodField()

    def get_listing_image_link(self, obj):
        base_url = settings.BASE_URL
        return base_url + reverse_lazy('listing_image', kwargs={'id': obj.id}) if obj.profile_pic.name != '' else None

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
                  'description',
                  'creation_time',
                  'listing_image_link']