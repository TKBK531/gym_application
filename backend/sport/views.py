from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics

from userProfile.models import UserProfile
from .models import Sport, Post, Team, TeamMember
from .serializers import (
    SportSerializer,
    PostSerializer,
    TeamSerializer,
    TeamMemberSerializer,
)
from django.http import JsonResponse
from rest_framework.exceptions import NotFound


# Create your views here.


# Get all sports
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


# Get specific sport details
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


# Update in charge of a sport
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


# Get all sports in charge by a user
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


# Add a sport
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


# Delete a sport
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


# Update sport image
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


# Create a sport post
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


# Get all posts for a sport
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


# Update a sport post
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


# Delete a sport post
class DeleteSportPostView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        post_id = kwargs.get("pk")
        try:
            instance = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Post does not exist",
                },
                status=404,
            )

        # Additional check: Is the authenticated user the 'author' of this post?
        if not request.user.groups.filter(name="staff").exists():
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
            "message": "Post deleted successfully",
        }
        return JsonResponse(resp, status=204)


# Get all sport posts
class GetAllSportPostsView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def list(self, request):
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


# Get specific sport post details
class CreateTeamView(generics.CreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        sport_id = self.request.data.get("sport")
        sport = Sport.objects.get(id=sport_id)
        captain_id = self.request.data.get("captain")
        team_name = self.request.data.get("name")

        if Team.objects.filter(name=team_name, sport=sport).exists():
            raise ValidationError(
                "A team with this name already exists for this sport."
            )

        if captain_id:
            try:
                captain_profile = UserProfile.objects.get(user_id=captain_id)
                if (
                    captain_profile.user_type.name != "student"
                ):  # Assuming 'Student' is the label for student user type
                    raise ValidationError("The captain must be a student user.")
            except UserProfile.DoesNotExist:
                raise ValidationError("Captain's user profile does not exist.")

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
                return JsonResponse(resp)
            except Sport.DoesNotExist:
                resp = {
                    "status": "error",
                    "message": "Sport does not exist.",
                }
                return JsonResponse(resp)
            except Exception as e:
                resp = {
                    "status": "error",
                    "message": str(e),
                }
                return JsonResponse(resp)

            resp = {
                "status": "success",
                "data": serializer.data,
                "message": "Team added successfully",
            }
            return JsonResponse(resp)
        else:
            resp = {
                "status": "error",
                "message": "You are not authorized to perform this action",
            }
            return JsonResponse(resp)


# Update a team
class UpdateTeamView(generics.UpdateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        team_id = kwargs.get("pk")
        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Team does not exist",
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

        if "name" in request.data:
            team.name = request.data.get("name")
        if "image" in request.FILES:
            team.image = request.FILES.get("image")
        if "captain" in request.data:
            captain_id = request.data.get("captain")
            if captain_id:
                try:
                    captain_profile = UserProfile.objects.get(user_id=captain_id)
                    if (
                        captain_profile.user_type.name != "student"
                    ):  # Assuming 'Student' is the label for student user type
                        raise ValidationError("The captain must be a student user.")
                except UserProfile.DoesNotExist:
                    raise ValidationError("Captain's user profile does not exist.")
            team.captain = captain_id

        team.save()

        resp = {
            "status": "success",
            "message": "Team updated successfully",
            "data": {
                "name": team.name,
                "image": (
                    f"{settings.BASE_API_URL}{team.image.url}" if team.image else None
                ),
                "captain": team.captain,
            },
        }
        return JsonResponse(resp)


# Delete a team
class DeleteTeamView(generics.DestroyAPIView):
    queryset = Team.objects.all()
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        team_id = kwargs.get("pk")
        try:
            instance = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Team does not exist",
                },
                status=404,
            )

        # Additional check: Is the authenticated user the 'captain' of this team?
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
            "message": "Team deleted successfully",
        }
        return JsonResponse(resp, status=204)


# Get all teams
class TeamListView(generics.ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        teams_data = serializer.data

        # Add captain_name to each team's data
        for team in teams_data:
            captain_id = team.get("captain")
            if captain_id:
                try:
                    captain_user = User.objects.get(id=captain_id)
                    team["captain_name"] = captain_user.get_full_name()
                except User.DoesNotExist:
                    team["captain_name"] = None
            else:
                team["captain_name"] = None

        return JsonResponse(
            {
                "status": "success",
                "data": teams_data,
            },
            safe=False,
        )


# Get specific team details
class SportTeamListView(generics.ListAPIView):
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        sport_id = self.kwargs.get("pk")
        return Team.objects.filter(sport_id=sport_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        teams_data = serializer.data

        # Add captain_name to each team's data
        for team in teams_data:
            captain_id = team.get("captain")
            if captain_id:
                try:
                    captain_user = User.objects.get(id=captain_id)
                    team["captain_name"] = captain_user.get_full_name()
                except User.DoesNotExist:
                    team["captain_name"] = None
            else:
                team["captain_name"] = None

        return JsonResponse(
            {
                "status": "success",
                "data": teams_data,
            },
            safe=False,
        )


# Add a team member
# class AddTeamMemberView(generics.CreateAPIView):

#     queryset = Team.objects.all()
#     serializer_class = TeamMemberSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         print("AddTeamMemberView")
#         team_id = self.request.data.get("team")
#         team = Team.objects.get(id=team_id)
#         user_id = self.request.data.get("user")

#         if TeamMember.objects.filter(team=team, user=user_id).exists():
#             raise ValidationError("User is already a member of this team.")

#         user_profile = UserProfile.objects.get(user_id=user_id)
#         if user_profile.user_type.name != "student":
#             raise ValidationError("Team members must be student users.")

#         serializer.save(team=team)

#     def create(self, request, *args, **kwargs):
#         if request.user.groups.filter(name="staff").exists():
#             serializer = self.get_serializer(data=request.data)
#             serializer.is_valid(raise_exception=True)
#             try:
#                 self.perform_create(serializer)
#             except ValidationError as e:
#                 resp = {
#                     "status": "error",
#                     "message": e.message,
#                 }
#                 return JsonResponse(resp)
#             except Team.DoesNotExist:
#                 resp = {
#                     "status": "error",
#                     "message": "Team does not exist.",
#                 }
#                 return JsonResponse(resp)
#             except UserProfile.DoesNotExist:
#                 resp = {
#                     "status": "error",
#                     "message": "User profile does not exist.",
#                 }
#                 return JsonResponse(resp)

#             resp = {
#                 "status": "success",
#                 "data": serializer.data,
#                 "message": "Team member added successfully",
#             }
#             return JsonResponse(resp)
#         else:
#             resp = {
#                 "status": "error",
#                 "message": "You are not authorized to perform this action",
#             }
#             return JsonResponse(resp)


class AddTeamMemberView(generics.CreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer, team, user_id):
        if TeamMember.objects.filter(team=team, user=user_id).exists():
            raise ValidationError(f"User {user_id} is already a member of this team.")

        user_profile = UserProfile.objects.get(user_id=user_id)
        if user_profile.user_type.name != "student":
            raise ValidationError(
                f"User {user_id} is not a student and cannot be added to the team."
            )

        serializer.save(team=team, user_id=user_id)

    def create(self, request, *args, **kwargs):
        if request.user.groups.filter(name="staff").exists():
            team_id = request.data.get("team")
            user_ids = request.data.get("users", [])

            try:
                team = Team.objects.get(id=team_id)
            except Team.DoesNotExist:
                return JsonResponse(
                    {
                        "status": "error",
                        "message": "Team does not exist.",
                    },
                    status=400,
                )

            responses = []
            for user_id in user_ids:
                serializer = self.get_serializer(
                    data={"team": team_id, "user": user_id}
                )
                serializer.is_valid(raise_exception=True)
                try:
                    self.perform_create(serializer, team, user_id)
                    responses.append(
                        {
                            "status": "success",
                            "user_id": user_id,
                            "message": "Team member added successfully",
                        }
                    )
                except ValidationError as e:
                    responses.append(
                        {
                            "status": "error",
                            "user_id": user_id,
                            "message": str(e),
                        }
                    )
                except UserProfile.DoesNotExist:
                    responses.append(
                        {
                            "status": "error",
                            "user_id": user_id,
                            "message": "User profile does not exist.",
                        }
                    )

            return JsonResponse(responses, safe=False)
        else:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "You are not authorized to perform this action",
                },
                status=403,
            )


# Remove Team members
class RemoveTeamMemberView(generics.DestroyAPIView):
    queryset = TeamMember.objects.all()
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        team_id = request.data.get("team")
        user_id = request.data.get("user")

        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "Team does not exist.",
                },
                status=400,
            )

        try:
            team_member = TeamMember.objects.get(team=team, user=user_id)
        except TeamMember.DoesNotExist:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "User is not a member of this team.",
                },
                status=400,
            )

        team_member.delete()

        return JsonResponse(
            {
                "status": "success",
                "message": "Team member removed successfully",
            },
            status=200,
        )


# Get all team members
class GetTeamMembersView(generics.ListAPIView):
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        team_id = self.kwargs.get("pk")
        if not team_id:
            raise NotFound("Team ID not provided.")
        return TeamMember.objects.filter(team_id=team_id)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            team_members_data = serializer.data

            # Add member_name and profile_picture to each team member's data
            for team_member in team_members_data:
                user_id = team_member.get("user")
                if user_id:
                    try:
                        user = User.objects.get(id=user_id)
                        user_profile = UserProfile.objects.get(user_id=user_id)
                        team_member["member_name"] = user.get_full_name()
                        team_member["profile_picture"] = (
                            user_profile.profile_picture.url
                            if user_profile.profile_picture
                            else None
                        )
                    except User.DoesNotExist:
                        team_member["member_name"] = None
                        team_member["profile_picture"] = None
                    except UserProfile.DoesNotExist:
                        team_member["member_name"] = user.get_full_name()
                        team_member["profile_picture"] = None
                else:
                    team_member["member_name"] = None
                    team_member["profile_picture"] = None

            return JsonResponse(
                {
                    "status": "success",
                    "data": team_members_data,
                },
                safe=False,
            )
        except NotFound as e:
            return JsonResponse(
                {
                    "status": "error",
                    "message": str(e),
                },
                status=404,
            )
        except Exception as e:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "An unexpected error occurred.",
                    "details": str(e),
                },
                status=500,
            )
