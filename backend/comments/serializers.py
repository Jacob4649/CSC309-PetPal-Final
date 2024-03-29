from django.conf import settings
from django.urls import reverse_lazy
from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, \
    PrimaryKeyRelatedField, HyperlinkedRelatedField, IntegerField, CharField, BooleanField, Field, ReadOnlyField, SerializerMethodField
from .models import ApplicationMessage, ShelterComment, ShelterBlogComment
from accounts.models import User

class ApplicationMessageSerializer(ModelSerializer):
    time_sent = DateTimeField(read_only=True)
    is_user = BooleanField(read_only=True)
    id = ReadOnlyField()
    class Meta:
        model = ApplicationMessage
        fields = ['id', 'time_sent', 'content', 'is_user']

class ShelterCommentSerializer(ModelSerializer):
    # fields to be sent to the user
    profile_pic_link = SerializerMethodField()
    reply_link = SerializerMethodField()
    is_shelter = SerializerMethodField()
    id = ReadOnlyField()

    def get_profile_pic_link(self, obj):
        base_url = settings.BASE_URL
        return base_url + reverse_lazy('profile_image', kwargs={'id': obj.author.id}) if obj.author.profile_pic.name != '' else None
    
    def get_reply_link(self, obj):
        has_replies = len(ShelterComment.objects.filter(replying_to_id=obj.id)) > 0
        if has_replies:
            base_url = settings.BASE_URL
            return base_url + "/shelter_comments/" + str(obj.id) + "/replies"
        return None 
    
    shelter_comment_id = IntegerField(read_only=True)
    replying_to_id = IntegerField(allow_null=True, required=False)
    username = ReadOnlyField(read_only=True, source="author.email")
    # Need to go over exactly how this would be implemented https://www.django-rest-framework.org/api-guide/fields/#source is what I'm referencing right now
    def get_is_shelter(self, obj):
        return obj.author.id == obj.shelter.id
    time_sent = DateTimeField(read_only=True)
    class Meta:
        model = ShelterComment
        fields = ['id', 'time_sent', 'message', 'is_shelter', 'shelter_comment_id', 'profile_pic_link', 'replying_to_id', 'username', 'reply_link']

class ShelterBlogCommentSerializer(ModelSerializer):
    # fields to be sent to the user
    profile_pic_link = SerializerMethodField()
    reply_link = SerializerMethodField()
    id = ReadOnlyField()
    is_shelter = SerializerMethodField()

    def get_profile_pic_link(self, obj):
        base_url = settings.BASE_URL
        return base_url + reverse_lazy('profile_image', kwargs={'id': obj.author.id}) if obj.author.profile_pic.name != '' else None
    
    def get_reply_link(self, obj):
        has_replies = len(ShelterBlogComment.objects.filter(replying_to_id=obj.id)) > 0
        if has_replies:
            base_url = settings.BASE_URL
            return base_url + "/shelter_blog_comments/" + str(obj.id) + "/replies"
        return None 
    
    def get_is_shelter(self, obj):
        return obj.author.id == obj.shelter_blog.shelter.id
    
    shelter_blog_comment_id = IntegerField(read_only=True)
    replying_to_id = IntegerField(allow_null=True, required=False)
    username = ReadOnlyField(read_only=True, source="author.email")
    # Need to go over exactly how this would be implemented https://www.django-rest-framework.org/api-guide/fields/#source is what I'm referencing right now
    time_sent = DateTimeField(read_only=True)
    class Meta:
        model = ShelterBlogComment
        fields = ['id', 'time_sent', 'message', 'is_shelter', 'shelter_blog_comment_id', 'profile_pic_link', 'replying_to_id', 'username', 'reply_link']
    
    
    
    