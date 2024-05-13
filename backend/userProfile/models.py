from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contact = models.CharField(max_length=10)
    profile_picture = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.username
