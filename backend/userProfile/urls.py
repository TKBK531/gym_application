from django.urls import path
from .views import (
    UserCreateView,
    UserProfileDetailView,
    UserLoginView,
    UserProfileUpdateView,
    UserListView,
)

urlpatterns = [
    path("register/", UserCreateView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("profile/", UserProfileDetailView.as_view(), name="profile"),
    path("profile/<int:pk>/", UserProfileDetailView.as_view(), name="profile-detail"),
    path("profile/update/", UserProfileUpdateView.as_view(), name="profile-update"),
    path("profile/all-profiles/", UserListView.as_view(), name="all-profiles"),
]
