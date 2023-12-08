from django.urls import path
from .views import ApplicationMessageListCreate, ShelterCommentReplyList, ShelterCommentsListCreate, ShelterBlogCommentReplyList, ShelterBlogCommentsListCreate

app_name = "comments"
urlpatterns = [
    path('applications/<int:application_id>/application_messages/', ApplicationMessageListCreate.as_view(), name="application_messages"),
    path('shelter/<int:shelter_id>/shelter_comments/', ShelterCommentsListCreate.as_view(), name="shelter_comments"),
    path('shelter_comments/<int:shelter_comment_id>/replies', ShelterCommentReplyList.as_view(), 
    name="shelter_comment_replies"),
    path('shelter_blog/<int:shelter_blog_id>/shelter_blog_comments/', ShelterBlogCommentsListCreate.as_view(), name="shelter_blog_comments"),
    path('shelter_blog_comments/<int:shelter_blog_comment_id>/replies', ShelterBlogCommentReplyList.as_view())
]