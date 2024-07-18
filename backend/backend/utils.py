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
    # host_url = settings.BASE_API_URL
    # profile_picture = (
    #     host_url + user_profile.profile_picture.url
    #     if user_profile.profile_picture
    #     and not user_profile.profile_picture.url.startswith("/media/https")
    #     else (
    #         user_profile.profile_picture.url if user_profile.profile_picture else None
    #     )
    # )
    # print(f"----------{user_profile.profile_picture.url}")
    # return profile_picture
    host_url = settings.BASE_API_URL

    if user_profile.profile_picture:
        profile_picture_url = user_profile.profile_picture.url

        if profile_picture_url.startswith("/media/https"):
            profile_picture_url = profile_picture_url.replace("/media/", "", 1)
        elif not profile_picture_url.startswith("http"):
            profile_picture_url = host_url + profile_picture_url
    else:
        profile_picture_url = None
    print(profile_picture_url)
    return profile_picture_url
