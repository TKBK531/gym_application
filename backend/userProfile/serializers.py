from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile


class AuthSerializer(serializers.Serializer):
    code = serializers.CharField(required=False)
    error = serializers.CharField(required=False)


class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(
        source="pk",
        read_only=True,
    )

    class Meta:
        model = UserProfile
        fields = ["id", "contact", "profile_picture"]
        extra_kwargs = {
            "profile_picture": {
                "required": False,
                "allow_null": True,
                "default": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            },
        }


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
        # Check for unique email (case-insensitive)
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def create(self, validated_data):
        profile_data = validated_data.pop("profile", None)
        validated_data["username"] = validated_data["email"]  # Set email as username
        user = User.objects.create_user(**validated_data)

        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)

        return user
