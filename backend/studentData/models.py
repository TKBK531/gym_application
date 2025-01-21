from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=50, unique=True)
    phone_number = models.CharField(max_length=10)
    faculty = models.CharField(max_length=100)
    sports_experiences = models.TextField()
    achievements = models.JSONField()  # Store achievements as an array of strings

    def __str__(self):
        return self.name
