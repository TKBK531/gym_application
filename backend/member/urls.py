from django.urls import path
from .views import (
    CreateMemberView,
    CreatePostgraduateMemberView,
    CreateAcademicStaffMemberView,
    CreateOutsidersMemberView,
    CreateFamilyView,
    CreateFamilyMemberView,
    MemberListView,
)

urlpatterns = [
    path("members/create/", CreateMemberView.as_view(), name="create-member"),
    path("postgraduate-members/create/", CreatePostgraduateMemberView.as_view(), name="create-postgraduate-member"),
    path("academic-staff-members/create/", CreateAcademicStaffMemberView.as_view(), name="create-academic-staff-member"),
    path("families/create/", CreateFamilyView.as_view(), name="create-family"),
    path("family-members/create/", CreateFamilyMemberView.as_view(), name="create-family-member"),
    path("outsiders-members/create/", CreateOutsidersMemberView.as_view(), name="create-outsiders-member"), 
    path("list-members/", MemberListView.as_view(), name="Member List"),
]
