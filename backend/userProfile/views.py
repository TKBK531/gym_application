from urllib.parse import urlencode
from django.db import transaction
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, UserProfileSerializer
from .models import UserProfile
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import NotFound
from .services import get_user_data
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import login
from rest_framework.views import APIView
from .serializers import AuthSerializer


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        profile = UserProfile.objects.get(user=serializer.instance)
        profile_serializer = UserProfileSerializer(profile)

        response_data = {
            "status": "success",
            "message": "User created successfully.",
            "data": {
                **serializer.data,
                **profile_serializer.data,
            },
        }
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)


class GoogleLoginApi(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        auth_serializer = AuthSerializer(data=request.GET)
        auth_serializer.is_valid(raise_exception=True)

        validated_data = auth_serializer.validated_data

        try:
            user_data = get_user_data(validated_data)
        except Exception as e:
            params = urlencode({"error": e.message})
            redirect_url = f"{settings.BASE_APP_URL}/login?{params}"

            return redirect(redirect_url)

        user = User.objects.get(email=user_data["email"])
        print(f"User: {user}")
        login(request, user)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        redirect_url = f"{settings.BASE_APP_URL}/loading?access_token={access_token}&refresh_token={refresh_token}"

        return redirect(redirect_url)


class UserLoginView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(
            request, username=email, password=password
        )  # Authenticate with email

        if user is not None:
            refresh = RefreshToken.for_user(user)
            profile = UserProfile.objects.get(user=user)
            serializer = UserProfileSerializer(profile)
            response_data = {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                **serializer.data,
            }

            return Response(
                {
                    "status": "success",
                    "message": "User logged in successfully",
                    "data": response_data,
                    "auth_tokens": {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    },
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "status": "error",
                    "message": "Invalid Credentials",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )


class UserProfileDetailView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        try:
            profile = UserProfile.objects.get(user=user)
            return profile
        except UserProfile.DoesNotExist:
            raise NotFound("User Profile not found")

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        user_data = {
            "user": {
                "id": instance.user.id,
                "first_name": instance.user.first_name,
                "last_name": instance.user.last_name,
                "username": instance.user.username,
                "email": instance.user.email,
                "national_id": (
                    instance.national_id if instance.national_id else "Not Provided"
                ),
                "profile_picture": instance.profile_picture,
                "contact": instance.contact if instance.contact else "Not Provided",
                "user_type": instance.user_type.name,
                "city": instance.city.label if instance.city else "Not Provided",
                "province": (
                    instance.city.province.label if instance.city else "Not Provided"
                ),
            }
        }

        response_data = {
            "status": "success",
            "message": "User profile retrieved successfully.",
            "data": user_data,
        }
        # print(response_data)

        return JsonResponse(response_data, status=status.HTTP_200_OK)


class UserProfileView(generics.RetrieveAPIView):
    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "User not found.",
                    "data": None,
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = UserProfileSerializer(user)
        response_data = {
            "status": "success",
            "message": "User profile retrieved successfully. Yaahoo",
            "data": serializer.data,
        }
        return Response(response_data)
