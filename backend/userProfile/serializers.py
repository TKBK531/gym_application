from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import City, UserProfile, UserType, AcademicStaffUser, Faculty
from django.core.exceptions import ValidationError


class AuthSerializer(serializers.Serializer):
    code = serializers.CharField(required=False)
    error = serializers.CharField(required=False)


# class UserProfileSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(source="pk", read_only=True)

#     class Meta:
#         model = UserProfile
#         fields = [
#             "id",
#             "national_id",
#             "contact",
#             "profile_picture",
#             "user_type",
#             "city",
#         ]
#         extra_kwargs = {
#             "profile_picture": {
#                 "required": False,
#                 "allow_null": True,
#                 "default": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
#             },
#         }

#     def create(self, validated_data):
#         user_type_name = validated_data.pop("user_type")
#         user_type = UserType.objects.get(name=user_type_name)

#         city_lable = validated_data.pop("city")
#         city = City.objects.get(label=city_lable)

#         validated_data["user_type"] = user_type
#         validated_data["city"] = city

#         user_profile = super().create(validated_data)
#         self._assign_user_to_group(user_profile, user_type_name)
#         return user_profile

#     def update(self, instance, validated_data):
#         user_type_name = validated_data.pop("user_type", None)
#         city_label = validated_data.pop("city", None)

#         if user_type_name:
#             user_type = UserType.objects.get(name=user_type_name)
#             validated_data["user_type"] = user_type
#             print(user_type_name)
#             self._assign_user_to_group(instance, user_type_name)

#         if city_label:
#             city = City.objects.get(label=city_label)
#             validated_data["city"] = city

#         return super().update(instance, validated_data)

#     def _assign_user_to_group(self, user_profile, user_type_name):
#         group, created = Group.objects.get_or_create(name=user_type_name)
#         user_profile.user.groups.clear()  # Clear existing groups
#         print(group.name)
#         user_profile.user.groups.add(group)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            "user",
            "national_id",
            "contact",
            "profile_picture",
            "user_type",
            "city",
            "address",
            "date_of_birth",
        ]

    def create(self, validated_data):
        user_type = validated_data["user_type"]
        city = validated_data["city"]

        if isinstance(user_type, str) and isinstance(city, str):
            user_type = UserType.objects.get(name=user_type)
            city = City.objects.get(label=city)
            validated_data["user_type"] = user_type
            validated_data["city"] = city

        user_profile = super().create(validated_data)
        self.assign_user_to_group(user_profile, user_type)
        return user_profile

    def assign_user_to_group(self, user_profile, user_type):
        if user_type.name in [
            "student",
            "academic",
            "admin",
            "postgraduate",
            "staff",
        ]:
            group = Group.objects.get(name="internal")
        else:
            group = Group.objects.get(name="external")

        user_profile.user.groups.clear()
        user_profile.user.groups.add(group)


class AcademicStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicStaffUser
        fields = [
            "user",
            "faculty",
            "date_of_appointment",
            "upf_number",
        ]

    def create(self, validated_data):
        user = validated_data["user"]
        faculty = validated_data["faculty"]
        print(user, faculty)
        if isinstance(user, int) and isinstance(faculty, int):
            user = UserProfile.objects.get(pk=user)
            faculty = Faculty.objects.get(pk=faculty)

        validated_data["user"] = user
        validated_data["faculty"] = faculty
        print(validated_data)
        return super().create(validated_data)


# class UserSerializer(serializers.ModelSerializer):
#     profile = UserProfileSerializer(required=False, allow_null=True)

#     class Meta:
#         model = User
#         fields = [
#             "id",
#             "first_name",
#             "last_name",
#             "email",
#             "password",
#             "profile",
#         ]
#         extra_kwargs = {
#             "password": {"write_only": True},
#             "first_name": {"required": True},
#             "last_name": {"required": True},
#             "email": {"required": True},
#         }

#     def validate_email(self, value):
#         if User.objects.filter(email__iexact=value).exists():
#             raise serializers.ValidationError("A user with that email already exists.")
#         return value

#     def create(self, validated_data):
#         profile_data = validated_data.pop("profile", None)
#         validated_data["username"] = validated_data["email"]
#         user = User.objects.create_user(**validated_data)

#         if profile_data:
#             UserProfile.objects.create(user=user, **profile_data)
#         try:
#             self.add_user_to_group(user)
#         except Exception as e:
#             raise serializers.ValidationError(
#                 f"Failed to add user to external group: {e}"
#             )

#         return user

#     def add_user_to_group(self, user):
#         try:
#             group = Group.objects.get(name="external")  # Get the group
#         except Group.DoesNotExist:
#             raise serializers.ValidationError("The 'external' group does not exist.")

#         user.groups.add(group)

#     def update(self, instance, validated_data):
#         profile_data = validated_data.pop("profile", None)
#         user = super().update(instance, validated_data)

#         if profile_data:
#             profile_serializer = self.fields["profile"]
#             profile_instance = instance.profile

#             if profile_instance:
#                 profile_serializer.update(profile_instance, profile_data)
#             else:
#                 raise serializers.ValidationError("User profile does not exist.")

#         return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "password",
        ]

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def create(self, validated_data):
        user = User(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
            username=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        return user


class UserDataSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="pk", read_only=True)
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    email = serializers.EmailField(source="user.email")
    username = serializers.CharField(source="user.username")

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "national_id",
            "contact",
            "profile_picture",
            "user_type",
            "city",
        ]
        extra_kwargs = {
            "profile_picture": {
                "required": False,
                "allow_null": True,
                "default": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            },
        }

    def update(self, instance, validated_data):
        # print(validated_data)
        user_data = validated_data.pop("user", {})
        user = instance.user

        user.first_name = user_data.get("first_name", user.first_name)
        user.last_name = user_data.get("last_name", user.last_name)
        user.email = user_data.get("email", user.email)
        user.username = user_data.get("email", user.username)
        user.save()

        user_type_name = validated_data.pop("user_type", None)
        city_label = validated_data.pop("city", None)

        if user_type_name:
            user_type = UserType.objects.get(name=user_type_name)
            validated_data["user_type"] = user_type

        if city_label:
            city = City.objects.get(label=city_label)
            validated_data["city"] = city

        # print(validated_data)
        return super().update(instance, validated_data)


class UserTypeUpdateSerializer(serializers.Serializer):
    user_type = serializers.CharField()
