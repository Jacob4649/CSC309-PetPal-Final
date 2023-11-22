from rest_framework.serializers import ModelSerializer, ReadOnlyField

from notifications.models import PetSeekerNotification, ShelterNotification

class ShelterNotificationSerializer(ModelSerializer):
    id = ReadOnlyField()
    creation = ReadOnlyField()

    class Meta:
        model = ShelterNotification
        fields = [
            'id',
            'shelter',
            'type',
            'title',
            'content',
            'is_read',
            'url',
            'creation'
        ]


class PetSeekerNotificationSerializer(ModelSerializer):
    id = ReadOnlyField()
    creation = ReadOnlyField()

    class Meta:
        model=PetSeekerNotification
        fields =[
            'id',
            'pet_seeker',
            'type',
            'title',
            'content',
            'is_read',
            'url',
            'creation'
        ]
