from django.urls import path
from .views import (
    AllMembersCountView,
    AllMembersListView,
    CreatePostgraduateMemberView,
    CreateAcademicStaffMemberView,
    CreateOutsidersMemberView,
    DeleteMemberView,
)

urlpatterns = [
    path(
        "postgraduate-members/create/",
        CreatePostgraduateMemberView.as_view(),
        name="create-postgraduate-member",
    ),
    path(
        "academic-staff-members/create/",
        CreateAcademicStaffMemberView.as_view(),
        name="create-academic-staff-member",
    ),
    path(
        "outsiders-members/create/",
        CreateOutsidersMemberView.as_view(),
        name="create-outsiders-member",
    ),
    path(
        "delete-member/<int:pk>/",
        DeleteMemberView.as_view(),
        name="delete-member",
    ),
    path("all-members/", 
         AllMembersListView.as_view(), 
         name="all-members",
    ),
    path("all-membersCount/", 
         AllMembersCountView.as_view(), 
         name="all-members",
    ),
]
