# services.py
from django.conf import settings
from django.shortcuts import redirect
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from urllib.parse import urlencode
from typing import Dict, Any
import requests
import jwt

from .models import UserProfile

GOOGLE_ACCESS_TOKEN_OBTAIN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"
LOGIN_URL = f"{settings.BASE_APP_URL}/login"


# Exchange authorization token with access token
def google_get_access_token(code: str, redirect_uri: str) -> str:
    data = {
        "code": code,
        "client_id": settings.GOOGLE_OAUTH2_CLIENT_ID,
        "client_secret": settings.GOOGLE_OAUTH2_CLIENT_SECRET,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
    }

    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)
    if not response.ok:
        raise ValidationError("Could not get access token from Google.")

    access_token = response.json()["access_token"]

    return access_token


# Get user info from google
def google_get_user_info(access_token: str) -> Dict[str, Any]:
    response = requests.get(GOOGLE_USER_INFO_URL, params={"access_token": access_token})

    if not response.ok:
        raise ValidationError("Could not get user info from Google.")

    return response.json()


def get_user_data(validated_data):
    domain = settings.BASE_API_URL
    redirect_uri = f"{domain}/auth/api/login/google/"

    code = validated_data.get("code")
    error = validated_data.get("error")

    if error or not code:
        raise ValidationError("Invalid code. Try Again.")

    access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)
    user_data = google_get_user_info(access_token=access_token)

    if not user_data:
        raise ValidationError("Could not get user data from Google.")

    email = user_data.get("email")
    domain = email.split("@")[-1]
    allowed_domains = settings.ALLOWED_DOMAINS

    if domain not in allowed_domains:
        raise ValidationError("Invalid domain. Only pdn.ac.lk emails are allowed.")
    else:
        user, created = User.objects.get_or_create(
            email=user_data["email"],
            defaults={
                "username": user_data["email"],
                "first_name": user_data.get("given_name"),
                "last_name": user_data.get("family_name"),
            },
        )
        if created:
            UserProfile.objects.create(
                user=user,
                profile_picture=user_data.get("picture"),
            )
        profile_data = {
            "email": user_data["email"],
            "first_name": user_data.get("given_name"),
            "last_name": user_data.get("family_name"),
        }
        return profile_data
