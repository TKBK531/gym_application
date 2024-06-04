from django.contrib.auth.models import User
from rest_framework import serializers
from .models import City, UserProfile, UserType


class AuthSerializer(serializers.Serializer):
    code = serializers.CharField(required=False)
    error = serializers.CharField(required=False)


class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="pk", read_only=True)

    class Meta:
        model = UserProfile
        fields = ["id", "contact", "profile_picture", "user_type", "city"]
        extra_kwargs = {
            "profile_picture": {
                "required": False,
                "allow_null": True,
                "default": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            },
        }

    def create(self, validated_data):
        user_type_name = validated_data.pop("user_type")
        user_type = UserType.objects.get(name=user_type_name)
        city_lable = validated_data.pop("city")
        city = City.objects.get(label=city_lable)
        validated_data["user_type"] = user_type
        validated_data["city"] = city
        return super().create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "password",
            "profile",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
            "email": {"required": True},
        }

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def create(self, validated_data):
        profile_data = validated_data.pop("profile", None)
        validated_data["username"] = validated_data["email"]
        user = User.objects.create_user(**validated_data)

        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)

        return user
