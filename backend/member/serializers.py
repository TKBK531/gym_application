# from rest_framework import serializers

# from .models import UserProfile
# from .models import (
#     Members,
#     PostgraduateMember,
#     AcademicStaffMember,
#     OutsidersMember,
#     Family,
#     FamilyMembers,
# )


# # -------------MembersSerializer-------------
# class MembersSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Members
#         fields = [
#             "id",
#             "user",
#             "userProfile",
#             "age",
#             "household",
#             "membership",
#             "residence",
#             "price",
#         ]


# # -------------PostgraduateMemberSerializer-------------
# class PostgraduateMemberSerializer(serializers.ModelSerializer):

#     members = serializers.PrimaryKeyRelatedField(queryset=Members.objects.all())

#     class Meta:
#         model = PostgraduateMember
#         fields = [
#             "id",
#             "members",
#             "pg_name",
#             "stu_reg_no",
#         ]

#     def create(self, validated_data):
#         user = validated_data["user"]
#         print(user)
#         members = validated_data.pop("members")  # Extract members instance
#         print(members)
#         postgraduate_member = PostgraduateMember.objects.create(
#             members=members, **validated_data
#         )
#         return postgraduate_member


# # -------------AcademicStaffMemberSerializer-------------
# class AcademicStaffMemberSerializer(serializers.ModelSerializer):

#     members = serializers.PrimaryKeyRelatedField(queryset=Members.objects.all())

#     class Meta:
#         model = AcademicStaffMember
#         fields = [
#             "id",
#             "members",
#             "temporary",
#             "designation",
#         ]

#     def create(self, validated_data):
#         members = validated_data.pop("members")
#         academic_staff_member = AcademicStaffMember.objects.create(
#             members=members, **validated_data
#         )
#         return academic_staff_member


# # -------------OutsidersMemberSerializer-------------
# class OutsidersMemberSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = OutsidersMember
#         fields = [
#             # "id",
#             # "member",
#             # "user",
#             # "userProfile",
#             # "age",
#             # "household",
#             # "membership",
#             # "residence",
#             # "price",
#             "__all__"
#         ]

#     def create(self, validated_data):
#         members = validated_data.pop("members")
#         outsiders_member = OutsidersMember.objects.create(
#             members=members, **validated_data
#         )
#         return outsiders_member


# # -------------FamilySerializer-------------
# class FamilySerializer(serializers.ModelSerializer):

#     members = serializers.PrimaryKeyRelatedField(queryset=Members.objects.all())

#     class Meta:
#         model = Family
#         fields = [
#             "id",
#             "members",
#             "family_name",
#             "family_type",
#         ]

#     def create(self, validated_data):
#         members = validated_data.pop("members")
#         family = Family.objects.create(members=members, **validated_data)
#         return family


# # -------------FamilyMembersSerializer-------------
# class FamilyMembersSerializer(serializers.ModelSerializer):

#     family = serializers.PrimaryKeyRelatedField(queryset=Family.objects.all())

#     class Meta:
#         model = FamilyMembers
#         fields = [
#             "id",
#             "family",
#             "name",
#             "relation",
#             "age",
#         ]

#     def create(self, validated_data):
#         family = validated_data.pop("family")
#         family_member = FamilyMembers.objects.create(family=family, **validated_data)
#         return family_member


from rest_framework import serializers
from django.contrib.auth.models import User
from userProfile.models import UserProfile
from .models import (
    Members,
    PostgraduateMember,
    AcademicStaffMember,
    OutsidersMember,
    Family,
    FamilyMembers,
)


class MembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = "__all__"


class FamilySerializer(serializers.ModelSerializer):
    members = MembersSerializer()

    class Meta:
        model = Family
        fields = "__all__"


class FamilyMembersSerializer(serializers.ModelSerializer):
    family = FamilySerializer()

    class Meta:
        model = FamilyMembers
        fields = "__all__"


class AcademicStaffMemberSerializer(serializers.ModelSerializer):
    members = MembersSerializer()

    class Meta:
        model = AcademicStaffMember
        fields = "__all__"

    def create(self, validated_data):
        member_data = validated_data.pop("members")
        user = member_data.pop("user")
        userProfile = member_data.pop("userProfile")

        member = Members.objects.create(
            user=user, userProfile=userProfile, **member_data
        )

        academic_staff_member = AcademicStaffMember.objects.create(members=member)
        return academic_staff_member


class PostgraduateMemberSerializer(serializers.ModelSerializer):
    members = MembersSerializer()

    class Meta:
        model = PostgraduateMember
        fields = "__all__"

    def create(self, validated_data):
        member_data = validated_data.pop("members")
        user = member_data.pop("user")
        userProfile = member_data.pop("userProfile")

        member = Members.objects.create(
            user=user, userProfile=userProfile, **member_data
        )

        postgraduate_member = PostgraduateMember.objects.create(
            members=member, **validated_data
        )
        return postgraduate_member


class OutsidersMemberSerializer(serializers.ModelSerializer):
    members = MembersSerializer()
    family = FamilySerializer(required=False)

    class Meta:
        model = OutsidersMember
        fields = "__all__"

    def create(self, validated_data):
        member_data = validated_data.pop("members")
        family_data = validated_data.pop("family", None)
        user = self.context["request"].user
        userProfile = UserProfile.objects.get(user=user)

        # Remove user and userProfile from member_data to avoid conflict
        member_data.pop("user", None)
        member_data.pop("userProfile", None)

        # Create the Members instance
        member = Members.objects.create(
            user=user, userProfile=userProfile, **member_data
        )

        # Create the OutsidersMember instance
        outsiders_member = OutsidersMember.objects.create(members=member)

        # Create the Family instance if family data is provided
        if family_data:
            family_members_data = family_data.pop("family_members", [])
            family = Family.objects.create(members=member)

            # Create the FamilyMembers instances
            for family_member_data in family_members_data:
                FamilyMembers.objects.create(family=family, **family_member_data)

        return outsiders_member
