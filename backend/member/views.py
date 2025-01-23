from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile


from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse

from userProfile.models import UserProfile, PostgraduateUser, AcademicStaffUser
from .models import (
    Members,
    UserProfile,
    PostgraduateMember,
    AcademicStaffMember,
    OutsidersMember,
    Family,
    FamilyMembers,
)
from .serializers import (
    MembersSerializer,
    PostgraduateMemberSerializer,
    AcademicStaffMemberSerializer,
    OutsidersMemberSerializer,
    FamilySerializer,
    FamilyMembersSerializer,
)

class CreateOutsidersMemberView(generics.CreateAPIView):
    queryset = OutsidersMember.objects.all()
    serializer_class = OutsidersMemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        member_data = request.data
        user = request.user
        userProfile = UserProfile.objects.get(user=user)

        if "members" not in member_data:
            member_data["members"] = {}

        member_data["members"]["user"] = user.id
        member_data["members"]["userProfile"] = userProfile.id

        family_members_data = member_data.pop("family", {}).get("family_members", [])

        serializer = self.get_serializer(data=member_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        outsider_instance = serializer.instance
        member_instance = outsider_instance.members

        if family_members_data:
            family_instance = Family.objects.create(members=member_instance)

            for family_member_data in family_members_data:
                FamilyMembers.objects.create(
                    family=family_instance,
                    name=family_member_data.get("name"),
                    nic=family_member_data.get("nic"),
                    relationship=family_member_data.get("relationship"),
                    age=family_member_data.get("age"),
                )

        headers = self.get_success_headers(serializer.data)
        success_resp = {
            "status": "success",
            "message": "Outsiders Member Created",
            "data": serializer.data,
        }
        return JsonResponse(success_resp, status=201, headers=headers)


class CreateAcademicStaffMemberView(generics.CreateAPIView):
    queryset = AcademicStaffMember.objects.all()
    serializer_class = AcademicStaffMemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        member_data = request.data
        user = request.user
        userProfile = UserProfile.objects.get(user=user)

        if "members" not in member_data:
            member_data["members"] = {}

        member_data["members"]["user"] = user.id
        member_data["members"]["userProfile"] = userProfile.id

        serializer = self.get_serializer(data=member_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        success_resp = {
            "status": "success",
            "message": "Academic Staff Member Created",
            "data": serializer.data,
        }
        return JsonResponse(success_resp)


class CreatePostgraduateMemberView(generics.CreateAPIView):
    queryset = PostgraduateMember.objects.all()
    serializer_class = PostgraduateMemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        member_data = request.data
        user = request.user
        userProfile = UserProfile.objects.get(user=user)
        pgUserProfile = PostgraduateUser.objects.get(user=user)

        if "members" not in member_data:
            member_data["members"] = {}

        member_data["members"]["user"] = user.id
        member_data["members"]["userProfile"] = userProfile.id

        serializer = self.get_serializer(data=member_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        success_resp = {
            "status": "success",
            "message": "Postgraduate Member Created",
            "data": serializer.data,
        }
        return JsonResponse(success_resp)


class DeleteMemberView(generics.DestroyAPIView):
    queryset = Members.objects.all()
    serializer_class = MembersSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        success_resp = {
            "status": "success",
            "message": "Member Deleted",
        }
        return JsonResponse(success_resp, status=status.HTTP_204_NO_CONTENT)
    

class AllMembersListView(APIView):
    def get(self, request):
        members = Members.objects.all()
        members_data = MembersSerializer(members, many=True).data.count()

        postgraduate_members = PostgraduateMember.objects.all()
        postgraduate_data = PostgraduateMemberSerializer(postgraduate_members, many=True).data

        academic_staff_members = AcademicStaffMember.objects.all()
        academic_staff_data = AcademicStaffMemberSerializer(academic_staff_members, many=True).data

        outsiders_members = OutsidersMember.objects.all()
        outsiders_data = OutsidersMemberSerializer(outsiders_members, many=True).data

        return Response(
            {
                "members": members_data,
                "postgraduate_members": postgraduate_data,
                "academic_staff_members": academic_staff_data,
                "outsiders_members": outsiders_data,
            },
            status=status.HTTP_200_OK,
        )


class AllMembersCountView(APIView):
    def get(self, request):
        total_members_count = Members.objects.count()

        postgraduate_members_count = PostgraduateMember.objects.count()

        academic_staff_members_count = AcademicStaffMember.objects.count()

        outsiders_members_count = OutsidersMember.objects.count()

        return Response(
            {
                "status": "success",
                "data": {
                    "total_members_count": total_members_count,
                    "postgraduate_members_count": postgraduate_members_count,
                    "academic_staff_members_count": academic_staff_members_count,
                    "outsiders_members_count": outsiders_members_count,
                }
            },
            status=status.HTTP_200_OK,
        )
