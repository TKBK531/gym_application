from rest_framework import serializers

from userProfile.models import UserProfile
from .models import (
    Members, 
    PostgraduateMember, 
    AcademicStaffMember, 
    OutsidersMember, 
    Family, 
    FamilyMembers,
)
from django.contrib.auth.models import User  # Assuming User model is used


# -------------MembersSerializer-------------
class MembersSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Use existing user

    class Meta:
        model = Members
        fields = ['id', 'user', 'age', 'household', 'membership', 'residence', 'price']


# -------------PostgraduateMemberSerializer-------------
class PostgraduateMemberSerializer(serializers.ModelSerializer):
    # members = MembersSerializer()  # Nested Members data
    members = MembersSerializer(read_only=True)  # Read-only nested field

    class Meta:
        model = PostgraduateMember
        fields = ['id', 'members', 'pg_name', 'stu_reg_no']

    # def create(self, validated_data):
    #     members_data = validated_data.pop('members')
    #     member = Members.objects.get(pk=members_data['user'].id)  # Use existing member
    #     postgraduate_member = PostgraduateMember.objects.create(members=member, **validated_data)
    #     return postgraduate_member

        # def create(self, validated_data):
        #     members_data = validated_data.pop('members')

        #     # Ensure the Members instance exists or create it
        #     user = self.context['request'].user
        #     member, created = Members.objects.get_or_create(
        #         user=user,
        #         defaults={
        #             'age': members_data.get('age'),
        #             'household': members_data.get('household'),
        #             'membership': members_data.get('membership'),
        #             'residence': members_data.get('residence'),
        #             'price': members_data.get('price'),
        #         }
        #     )

        #     # Create the PostgraduateMember object
        #     postgraduate_member = PostgraduateMember.objects.create(members=member, **validated_data)
        #     return postgraduate_member
        
        def create(self, validated_data):
            members_data = validated_data.pop('members')
            user = self.context['request'].user

            # Fetch user profile details
            user_profile = UserProfile.objects.get(user=user)
            member, created = Members.objects.get(
                user=user,
                defaults={
                    'age': user_profile.date_of_birth,
                    'household': members_data.get('household', ''),
                    'membership': members_data.get('membership', ''),
                    'residence': user_profile.address,
                    'price': members_data.get('price', 0),
                }
            )

            # Create PostgraduateMember
            postgraduate_member = PostgraduateMember.objects.create(members=member, **validated_data)
            return postgraduate_member


# -------------AcademicStaffMemberSerializer-------------
class AcademicStaffMemberSerializer(serializers.ModelSerializer):
    members = MembersSerializer()

    class Meta:
        model = AcademicStaffMember
        fields = ['id', 'members', 'temporary', 'designation']

    def create(self, validated_data):
        members_data = validated_data.pop('members')
        member = Members.objects.get(pk=members_data['user'].id)
        academic_staff_member = AcademicStaffMember.objects.create(members=member, **validated_data)
        return academic_staff_member


# -------------OutsidersMemberSerializer-------------
class OutsidersMemberSerializer(serializers.ModelSerializer):
    members = MembersSerializer()

    class Meta:
        model = OutsidersMember
        fields = ['id', 'members']

    def create(self, validated_data):
        members_data = validated_data.pop('members')
        member = Members.objects.get(pk=members_data['user'].id)
        outsiders_member = OutsidersMember.objects.create(members=member, **validated_data)
        return outsiders_member

# -------------FamilySerializer-------------
class FamilySerializer(serializers.ModelSerializer):
    members = MembersSerializer()

    class Meta:
        model = Family
        fields = ['id', 'members', 'family_name', 'family_type']

    def create(self, validated_data):
        members_data = validated_data.pop('members')
        member = Members.objects.get(pk=members_data['user'].id)
        family = Family.objects.create(members=member, **validated_data)
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
