from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=50, unique=True)
    phone_number = models.CharField(max_length=10)
    faculty = models.CharField(max_length=100)
    sports_experiences = models.TextField(blank=True, null=True)
    achievements = models.JSONField(
        default=list
    )  # Store achievements as an array of strings

    def __str__(self):
        return self.name
