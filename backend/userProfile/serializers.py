from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import City, UserProfile, UserType


class AuthSerializer(serializers.Serializer):
    code = serializers.CharField(required=False)
    error = serializers.CharField(required=False)


class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="pk", read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            "id",
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

    def create(self, validated_data):
        user_type_name = validated_data.pop("user_type")
        user_type = UserType.objects.get(name=user_type_name)

        city_lable = validated_data.pop("city")
        city = City.objects.get(label=city_lable)

        validated_data["user_type"] = user_type
        validated_data["city"] = city

        user_profile = super().create(validated_data)
        self._assign_user_to_group(user_profile, user_type_name)
        return user_profile

    def update(self, instance, validated_data):
        user_type_name = validated_data.pop("user_type", None)
        city_label = validated_data.pop("city", None)

        if user_type_name:
            user_type = UserType.objects.get(name=user_type_name)
            validated_data["user_type"] = user_type
            print(user_type_name)
            self._assign_user_to_group(instance, user_type_name)

        if city_label:
            city = City.objects.get(label=city_label)
            validated_data["city"] = city

        return super().update(instance, validated_data)

    def _assign_user_to_group(self, user_profile, user_type_name):
        group, created = Group.objects.get_or_create(name=user_type_name)
        user_profile.user.groups.clear()  # Clear existing groups
        print(group.name)
        user_profile.user.groups.add(group)


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

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", None)
        user = super().update(instance, validated_data)

        if profile_data:
            profile_serializer = self.fields["profile"]
            profile_instance = instance.profile

            if profile_instance:
                profile_serializer.update(profile_instance, profile_data)
            else:
                raise serializers.ValidationError("User profile does not exist.")

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
        print(validated_data)
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

        print(validated_data)
        return super().update(instance, validated_data)


class UserTypeUpdateSerializer(serializers.Serializer):
    user_type = serializers.CharField()
