from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contact = models.CharField(max_length=10)
    profile_picture = models.TextField(null=True, blank=True)
    user_type = models.ForeignKey(UserType, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}'s Profile"
