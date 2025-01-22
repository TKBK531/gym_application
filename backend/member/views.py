from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from .serializers import CustomUserProfileSerializer


from django.shortcuts import render
from django.http import HttpResponse

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse

from userProfile.models import UserProfile
from .models import Members, UserProfile, PostgraduateMember, AcademicStaffMember, OutsidersMember, Family, FamilyMembers
from .serializers import (
    MembersSerializer,
    CustomUserProfileSerializer,
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
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user

        # Fetch user profile details
        user_profile = UserProfile.objects.get(user=user)
        data = {
            'user': user.id,
            'age': user_profile.date_of_birth,
            'household': request.data.get('household', ''),
            'membership': request.data.get('membership', ''),
            'residence': user_profile.address,
            'price': request.data.get('price', 0),
        }

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        member = serializer.save()

        return JsonResponse({
            "status": "success",
            "message": "Member Info Added Successfully",
            "data": serializer.data,
        }, status=status.HTTP_201_CREATED)
    

# -------------UserProfileView-------------
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
            serializer = CustomUserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile not found"}, status=404)


# -------------CreatePostgraduateMemberView-------------
class CreatePostgraduateMemberView(generics.CreateAPIView):
    queryset = PostgraduateMember.objects.all()
    serializer_class = PostgraduateMemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        member_data = request.data
        user = request.user
        
        if user.is_anonymous:
            return JsonResponse(
                {"status": "error", "message": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        member_data["user"] = user.id

        print(member_data)
        serializer = self.get_serializer(data=member_data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return JsonResponse({
            "status": "success",
            "message": "Postgraduate Member Info Added Successfully",
            "data": serializer.data,
        }, status=status.HTTP_201_CREATED)


# -------------CreateAcademicStaffMemberView-------------
class CreateAcademicStaffMemberView(generics.CreateAPIView):
    queryset = AcademicStaffMember.objects.all()
    serializer_class = AcademicStaffMemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return JsonResponse({
            "status": "success",
            "message": "Academic Staff Member Info Added Successfully",
            "data": serializer.data,
        }, status=status.HTTP_201_CREATED)



# -------------CreateOutsidersMemberView-------------
class CreateOutsidersMemberView(generics.CreateAPIView):
    queryset = OutsidersMember.objects.all()
    serializer_class = OutsidersMemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return JsonResponse({
            "status": "success",
            "message": "Outsiders Member Info Added Successfully",
            "data": serializer.data,
        }, status=status.HTTP_201_CREATED)



# -------------CreateFamilyView-------------
class CreateFamilyView(generics.CreateAPIView):
    queryset = Family.objects.all()
    serializer_class = FamilySerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return JsonResponse({
            "status": "success",
            "message": "Family Info Added Successfully",
            "data": serializer.data,
        }, status=status.HTTP_201_CREATED)


class MemberListView(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        try:
            members = Members.objects.all()

            # Handle the case where no members exist
            if not members.exists():
                return Response(
                    {"message": "No members found."},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = MembersSerializer(members, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            # Handle unexpected server errors
            return Response(
                {"error": "An error occurred while fetching members.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# -------------CreateFamilyMemberView-------------
class CreateFamilyMemberView(generics.CreateAPIView):
    queryset = FamilyMembers.objects.all()
    serializer_class = FamilyMembersSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return JsonResponse({
            "status": "success",
            "message": "Family Member Info Added Successfully",
            "data": serializer.data,
        }, status=status.HTTP_201_CREATED)

