from django.urls import reverse_lazy
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User
from django.conf import settings


class ShelterSerializer(serializers.ModelSerializer):
    profile_pic_link = serializers.SerializerMethodField()
    id = serializers.ReadOnlyField()
    is_shelter = serializers.ReadOnlyField()

    def get_profile_pic_link(self, obj):
        base_url = settings.BASE_URL
        return base_url + reverse_lazy('profile_image', kwargs={'id': obj.id}) if obj.profile_pic.name != '' else None

    class Meta:
        model = User
        fields = ['email',
                  'id',
                  'name',
                  'is_shelter',
                  'address',
                  'province',
                  'city',
                  'postal_code',
                  'description',
                  'profile_pic_link']


class PetSeekerSerializer(serializers.ModelSerializer):
    profile_pic_link = serializers.SerializerMethodField()
    id = serializers.ReadOnlyField()
    is_shelter = serializers.ReadOnlyField()

    def get_profile_pic_link(self, obj):
        base_url = settings.BASE_URL
        return base_url + reverse_lazy('profile_image', kwargs={'id': obj.id}) if obj.profile_pic.name != '' else None
    
    class Meta:
        model = User
        fields = ['email',
                  'id',
                  'name',
                  'is_shelter',
                  'address',
                  'province',
                  'city',
                  'postal_code',
                  'profile_pic_link']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.USERNAME_FIELD
