from django.contrib.auth.models import User
from userProfile.models import UserProfile


def get_user_from_userProfile(userProfile):
    return userProfile.user


def get_userProfile_from_user(user):
    return UserProfile.objects.get(user=user)
