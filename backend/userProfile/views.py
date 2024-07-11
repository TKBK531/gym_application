from django.conf import settings
from urllib.parse import urlencode
from django.core.cache import cache
from django.http import JsonResponse
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User, Group

from rest_framework import views, response, generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView

from backend.utils import generate_unique_identifier
from .permissions import IsAdminUserType

from .serializers import (
    UserDataSerializer,
    UserSerializer,
    UserProfileSerializer,
    ProvinceSerializer,
    City,
    AuthSerializer,
    UserTypeUpdateSerializer,
    AcademicStaffSerializer,
    PostgraduateUserSerializer,
    UniversityStudentUserSerializer,
    LoginSerializer,
)
from .models import (
    UserProfile,
    UserType,
    AcademicStaffUser,
    PostgraduateUser,
    UniversityStudentUser,
    Province,
    City,
)
from .services import get_user_data


# --------------------------------Creation Views--------------------------------
# -------------UserCreateView-------------
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # print(f"Serializer: {serializer}")
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


# -------------UserRegisterView-------------
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        user_data = request.data
        # print(user_data)
        serializer = self.get_serializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        unique_identifier = generate_unique_identifier()
        cache.set(unique_identifier, user, timeout=5500)

        return_resp = {
            "status": "success",
            "message": "User info saved successfully.",
            "identifier": unique_identifier,
            "data": serializer.data,
        }

        return JsonResponse(
            return_resp,
            status=status.HTTP_200_OK,
        )


# -------------UserProfileCreateView-------------
class UserProfileCreateView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        identifier = request.data.get("identifier")
        user_data = cache.get(identifier)
        # print("\n\nUser Data: ", user_data.email)
        if not user_data:
            return Response(
                {"error": "Invalid or expired identifier."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user_data.save()

        user = User.objects.get(email=user_data.email)

        request.data["user"] = user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return_resp = {
            "status": "success",
            "message": "UserProfile created successfully.",
            "data": serializer.data,
        }

        return JsonResponse(
            return_resp,
            status=status.HTTP_201_CREATED,
        )


# -------------CreateAcademicStaffUserView-------------
class CreateAcademicStaffUserView(generics.CreateAPIView):
    queryset = AcademicStaffUser.objects.all()
    serializer_class = AcademicStaffSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)

        serializer.is_valid(raise_exception=True)
        academic_staff_user = serializer.save()

        return_resp = {
            "status": "success",
            "message": "Academic Staff User Info Added Successfully",
            "data": serializer.data,
        }

        return JsonResponse(
            return_resp,
            status=status.HTTP_200_OK,
        )


# -------------CreatePostgraduateUserView-------------
class CreatePostgraduateUserView(generics.CreateAPIView):
    queryset = PostgraduateUser.objects.all()
    serializer_class = PostgraduateUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)

        serializer.is_valid(raise_exception=True)
        postgraduate_user = serializer.save()

        return_resp = {
            "status": "success",
            "message": "Postgraduate User Info Added Successfully",
            "data": serializer.data,
        }

        return JsonResponse(
            return_resp,
            status=status.HTTP_200_OK,
        )


# -------------CreateUniversityStudentUserView-------------
class CreateUniversityStudentUserView(generics.CreateAPIView):
    queryset = UniversityStudentUser.objects.all()
    serializer_class = UniversityStudentUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)

        serializer.is_valid(raise_exception=True)
        university_student_user = serializer.save()

        return_resp = {
            "status": "success",
            "message": "University Student User Info Added Successfully",
            "data": serializer.data,
        }

        return JsonResponse(
            return_resp,
            status=status.HTTP_200_OK,
        )


# --------------------------------User Authentication Views--------------------------------
# -------------GoogleLoginApi-------------
class GoogleLoginApi(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        auth_serializer = AuthSerializer(data=request.GET)
        auth_serializer.is_valid(raise_exception=True)

        validated_data = auth_serializer.validated_data

        try:
            user_data = get_user_data(validated_data)
        except Exception as e:
            params = urlencode({"error": e})
            redirect_url = f"{settings.BASE_APP_URL}/login?{params}"

            return redirect(redirect_url)

        user = User.objects.get(email=user_data["email"])
        group = Group.objects.get(name="internal")
        user.groups.add(group)
        login(request, user)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        redirect_url = f"{settings.BASE_APP_URL}/loading?access_token={access_token}&refresh_token={refresh_token}"

        return redirect(redirect_url)


# class UserLoginView(generics.GenericAPIView):
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get("email")
#         password = request.data.get("password")
#         user = authenticate(request, username=email, password=password)

#         if user is not None:
#             refresh = RefreshToken.for_user(user)
#             profile = UserProfile.objects.get(user=user)
#             serializer = UserProfileSerializer(profile)
#             response_data = {
#                 "id": user.id,
#                 "first_name": user.first_name,
#                 "last_name": user.last_name,
#                 "email": user.email,
#                 "national_id": (
#                     profile.national_id if profile.national_id else "Not Provided"
#                 ),
#                 "profile_picture": profile.profile_picture,
#                 "contact": profile.contact if profile.contact else "Not Provided",
#                 "user_type": profile.user_type.name,
#                 "city": profile.city.id if profile.city else "Not Provided",
#                 "province": (
#                     profile.city.province.id if profile.city else "Not Provided"
#                 ),
#             }

#             return Response(
#                 {
#                     "status": "success",
#                     "message": "User logged in successfully",
#                     "data": response_data,
#                     "auth_tokens": {
#                         "refresh": str(refresh),
#                         "access": str(refresh.access_token),
#                     },
#                 },
#                 status=status.HTTP_200_OK,
#             )
#         else:
#             return Response(
#                 {
#                     "status": "error",
#                     "message": "Invalid Credentials",
#                 },
#                 status=status.HTTP_401_UNAUTHORIZED,
#             )


# -------------UserLoginView-------------
class UserLoginView(views.APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            user_data = {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
            }
            try:
                user_profile = UserProfile.objects.get(user=user)
                profile_data = {
                    "national_id": user_profile.national_id,
                    "contact": user_profile.contact,
                    "profile_picture": (
                        user_profile.profile_picture.url
                        if user_profile.profile_picture
                        else None
                    ),
                    "user_type": user_profile.user_type.name,
                    "city": user_profile.city.label,
                    "address": user_profile.address,
                    "date_of_birth": user_profile.date_of_birth,
                }
            except UserProfile.DoesNotExist:
                profile_data = {}

            return_resp = {
                "status": "success",
                "message": "User logged in successfully.",
                "data": {
                    "user": user_data,
                    "profile": profile_data,
                },
                "auth_tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
            }

            return JsonResponse(return_resp, status=status.HTTP_200_OK)

        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --------------------------------User Profile Views--------------------------------
# -------------UserProfileDetailView-------------
class UserProfileDetailView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):

        if self.kwargs.get("pk") is None:
            user = self.request.user

            try:
                profile = UserProfile.objects.get(user=user)

                return profile
            except UserProfile.DoesNotExist:
                raise NotFound("User Profile not found")
        else:
            user = self.request.user
            profile = UserProfile.objects.get(user=user)
            user_id = self.kwargs.get("pk")
            try:
                if profile.user_type.name == "admin":
                    profile = UserProfile.objects.get(pk=user_id)
                    return profile
                else:
                    raise PermissionDenied(
                        "You do not have permission to perform this action."
                    )
            except UserProfile.DoesNotExist:
                raise NotFound("User Profile not found")

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        profile_picture_url = (
            str(instance.profile_picture)
            if instance.profile_picture
            else "media/images/profile_images/empty_profile_pic.png"
        )

        user_data = {
            "user": {
                "first_name": instance.user.first_name,
                "last_name": instance.user.last_name,
                "email": instance.user.email,
                "username": instance.user.username,
            },
            "profile": {
                "id": instance.user.id,
                "national_id": (
                    instance.national_id if instance.national_id else "Not Provided"
                ),
                "profile_picture": profile_picture_url,
                "contact": instance.contact if instance.contact else "Not Provided",
                "user_type": instance.user_type.name,
                "birth_date": instance.date_of_birth if instance.date_of_birth else "",
                "city": instance.city.id if instance.city else "Not Provided",
                "province": (
                    instance.city.province.id if instance.city else "Not Provided"
                ),
            },
        }
        response_data = {
            "status": "success",
            "message": "User profile retrieved successfully.",
            "data": user_data,
        }
        # print(response_data)
        return JsonResponse(response_data, status=status.HTTP_200_OK)


# -------------UserListView-------------
class UserListView(generics.ListAPIView):
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        if self.request.user.is_superuser:
            return UserProfile.objects.all()
        else:
            return UserProfile.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if not request.user.groups.filter(name="admin").exists():
            return Response(
                {
                    "status": "error",
                    "message": "You do not have permission to perform this action.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(
            {
                "status": "success",
                "message": "All profiles retrieved successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )


# --------------------------------Update Views--------------------------------
# -------------UserProfileUpdateView-------------
class UserProfileUpdateView(generics.UpdateAPIView):
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        try:
            profile = UserProfile.objects.get(user=user)
            return profile
        except UserProfile.DoesNotExist:
            raise NotFound("User Profile not found")

    def update(self, request, *args, **kwargs):
        try:
            partial = kwargs.pop("partial", False)
            instance = self.get_object()
            serializer = self.get_serializer(
                instance, data=request.data, partial=partial
            )
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            return JsonResponse(
                {
                    "status": "success",
                    "message": "User profile updated successfully.",
                    "data": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return JsonResponse(
                {
                    "status": "error",
                    "message": str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


# -------------UserTypeUpdateView-------------
class UserTypeUpdateView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserTypeUpdateSerializer
    permission_classes = [IsAdminUserType]

    def update(self, request, *args, **kwargs):
        user_profile_id = self.kwargs.get("pk")
        user_profile = UserProfile.objects.get(pk=user_profile_id)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user_type_name = serializer.validated_data["user_type"]
            group = Group.objects.get(name=user_type_name.lower())

            try:
                user_type = UserType.objects.get(name=user_type_name)
                user_profile.user_type = user_type
                user_profile.save()
                user_profile.user.groups.add(group)

                return JsonResponse(
                    {
                        "status": "success",
                        "message": "User type updated",
                        "data": serializer.data,
                    },
                    status=status.HTTP_200_OK,
                )
            except UserType.DoesNotExist:
                return JsonResponse(
                    {
                        "status": "error",
                        "message": "UserType does not exist",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return JsonResponse(
                {
                    "status": "error",
                    "message": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


# -------------ProvinceListView-------------
class ProvinceListView(generics.ListAPIView):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return JsonResponse(
            {
                "status": "success",
                "message": "Provinces retrieved successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )


# -------------CityListView-------------
class CityListView(generics.ListAPIView):
    queryset = City.objects.all()
    serializer_class = ProvinceSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return JsonResponse(
            {
                "status": "success",
                "message": "Cities retrieved successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
