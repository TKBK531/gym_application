from django.urls import path
from .views import (
    UserCreateView,
    UserProfileDetailView,
    UserLoginView,
    UserProfileUpdateView,
    UserListView,
    UserTypeUpdateView,
    UserRegisterView,
    UserProfileCreateView,
    CreateAcademicStaffUserView,
    CreatePostgraduateUserView,
    CreateUniversityStudentUserView,
    ProvinceListView,
    CityListView,
)

urlpatterns = [
    path("register/", UserCreateView.as_view(), name="register"),
    path("register2/", UserRegisterView.as_view(), name="register2"),
    path("register/profile/", UserProfileCreateView.as_view(), name="register-profile"),
    path(
        "register/profile/academic/",
        CreateAcademicStaffUserView.as_view(),
        name="academic",
    ),
    path(
        "register/profile/postgraduate/",
        CreatePostgraduateUserView.as_view(),
        name="postgraduate",
    ),
    path(
        "register/profile/student/",
        CreateUniversityStudentUserView.as_view(),
        name="student",
    ),
    path("login/", UserLoginView.as_view(), name="login"),
    path("profile/", UserProfileDetailView.as_view(), name="profile"),
    path("profile/<int:pk>/", UserProfileDetailView.as_view(), name="profile-detail"),
    path("profile/update/", UserProfileUpdateView.as_view(), name="profile-update"),
    path("profile/all-profiles/", UserListView.as_view(), name="all-profiles"),
    path(
        "profile/<int:pk>/update-user-type/",
        UserTypeUpdateView.as_view(),
        name="profile-type-update",
    ),
    path("provinces/", ProvinceListView.as_view(), name="provinces"),
    path("cities/", CityListView.as_view(), name="cities"),
]
