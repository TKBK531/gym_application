from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Sport(models.Model):
    label = models.CharField(max_length=100)
    image = models.ImageField(null=True, blank=True, upload_to="images/")
    in_charge = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return self.label


class Post(models.Model):
    title = models.CharField(max_length=100)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    description = models.TextField()
    image = models.ImageField(upload_to="images/")
    content = models.TextField()

    def __str__(self):
        return self.title


class Team(models.Model):
    name = models.CharField(max_length=100)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/")
    captain = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class TeamMember(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} in {self.team.name}"


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.get_full_name} is subscribed to {self.sport.label}"
