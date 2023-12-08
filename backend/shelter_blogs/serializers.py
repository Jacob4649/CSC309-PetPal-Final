from rest_framework import serializers

from .models import ShelterBlog
from .models import ShelterLike

from django.conf import settings
from django.urls import reverse_lazy


class ShelterBlogSerializer(serializers.ModelSerializer):
    id=serializers.ReadOnlyField()
    total_like_count = serializers.SerializerMethodField('_total_like_count')
    shelter_profile_pic_link = serializers.SerializerMethodField()
    current_user_liked= serializers.SerializerMethodField('_current_user_liked')
    shelter_name = serializers.ReadOnlyField(source="shelter.name")

    def get_shelter_profile_pic_link(self, obj):
        base_url = settings.BASE_URL
        return base_url + reverse_lazy('profile_image', kwargs={'id': obj.shelter.id}) if obj.shelter.profile_pic.name != '' else None
    class Meta:
        model = ShelterBlog
        fields = [
            "id",
            "title",
            "content",
            "total_like_count",
            "current_user_liked",
            "shelter",
            "shelter_profile_pic_link",
            "shelter_name"
        ]
    
    def _total_like_count(self, obj):
        return ShelterLike.objects.filter(shelter_blog=obj).count()
        
    def _current_user_liked(self, obj):
        request = self.context.get('request', None)
        user = request.user
        try:
            ShelterLike.objects.get(user=user, shelter_blog=obj)
            return True
        except:
            return False
        
        
    