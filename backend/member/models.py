from django.db import models
from django.contrib.auth.models import User
from userProfile.models import UserProfile


class Members(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE
    )  # Enforces one member per user
    userProfile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    age = models.IntegerField()
    household = models.CharField(max_length=100)
    formType = models.CharField(max_length=100)  # <-
    membership = models.CharField(max_length=50)
    residence = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)


class PostgraduateMember(models.Model):
    members = models.ForeignKey(Members, on_delete=models.CASCADE)
    pg_name = models.CharField(max_length=100)
    stu_reg_no = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.members.user.username}'s Postgraduate Member Profile"


class AcademicStaffMember(models.Model):
    members = models.ForeignKey(Members, on_delete=models.CASCADE)
    designation = models.CharField(max_length=50)
    temporary = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.members.user.username}'s Academic Staff Member Profile"


class OutsidersMember(models.Model):
    members = models.ForeignKey(Members, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.members.user.username}'s Outsider Member Profile"


class Family(models.Model):
    members = models.ForeignKey(Members, on_delete=models.CASCADE)


class FamilyMembers(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    nic = models.CharField(max_length=20)
    relationship = models.CharField(max_length=20)
    age = models.IntegerField()

    def __str__(self):
        return f"{self.family.members.user.username} - {self.name}"
