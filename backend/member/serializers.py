from rest_framework import serializers

from .models import UserProfile
from .models import (
    Members, 
    PostgraduateMember, 
    AcademicStaffMember, 
    OutsidersMember, 
    Family, 
    FamilyMembers,
)



# -------------CustomUserProfileSerializer-------------
class CustomUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["national_id","contact","address","date_of_birth"]  # Only required fields


# -------------MembersSerializer-------------
class MembersSerializer(serializers.ModelSerializer):
    userProfile = CustomUserProfileSerializer() # use the custom serializer

    class Meta:
        model = Members
        fields = ['id', 'user', 'userProfile', 'age', 'household', 'membership', 'residence', 'price']


# -------------PostgraduateMemberSerializer-------------
class PostgraduateMemberSerializer(serializers.ModelSerializer):

    members = serializers.PrimaryKeyRelatedField(queryset=Members.objects.all())    # Accepts member ID

    class Meta:
        model = PostgraduateMember
        fields = ['id', 'members', 'pg_name', 'stu_reg_no']

    def create(self, validated_data):
        user = validated_data["user"]
        print("-------------------------------------------Hello")
        print(user)
        members = validated_data.pop('members')  # Extract members instance
        print(members)
        postgraduate_member = PostgraduateMember.objects.create(members=members, **validated_data)
        return postgraduate_member    


# -------------AcademicStaffMemberSerializer-------------
class AcademicStaffMemberSerializer(serializers.ModelSerializer):

    members = serializers.PrimaryKeyRelatedField(queryset=Members.objects.all())

    class Meta:
        model = AcademicStaffMember
        fields = ['id', 'members', 'temporary', 'designation']

    def create(self, validated_data):
        members = validated_data.pop('members')
        academic_staff_member = AcademicStaffMember.objects.create(members=members, **validated_data)
        return academic_staff_member


# -------------OutsidersMemberSerializer-------------
class OutsidersMemberSerializer(serializers.ModelSerializer):

    members = serializers.PrimaryKeyRelatedField(queryset=Members.objects.all())

    class Meta:
        model = OutsidersMember
        fields = ['id', 'members']

    def create(self, validated_data):
        members = validated_data.pop('members')
        outsiders_member = OutsidersMember.objects.create(members=members, **validated_data)
        return outsiders_member


# -------------FamilySerializer-------------
class FamilySerializer(serializers.ModelSerializer):
    
    members = serializers.PrimaryKeyRelatedField(queryset=Members.objects.all())

    class Meta:
        model = Family
        fields = ['id', 'members', 'family_name', 'family_type']

    def create(self, validated_data):
        members = validated_data.pop('members')
        family = Family.objects.create(members=members, **validated_data)
        return family
    

# -------------FamilyMembersSerializer-------------
class FamilyMembersSerializer(serializers.ModelSerializer):

    family = serializers.PrimaryKeyRelatedField(queryset=Family.objects.all())
    
    class Meta:
        model = FamilyMembers
        fields = ['id', 'family', 'name', 'relation', 'age']

    def create(self, validated_data):
        family = validated_data.pop('family')
        family_member = FamilyMembers.objects.create(family=family, **validated_data)
        return family_member