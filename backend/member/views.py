from django.shortcuts import render
from django.http import HttpResponse

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from .models import Members, PostgraduateMember, AcademicStaffMember, OutsidersMember, Family, FamilyMembers
from .serializers import (
    MembersSerializer,
    PostgraduateMemberSerializer,
    AcademicStaffMemberSerializer,
    OutsidersMemberSerializer,
    FamilySerializer,
    FamilyMembersSerializer,
)


# -------------CreateMemberView-------------
class CreateMemberView(generics.CreateAPIView):
    queryset = Members.objects.all()
    serializer_class = MembersSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        user = request.user

        # Ensure the user is authenticated
        if user.is_anonymous:
            return JsonResponse(
                {"status": "error", "message": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Add the logged-in user to the data
        data["user"] = user.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        member = serializer.save()

        return_resp = {
            "status": "success",
            "message": "Member Info Added Successfully",
            "data": serializer.data,
        }

        return JsonResponse(return_resp, status=status.HTTP_200_OK)


# -------------CreatePostgraduateMemberView-------------
class CreatePostgraduateMemberView(generics.CreateAPIView):
    queryset = PostgraduateMember.objects.all()
    serializer_class = PostgraduateMemberSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        user = request.user

        if user.is_anonymous:
            return JsonResponse(
                {"status": "error", "message": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        data["members"]["user"] = user.id  # Add the logged-in user ID to nested data

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        postgraduate_member = serializer.save()

        return_resp = {
            "status": "success",
            "message": "Postgraduate Member Info Added Successfully",
            "data": serializer.data,
        }

        return JsonResponse(return_resp, status=status.HTTP_200_OK)


# -------------CreateAcademicStaffMemberView-------------
class CreateAcademicStaffMemberView(generics.CreateAPIView):
    queryset = AcademicStaffMember.objects.all()
    serializer_class = AcademicStaffMemberSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        user = request.user

        if user.is_anonymous:
            return JsonResponse(
                {"status": "error", "message": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        data["members"]["user"] = user.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        academic_staff_member = serializer.save()

        return_resp = {
            "status": "success",
            "message": "Academic Staff Member Info Added Successfully",
            "data": serializer.data,
        }

        return JsonResponse(return_resp, status=status.HTTP_200_OK)


# -------------CreateOutsidersMemberView-------------
class CreateOutsidersMemberView(generics.CreateAPIView):
    queryset = OutsidersMember.objects.all()
    serializer_class = OutsidersMemberSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        user = request.user

        # Ensure the user is authenticated
        if user.is_anonymous:
            return JsonResponse(
                {"status": "error", "message": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Add the logged-in user ID to the nested data
        data["members"]["user"] = user.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        outsiders_member = serializer.save()

        return_resp = {
            "status": "success",
            "message": "Outsiders Member Info Added Successfully",
            "data": serializer.data,
        }

        return JsonResponse(return_resp, status=status.HTTP_200_OK)



# -------------CreateFamilyView-------------
class CreateFamilyView(generics.CreateAPIView):
    queryset = Family.objects.all()
    serializer_class = FamilySerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        user = request.user

        if user.is_anonymous:
            return JsonResponse(
                {"status": "error", "message": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        data["members"]["user"] = user.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        family = serializer.save()

        return_resp = {
            "status": "success",
            "message": "Family Info Added Successfully",
            "data": serializer.data,
        }

        return JsonResponse(return_resp, status=status.HTTP_200_OK)


# -------------CreateFamilyMemberView-------------
class CreateFamilyMemberView(generics.CreateAPIView):
    queryset = FamilyMembers.objects.all()
    serializer_class = FamilyMembersSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        family_member = serializer.save()

        return_resp = {
            "status": "success",
            "message": "Family Member Info Added Successfully",
            "data": serializer.data,
        }

        return JsonResponse(return_resp, status=status.HTTP_200_OK)
