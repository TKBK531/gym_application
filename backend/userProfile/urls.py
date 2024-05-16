from django.urls import path
from .views import UserCreateView, UserProfileListView, UserLoginView

urlpatterns = [
    path("register/", UserCreateView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("profile/", UserProfileListView.as_view(), name="profile"),
]
