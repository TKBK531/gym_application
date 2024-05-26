from django.db import transaction
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, UserProfileSerializer
from .models import UserProfile
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import NotFound


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
            "data": {
                **serializer.data,
                "profile": profile_serializer.data,
            },
        }
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)


class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
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
            }
        }

        # Combine profile and user data
        response_data = {
            "status": "success",
            "data": {**serializer.data, **user_data},
        }

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
                "profile": serializer.data,
            }

            return Response(
                {
                    "status": "success",
                    "message": response_data,
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
        return self.request.user  # Get the User instance directly

    def update(self, request, *args, **kwargs):
        user_instance = self.get_object()
        profile_instance = UserProfile.objects.get(user=user_instance)

        # Handle User updates
        user_serializer = UserSerializer(
            instance=user_instance, data=request.data, partial=True
        )
        user_serializer.is_valid(
            raise_exception=True
        )  # Raise exceptions for validation errors
        user_serializer.save()

        # Handle UserProfile updates
        profile_serializer = UserProfileSerializer(
            instance=profile_instance, data=request.data, partial=True
        )
        profile_serializer.is_valid(
            raise_exception=True
        )  # Raise exceptions for validation errors
        profile_serializer.save()

        response_data = {
            "status": "success",
            "message": "User profile updated successfully.",
            "data": {
                **user_serializer.data,
                "profile": profile_serializer.data,  # Include updated profile data
            },
        }
        return Response(response_data, status=status.HTTP_200_OK)
