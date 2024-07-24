from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import (
    City,
    Province,
    UserProfile,
    UserType,
    AcademicStaffUser,
    Faculty,
    PostgraduateUser,
    UniversityStudentUser,
)
from django.core.exceptions import ValidationError


class AuthSerializer(serializers.Serializer):
    code = serializers.CharField(required=False)
    error = serializers.CharField(required=False)


class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(
        max_length=None, use_url=True, allow_null=True, required=False
    )

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

    def get_profile_picture(self, obj):
        if obj.profile_picture and hasattr(obj.profile_picture, "url"):
            # Use Django's get_absolute_url() method if available, or prepend the domain manually
            request = self.context.get("request")
            return (
                request.build_absolute_uri(obj.profile_picture.url)
                if request
                else obj.profile_picture.url
            )
        return None

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


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data["email"], password=data["password"])
        if user:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class AcademicStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicStaffUser
        fields = [
            "user",
            "faculty",
            "date_of_appointment",
            "upf_number",
        ]

    def validate_user(self, value):
        if AcademicStaffUser.objects.filter(user=value).exists():
            raise ValidationError("User already has an Academic staff Account.")
        return value

    def validate_upf_number(self, value):
        if AcademicStaffUser.objects.filter(upf_number=value).exists():
            raise ValidationError("An account with the same UPF number already exists.")
        return value

    def validate_faculty(self, value):
        if Faculty.objects.filter(pk=value.id).exists():
            return value
        else:
            raise ValidationError("Faculty does not exist.")

    def create(self, validated_data):
        user = validated_data["user"]
        faculty = validated_data["faculty"]
        if isinstance(user, int) and isinstance(faculty, int):
            user = UserProfile.objects.get(pk=user)
            faculty = Faculty.objects.get(pk=faculty)

        validated_data["user"] = user
        userProfile = UserProfile.objects.get(user=user)
        userProfile.user_type = UserType.objects.get(name="academic")
        userProfile.save()
        validated_data["faculty"] = faculty
        return super().create(validated_data)


class PostgraduateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostgraduateUser
        fields = [
            "user",
            "pg_registration_number",
            "pg_commencement_date",
        ]

    def validate_user(self, value):
        if PostgraduateUser.objects.filter(user=value).exists():
            raise ValidationError("User already has a Postgraduate User Account.")
        return value

    def validate_pg_registration_number(self, value):
        if PostgraduateUser.objects.filter(pg_registration_number=value).exists():
            raise ValidationError(
                "An account with the same registration number already exists."
            )
        return value

    def create(self, validated_data):
        user = validated_data["user"]
        if isinstance(user, int):
            user = UserProfile.objects.get(pk=user)

        validated_data["user"] = user
        userProfile = UserProfile.objects.get(user=user)
        userProfile.user_type = UserType.objects.get(name="postgraduate")
        userProfile.save()
        return super().create(validated_data)


class UniversityStudentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniversityStudentUser
        fields = [
            "user",
            "registration_number",
            "faculty",
        ]

    def validate_user(self, value):
        if UniversityStudentUser.objects.filter(user=value).exists():
            raise ValidationError("User already has a University Student Account.")
        return value

    def validate_registration_number(self, value):
        if UniversityStudentUser.objects.filter(registration_number=value).exists():
            raise ValidationError(
                "An account with the same registration number already exists."
            )
        return value

    def create(self, validated_data):
        user = validated_data["user"]
        faculty = validated_data["faculty"]
        if isinstance(user, int) and isinstance(faculty, int):
            user = UserProfile.objects.get(pk=user)
            faculty = Faculty.objects.get(pk=faculty)

        validated_data["user"] = user
        userProfile = UserProfile.objects.get(user=user)
        userProfile.user_type = UserType.objects.get(name="student")
        userProfile.save()
        validated_data["faculty"] = faculty
        return super().create(validated_data)


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
            "date_of_birth",
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


class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = [
            "id",
            "label",
        ]


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"
