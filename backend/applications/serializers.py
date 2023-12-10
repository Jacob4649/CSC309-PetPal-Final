from rest_framework.serializers import ModelSerializer, DateTimeField, CharField, EmailField, IntegerField, ReadOnlyField
from applications.models import Application
from accounts.models import User
from listings.models import Listing
from rest_framework import serializers

class CustomField(serializers.Field):
    def to_representation(self, value):
        # Customize the representation based on the current model instance
        return self.root.instance
    
# Serializer for Application
class ApplicationSerializer(ModelSerializer):
    id = ReadOnlyField()
    created_time = DateTimeField(read_only=True)
    last_updated_time = DateTimeField(read_only=True)
    seeker_id = IntegerField(read_only=True, source="user.pk")
    application_link = ReadOnlyField(source="get_application_url")
    pet_name = ReadOnlyField(source="listing.name")
    applicant_name = ReadOnlyField(source="user.name")
    # user = UserSerializer()
    # listing = ListingSerializer()

    # user_name = CharField(read_only=True, source='user.name')
    # user_email = EmailField(read_only=True, source='user.email')
    # user_phone = CharField(read_only=True, source='user.phone_num')

    # listing_shelter_name = CharField(read_only=True, source='lisiting.shelter.name')
    # listing_name = CharField(read_only=True, source='listing.name')
    # lsiting_status = IntegerField(source='listing.listing_status')


    class Meta:
        model = Application
        fields = ['id', 'created_time', 'last_updated_time', 'application_status', 'content', 'listing', 'seeker_id', 'application_link', 'pet_name', 'applicant_name']

    # should somehow include needed data from user and listing accordingly or no ? 
    # ( sending everything, frontend pick and chooses)
    
    
