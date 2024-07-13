from django.db import models
from django.contrib.auth.models import User
from PIL import Image
from django.core.files.base import ContentFile
from io import BytesIO


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
    contact = models.CharField(max_length=10, null=True, blank=True)
    profile_picture = models.ImageField(
        null=True, blank=True, upload_to="images/profile_images/"
    )
    user_type = models.ForeignKey(UserType, on_delete=models.CASCADE, default=4)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=250, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        # Check if the instance has a profile picture and it's a new file
        if self.profile_picture and not self.profile_picture._committed:
            # Open the image using PIL
            pil_image = Image.open(self.profile_picture)
            # Convert the image to webp
            pil_image = pil_image.convert("RGB")

            # Generate the new filename
            new_filename = f"{self.user.first_name}_{self.user.last_name}.webp".lower()
            # Save the image to a BytesIO object
            image_io = BytesIO()
            max_size = (500, 500)
            pil_image.thumbnail(max_size)
            pil_image.save(image_io, format="WEBP", quality=75)

            # Create a new Django file from the BytesIO object
            new_image = ContentFile(image_io.getvalue(), name=new_filename)

            # Assign the new image to profile_picture
            self.profile_picture = new_image

        super().save(*args, **kwargs)

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
