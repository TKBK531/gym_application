from django.conf import settings
from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import generics

from userProfile.models import UserProfile
from .models import Sport, Post
from .serializers import SportSerializer, PostSerializer
from django.http import JsonResponse


# Create your views here.
class SportListView(generics.ListAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        sports_data = serializer.data

        # Add in_charge_name to each sport's data
        for sport in sports_data:
            in_charge_id = sport.get("in_charge")
            if in_charge_id:
                try:
                    in_charge_user = User.objects.get(id=in_charge_id)
                    sport["in_charge_name"] = in_charge_user.get_full_name()
                except User.DoesNotExist:
                    sport["in_charge_name"] = None
            else:
                sport["in_charge_name"] = None

        return JsonResponse(
            {
                "status": "success",
                "data": sports_data,
            },
            safe=False,
        )


class SportDetailView(generics.RetrieveAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        sport_data = serializer.data

        in_charge_id = sport_data.get("in_charge")
        if in_charge_id:
            try:
                in_charge_user = User.objects.get(id=in_charge_id)
                sport_data["in_charge_name"] = in_charge_user.get_full_name()
            except User.DoesNotExist:
                sport_data["in_charge_name"] = None
        else:
            sport_data["in_charge_name"] = None

        return JsonResponse(
            {
                "status": "success",
                "data": sport_data,
                "message": "Sport details retrieved successfully",
            }
        )


class UpdateInChargeView(generics.UpdateAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [IsAuthenticated]

    def get_user(self, user_profile_id):
        try:
            in_charge_profile = UserProfile.objects.get(id=user_profile_id)
            in_charge = in_charge_profile.user
            if in_charge.groups.filter(name="staff").exists():
                return in_charge
            else:
                raise ValidationError("User is not a staff member")
        except User.DoesNotExist:
            return None

    def get_sport(self, sport_id):
        try:
            sport = Sport.objects.get(id=sport_id)
            return sport
        except Sport.DoesNotExist:
            return None

    def update(self, request, *args, **kwargs):
        if request.user.groups.filter(name="admin").exists():
            user_id = request.data.get("in_charge")
            if not user_id:
                return JsonResponse(
                    {"status": "error", "message": "In charge user ID is required"},
                    status=400,
                )

            try:
                in_charge = self.get_user(user_id)
            except ValidationError as e:
                return JsonResponse({"status": "error", "message": str(e)}, status=400)

            sport_id = kwargs.get("pk")
            try:
                sport = self.get_sport(sport_id)
            except ValidationError as e:
                return JsonResponse({"status": "error", "message": str(e)}, status=400)

            sport.in_charge = in_charge
            sport.save()

            sport_data = {
                "name": sport.label,
                "in_charge": sport.in_charge.get_full_name(),
            }

            resp_data = {
                "status": "success",
                "data": sport_data,
                "message": "In charge updated successfully",
            }
            return JsonResponse(resp_data)
        else:
            resp_data = {
                "status": "error",
                "message": "You are not authorized to perform this action",
            }
            return JsonResponse(resp_data, status=403)


class GetInChargeSportsView(generics.ListAPIView):
    serializer_class = SportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, in_charge_id):
        in_charge = User.objects.get(id=in_charge_id)
        return Sport.objects.filter(in_charge=in_charge)

    def list(self, request, *args, **kwargs):
        if request.user.groups.filter(name="staff").exists():
            in_charge_id = request.user.id

            queryset = self.get_queryset(in_charge_id=in_charge_id)
            serializer = self.get_serializer(queryset, many=True)
            sports_data = serializer.data

            return JsonResponse(
                {
                    "status": "success",
                    "data": sports_data,
                }
            )
        else:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "You are not authorized to perform this action",
                },
                status=403,
            )


class AddSportView(generics.CreateAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [IsAuthenticated]  # Or a custom permission

    def perform_create(self, serializer):
        in_charge_id = self.request.data.get("in_charge")
        in_charge_user = User.objects.get(id=in_charge_id)

        if in_charge_user.groups.filter(name="staff").exists():
            serializer.save(in_charge=in_charge_user)
        else:
            raise ValidationError("User is not a staff member")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
        except ValidationError as e:
            resp = {
                "status": "error",
                "message": e.message,
            }
            return JsonResponse(resp, status=400)

        resp = {
            "status": "success",
            "data": serializer.data,
            "message": "Sport added successfully",
        }
        return JsonResponse(resp, status=201)


class DeleteSportView(generics.DestroyAPIView):
    queryset = Sport.objects.all()
    permission_classes = [IsAuthenticated]  # Or a custom permission

    def destroy(self, request, *args, **kwargs):
        sport_id = self.request.data.get("sport_id")
        try:
            instance = Sport.objects.get(id=sport_id)
        except Sport.DoesNotExist:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Sport does not exist",
                },
                status=404,
            )

        # Additional check: Is the authenticated user the 'in_charge' of this sport?
        if not request.user.groups.filter(name="admin").exists():
            return JsonResponse(
                {
                    "status": "error",
                    "message": "You are not authorized to perform this action",
                },
                status=403,
            )

        self.perform_destroy(instance)
        resp = {
            "status": "success",
            "message": "Sport deleted successfully",
        }
        return JsonResponse(resp, status=204)


class UpdateSportImageView(generics.UpdateAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        sport_id = kwargs.get("pk")
        try:
            sport = Sport.objects.get(id=sport_id)
        except Sport.DoesNotExist:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Sport does not exist",
                },
                status=404,
            )

        if not request.user.groups.filter(name="admin").exists():
            return JsonResponse(
                {
                    "status": "error",
                    "message": "You are not authorized to perform this action",
                },
                status=403,
            )

        sport.image = request.FILES.get("image")
        sport.save()

        resp = {
            "status": "success",
            "message": "Sport image updated successfully",
            "data": {
                "image": f"{settings.BASE_API_URL}{sport.image.url}",
            },
        }
        return JsonResponse(resp)


class CreateSportPostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        sport_id = self.request.data.get("sport")
        sport = Sport.objects.get(id=sport_id)
        serializer.save(sport=sport)

    def create(self, request, *args, **kwargs):
        if request.user.groups.filter(name="staff").exists():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            try:
                self.perform_create(serializer)
            except ValidationError as e:
                resp = {
                    "status": "error",
                    "message": e.message,
                }
                return JsonResponse(resp, status=400)

            resp = {
                "status": "success",
                "data": serializer.data,
                "message": "Post added successfully",
            }
            return JsonResponse(resp, status=201)
        else:
            resp = {
                "status": "error",
                "message": "You are not authorized to perform this action",
            }
            return JsonResponse(resp, status=403)


class GetSportPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        sport_id = self.kwargs.get("pk")
        return Post.objects.filter(sport_id=sport_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        posts_data = serializer.data

        # Add sport name to each post's data
        for post in posts_data:
            sport_id = post.get("sport")
            if sport_id:
                try:
                    sport = Sport.objects.get(id=sport_id)
                    post["sport_name"] = sport.label
                except Sport.DoesNotExist:
                    post["sport_name"] = None
            else:
                post["sport_name"] = None

        return JsonResponse(
            {
                "status": "success",
                "data": posts_data,
            },
            safe=False,
        )


class UpdateSportPostView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        post_id = kwargs.get("pk")
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Post does not exist",
                },
                status=404,
            )

        if not request.user.groups.filter(name="staff").exists():
            return JsonResponse(
                {
                    "status": "error",
                    "message": "You are not authorized to perform this action",
                },
                status=403,
            )

        if "title" in request.data:
            post.title = request.data.get("title")
        if "description" in request.data:
            post.description = request.data.get("description")
        if "content" in request.data:
            post.content = request.data.get("content")
        if "image" in request.FILES:
            post.image = request.FILES.get("image")

        post.save()

        resp = {
            "status": "success",
            "message": "Post updated successfully",
            "data": {
                "title": post.title,
                "description": post.description,
                "content": post.content,
                "image": (
                    f"{settings.BASE_API_URL}{post.image.url}" if post.image else None
                ),
            },
        }
        return JsonResponse(resp)
