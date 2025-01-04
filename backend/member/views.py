from django.shortcuts import render
from django.http import HttpResponse

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse

from userProfile.models import UserProfile
from .models import Members, PostgraduateMember, AcademicStaffMember, OutsidersMember, Family, FamilyMembers
from .serializers import (
    MembersSerializer,
    PostgraduateMemberSerializer,
    AcademicStaffMemberSerializer,
    OutsidersMemberSerializer,
    FamilySerializer,
    FamilyMembersSerializer,
)


# # -------------CreateMemberView-------------
# class CreateMemberView(generics.CreateAPIView):
#     queryset = Members.objects.all()
#     serializer_class = MembersSerializer
#     permission_classes = [AllowAny]

#     def create(self, request, *args, **kwargs):
#         data = request.data.copy()
#         user = request.user

#         # Ensure the user is authenticated
#         if user.is_anonymous:
#             return JsonResponse(
#                 {"status": "error", "message": "Authentication required"},
#                 status=status.HTTP_401_UNAUTHORIZED,
#             )

#         # Add the logged-in user to the data
#         data["user"] = user.id

#         serializer = self.get_serializer(data=data)
#         serializer.is_valid(raise_exception=True)
#         member = serializer.save()

#         return_resp = {
#             "status": "success",
#             "message": "Member Info Added Successfully",
#             "data": serializer.data,
#         }

#         return JsonResponse(return_resp, status=status.HTTP_200_OK) 

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


# # -------------CreatePostgraduateMemberView-------------
# class CreatePostgraduateMemberView(generics.CreateAPIView):
#     queryset = PostgraduateMember.objects.all()
#     serializer_class = PostgraduateMemberSerializer
#     permission_classes = [AllowAny]

#     def create(self, request, *args, **kwargs):
#         data = request.data.copy()
#         user = request.user

#         if user.is_anonymous:
#             return JsonResponse(
#                 {"status": "error", "message": "Authentication required"},
#                 status=status.HTTP_401_UNAUTHORIZED,
#             )
        
#         # Ensure the Members instance exists
#         members_data = data.pop('members')
#         member, created = Members.objects.get(
#             user=user,
#             defaults={
#                 'age': members_data.get('age'),
#                 'household': members_data.get('household'),
#                 'membership': members_data.get('membership'),
#                 'residence': members_data.get('residence'),
#                 'price': members_data.get('price'),
#             }
#         )

#         data["members"]["user"] = user.id  # Add the logged-in user ID to nested data

#         serializer = self.get_serializer(data=data)
#         serializer.is_valid(raise_exception=True)
#         postgraduate_member = serializer.save()

#         return_resp = {
#             "status": "success",
#             "message": "Postgraduate Member Info Added Successfully",
#             "data": serializer.data,
#         }

#         return JsonResponse(return_resp, status=status.HTTP_200_OK)

# -------------CreatePostgraduateMemberView-------------
class CreatePostgraduateMemberView(generics.CreateAPIView):
    queryset = PostgraduateMember.objects.all()
    serializer_class = PostgraduateMemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user

        # Ensure the user has a profile
        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return JsonResponse(
                {"status": "error", "message": "User profile not found."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Fetch user profile details
        user_profile = UserProfile.objects.get(user=user)
        members_data = {
            'user': user.id,
            'age': user_profile.date_of_birth,
            'household': request.data.get('household', ''),
            'membership': request.data.get('membership', ''),
            'residence': user_profile.address,
            'price': request.data.get('price', 0),
        }

        member, created = Members.objects.get_or_create(user=user, defaults=members_data)

        # Prepare data for PostgraduateMember
        postgraduate_data = {
            'members': member.id,
            'pg_name': request.data.get('pg_name', ''),
            'stu_reg_no': request.data.get('stu_reg_no', ''),
        }

        serializer = self.get_serializer(data=postgraduate_data)
        serializer.is_valid(raise_exception=True)
        postgraduate_member = serializer.save()

        return JsonResponse({
            "status": "success",
            "message": "Postgraduate Member Info Added Successfully",
            "data": serializer.data,
        }, status=status.HTTP_201_CREATED)


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

'''
# Base Member Creation View
class CreateMemberView(generics.CreateAPIView):
    queryset = Members.objects.all()
    serializer_class = MembersSerializer
    permission_classes = [IsAuthenticated]

    def create_member(self, user):
        # Create or retrieve the Members instance for the logged-in user
        member, created = Members.objects.get_or_create(
            user=user,
            defaults={
                'age': 0,  # Provide default values if needed
                'household': '',
                'membership': 'Basic',
                'residence': '',
                'price': 0.0,
            }
        )
        return member


class CreatePostgraduateMemberView(generics.CreateAPIView):
    queryset = PostgraduateMember.objects.all()
    serializer_class = PostgraduateMemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        member = CreateMemberView().create_member(request.user)  # Ensure base member exists
        data = request.data.copy()
        data['members'] = member.id  # Associate with the logged-in user's member

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        postgraduate_member = serializer.save()

        return JsonResponse({
            "status": "success",
            "message": "Postgraduate Member Profile Created Successfully",
            "data": serializer.data,
        }, status=status.HTTP_201_CREATED)


class CreateOutsiderMemberView(generics.CreateAPIView):
    queryset = OutsidersMember.objects.all()
    serializer_class = OutsidersMemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        member = CreateMemberView().create_member(request.user)  # Ensure base member exists
        data = request.data.copy()
        data['members'] = member.id  # Associate with the logged-in user's member

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        outsider_member = serializer.save()

        return JsonResponse({
            "status": "success",
            "message": "Outsider Member Profile Created Successfully",
            "data": serializer.data,
        }, status=status.HTTP_201_CREATED)


class CreateAcademicStaffMemberView(generics.CreateAPIView):
    queryset = AcademicStaffMember.objects.all()
    serializer_class = AcademicStaffMemberSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        member = CreateMemberView().create_member(request.user)  # Ensure base member exists
        data = request.data.copy()
        data['members'] = member.id  # Associate with the logged-in user's member

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        staff_member = serializer.save()

        return JsonResponse({
            "status": "success",
            "message": "Staff Member Profile Created Successfully",
            "data": serializer.data,
        }, status=status.HTTP_201_CREATED)
'''

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
