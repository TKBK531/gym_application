from django.urls import path
from .views import UserCreateView, UserProfileDetailView, UserLoginView, UserDetailView

urlpatterns = [
    path("register/", UserCreateView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("profile/", UserProfileDetailView.as_view(), name="profile"),
    path("<int:pk>/", UserDetailView.as_view(), name="user-detail"),
]
