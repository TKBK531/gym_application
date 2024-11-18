from django.db import models
from django.contrib.auth.models import User

from userProfile.models import UserProfile
from django.core.exceptions import ValidationError


# Create your models here.
class Sport(models.Model):
    label = models.CharField(max_length=100)
    image = models.ImageField(null=True, blank=True, upload_to="images/sport_images/")
    in_charge = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return self.label


class Post(models.Model):
    title = models.CharField(max_length=100)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    description = models.TextField()
    image = models.ImageField(upload_to="images/sport_posts/")
    content = models.TextField()

    def __str__(self):
        return self.title


class Team(models.Model):
    name = models.CharField(max_length=100)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/team_image/")
    captain = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

    def clean(self):
        if self.captain:
            user_profile = UserProfile.objects.get(user=self.captain)
            if user_profile.user_type.name != "student":
                raise ValidationError("The captain must be a student user.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class TeamMember(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} in {self.team.name}"

    def clean(self):
        user_profile = UserProfile.objects.get(user=self.user)
        if (
            user_profile.user_type.name != "student"
        ):  # Assuming 'Student' is the label for student user type
            raise ValidationError("Team members must be student users.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.get_full_name} is subscribed to {self.sport.label}"
