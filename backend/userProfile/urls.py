from django.urls import path
from .views import (
    UserCreateView,
    UserProfileDetailView,
    UserLoginView,
    UserProfileUpdateView,
)

urlpatterns = [
    path("register/", UserCreateView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("profile/", UserProfileDetailView.as_view(), name="profile"),
    path("profile/update/", UserProfileUpdateView.as_view(), name="profile-update"),
]
