from django.urls import path
from .views import ApplicationMessageListCreate, ShelterCommentReplyList, ShelterCommentsListCreate

app_name = "comments"
urlpatterns = [
    path('applications/<int:application_id>/application_messages/', ApplicationMessageListCreate.as_view(), name="application_messages"),
    path('shelter/<int:shelter_id>/shelter_comments/', ShelterCommentsListCreate.as_view(), name="shelter_comments"),
    path('shelter_comments/<int:shelter_comment_id>/replies', ShelterCommentReplyList.as_view(), name="shelter_comment_replies")
]