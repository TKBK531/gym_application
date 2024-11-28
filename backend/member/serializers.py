from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Members,
    PostgraduateMember,
    AcademicStaffMember,
    OutsidersMember,
    Family,
    FamilyMembers,
)

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="pk", read_only=True)
    first_name = serializers.CharField(source="first_name")
    last_name = serializers.CharField(source="last_name")
    email = serializers.EmailField()
    username = serializers.CharField()

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "username", "email"]


# class MembersSerializer(serializers.ModelSerializer):
#     user = UserSerializer()  # Nested User data

#     class Meta:
#         model = Members
#         fields = ["id", "user", "age", "household", "membership", "residence", "price"]

#     def update(self, instance, validated_data):
#         user_data = validated_data.pop("user", {})
#         user = instance.user

#         # Update user fields
#         user.first_name = user_data.get("first_name", user.first_name)
#         user.last_name = user_data.get("last_name", user.last_name)
#         user.email = user_data.get("email", user.email)
#         user.username = user_data.get("username", user.username)
#         user.save()

#         # Update Members fields
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()
#         return instance
    
class MembersSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested User data

    class Meta:
        model = Members
        fields = ["id", "user", "age", "household", "membership", "residence", "price"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        # Create the user instance
        user = User.objects.create(
            first_name=user_data.get("first_name"),
            last_name=user_data.get("last_name"),
            email=user_data.get("email"),
            username=user_data.get("username"),
        )
        # Create the Members instance
        members = Members.objects.create(user=user, **validated_data)
        return members

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        user = instance.user

        # Update user fields
        user.first_name = user_data.get("first_name", user.first_name)
        user.last_name = user_data.get("last_name", user.last_name)
        user.email = user_data.get("email", user.email)
        user.username = user_data.get("username", user.username)
        user.save()

        # Update Members fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def delete(self, instance):
        # Delete the related user and member instance
        user = instance.user
        instance.delete()  # Deletes the Members instance
        user.delete()      # Deletes the related User instance
        return {"message": "Member and associated user deleted successfully"}


class PostgraduateMemberSerializer(serializers.ModelSerializer):
    members = MembersSerializer()

    class Meta:
        model = PostgraduateMember
        fields = ["id", "members", "pg_name", "stu_reg_no"]


class AcademicStaffMemberSerializer(serializers.ModelSerializer):
    members = MembersSerializer()

    class Meta:
        model = AcademicStaffMember
        fields = ["id", "members", "designation", "temporary"]


class OutsidersMemberSerializer(serializers.ModelSerializer):
    members = MembersSerializer()

    class Meta:
        model = OutsidersMember
        fields = ["id", "members"]


class FamilySerializer(serializers.ModelSerializer):
    members = MembersSerializer()

    class Meta:
        model = Family
        fields = ["id", "members"]


class FamilyMembersSerializer(serializers.ModelSerializer):
    family = FamilySerializer()

    class Meta:
        model = FamilyMembers
        fields = ["id", "family", "name", "nic", "relationship", "age"]

    def __str__(self):
        return f"{self.family.members.user.username} - {self.name}"
