from django.db import models
from userProfile.models import  PostgraduateUser, AcademicStaffUser, UserProfile

# Create your models here.

class Outsiders(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    nic = models.CharField(max_length=20)
    dob = models.DateField()
    age = models.IntegerField()
    household = models.CharField(max_length=100)
    form_type = models.CharField(max_length=50)
    membership = models.CharField(max_length=50)
    mobile = models.CharField(max_length=20)
    residence = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    email = models.EmailField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def populate_userProfile(self):
        self.name = self.user.user
        self.nic = self.user.national_id
        self.dob = self.user.date_of_birth
        self.mobile = self.user.contact
        self.address = self.user.address 


class AcademicStaff(models.Model):
    user = models.ForeignKey(AcademicStaffUser, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    faculty = models.CharField(max_length=50)
    designation = models.CharField(max_length=50)
    appoinment = models.DateField()
    temporary = models.CharField(max_length=10)
    udf_no = models.CharField(max_length=15)
    household = models.CharField(max_length=100)
    form_type = models.CharField(max_length=50)
    membership = models.CharField(max_length=50)
    mobile = models.CharField(max_length=20)
    residence = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    email = models.EmailField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def populate_AcademicStaffUser(self):
        self.name = self.user.user
        self.faculty = self.user.faculty
        self.appoinment = self.user.date_of_appointment
        self.udf_no = self.user.upf_number


class PostgraduateUser(models.Model):
    user = models.ForeignKey(PostgraduateUser, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    nic = models.CharField(max_length=20)
    dob = models.DateField()
    age = models.IntegerField()
    form_type = models.CharField(max_length=50)
    membership = models.CharField(max_length=50)
    mobile = models.CharField(max_length=20)
    residence = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    email = models.EmailField()
    pg_name = models.CharField(max_length=100)
    pg_reg_no = models.CharField(max_length=50)
    stu_reg_no = models.CharField(max_length=50)
    pg_commencement = models.DateField()
    pg_completion = models.DateField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def populate_PostgraduateUser(self):
        self.name = self.user.user
        self.pg_name = self.user.pg_name
        self.pg_reg_no = self.user.pg_registration_number
        self.pg_commencement = self.user.pg_commencement_date
        self.pg_completion = self.user.pg_completion_date


    