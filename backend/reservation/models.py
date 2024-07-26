from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Court(models.Model):
    label = models.CharField(max_length=50)

    def __str__(self):
        return self.label


class CourtRate(models.Model):
    court = models.ForeignKey(Court, on_delete=models.CASCADE)
    hourley_rate = models.FloatField()
    daily_rate = models.FloatField()

    def __str__(self):
        return self.court.label


class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    court = models.ForeignKey(Court, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    date = models.DateField()
    team_name = models.CharField(max_length=50)
    requirement = models.TextField()
    is_competitive = models.BooleanField(default=False)
    number_of_players = models.IntegerField()
    is_paid = models.BooleanField(default=False)
    is_canceled = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.court.label} - {self.start_time} - {self.end_time}"


class Payment(models.Model):
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    amount = models.FloatField()
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=50)
    payment_status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.reservation.user.username} - {self.reservation.court.label} - {self.reservation.start_time} - {self.reservation.end_time} - {self.amount}"
