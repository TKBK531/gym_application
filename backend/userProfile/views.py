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
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            profile = UserProfile.objects.get(user=user)
            serializer = UserProfileSerializer(profile)
            response_data = {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "username": user.username,
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
                {"status": "error", "message": "Invalid Credentials"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
