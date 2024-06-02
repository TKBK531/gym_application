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


class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        user_id = self.kwargs["pk"]
        try:
            user = User.objects.get(pk=user_id)
            return user
        except User.DoesNotExist:
            return None

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance is None:
            return Response(
                {
                    "status": "error",
                    "message": "User not found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(instance)
        profile = UserProfile.objects.get(user=instance)
        profile_serializer = UserProfileSerializer(profile)

        response_data = {
            "status": "success",
            "data": {
                "id": serializer.data["id"],
                "first_name": serializer.data["first_name"],
                "last_name": serializer.data["last_name"],
                "username": serializer.data["username"],
                "email": serializer.data["email"],
                "profile": profile_serializer.data,
            },
        }

        return Response(response_data)


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
        serializer = self.get_serializer(instance)
        user_data = {
            "user": {
                "id": instance.user.id,
                "first_name": instance.user.first_name,
                "last_name": instance.user.last_name,
                "username": instance.user.username,
                "email": instance.user.email,
                "profile_picture": instance.profile_picture,
                "user_type": instance.user_type.name,
            }
        }

        # Combine profile and user data
        response_data = {
            "status": "success",
            "message": "User profile retrieved successfully.",
            "data": user_data,
        }
        # print(response_data)

        return Response(response_data)


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


class UserProfileEditView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user_instance = self.get_object()
        profile_instance = UserProfile.objects.get(user=user_instance)

        user_serializer = UserSerializer(
            instance=user_instance, data=request.data, partial=True
        )
        user_serializer.is_valid(raise_exception=True)
        user_serializer.save()

        profile_serializer = UserProfileSerializer(
            instance=profile_instance, data=request.data, partial=True
        )
        profile_serializer.is_valid(raise_exception=True)
        profile_serializer.save()

        response_data = {
            "status": "success",
            "message": "User profile updated successfully.",
            "data": {
                **user_serializer.data,
                **profile_serializer.data,
            },
        }
        return Response(response_data, status=status.HTTP_200_OK)


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

        # Generate tokens for the user
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        redirect_url = f"{settings.BASE_APP_URL}/loading?access_token={access_token}&refresh_token={refresh_token}"

        response_data = {
            "status": "success",
            "message": "User logged in successfully",
            "data": user_data,
            "auth_tokens": {
                "refresh": refresh_token,
                "access": access_token,
            },
            "redirect_url": f"{settings.BASE_APP_URL}/dashboard",
        }

        return redirect(redirect_url)
