from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Province(models.Model):
    label = models.CharField(max_length=50)

    def __str__(self):
        return self.label


class City(models.Model):
    label = models.CharField(max_length=50)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)

    def __str__(self):
        return self.label


class Faculty(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class UserType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    national_id = models.CharField(max_length=15, null=False, blank=False)
    contact = models.CharField(max_length=10)
    profile_picture = models.TextField(null=True, blank=True)
    user_type = models.ForeignKey(UserType, on_delete=models.CASCADE, default=4)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=250, null=True, blank=True)
    date_of_birth = models.DateField()

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}'s Profile"


class AcademicStaffUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    date_of_appointment = models.DateField()
    upf_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.user.first_name}'s Academic User Profile"


class PostgraduateUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pg_registration_number = models.CharField(max_length=15)
    pg_commencement_date = models.DateField(blank=True, null=True)
    pg_completion_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.first_name}'s Postgraduate User Profile"


class UniversityStudentUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    registration_number = models.CharField(max_length=15)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.first_name}'s University Student User Profile"
