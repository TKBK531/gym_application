import uuid
from django.conf import settings
from django.contrib.auth.models import User
from userProfile.models import UserProfile


def get_user_from_userProfile(userProfile):
    return userProfile.user


def get_userProfile_from_user(user):
    return UserProfile.objects.get(user=user)


def generate_unique_identifier():
    return str(uuid.uuid4())


def get_profile_picture_path(user_profile):
    host_url = settings.BASE_API_URL
    profile_picture = (
        host_url + user_profile.profile_picture.url
        if user_profile.profile_picture
        and not user_profile.profile_picture.url.startswith("https")
        else (
            user_profile.profile_picture.url if user_profile.profile_picture else None
        )
    )
    return profile_picture
