from django.db import models
from django.contrib.auth.models import User

class Facility(models.Model):
    facility_id = models.AutoField(primary_key=True)
    facility_name=models.CharField(max_length=255)
    status=models.CharField(max_length=255, default="Active")

    def __str__(self):
        return self.facility_name

class Court(models.Model):
    court_id = models.AutoField(primary_key=True)
    court_name = models.CharField(max_length=255)
    num_of_courts= models.PositiveIntegerField(default=1)
    max_players=models.PositiveIntegerField(null=True)
    facility = models.ForeignKey('Facility', on_delete=models.CASCADE)
    status = models.CharField(max_length=10, default='open')


    def __str__(self):
        return f"{self.court_name} ({self.facility.facility_name})"
    

class CourtRate(models.Model):
    ACTIVITY_CHOICES = [
        ("none", "None"),
        ("meting", "Meting"),
        ("turf", "Turf"),
        ("match", "Match"),
        ("tournament", "Tournament"),
        ("athletic_meet_hurdles", "Athletic Meet with Hurdles"),
        ("athletic_meet_no_hurdles", "Athletic Meet without Hurdles"),
        ("team_practice", "Team Practice"),
        ("practice", "Practice"),
        ("day_workout", "Day Workout"),
        ("squad_practices", "Squad Practices"),
        ("university_team_practices", "University Team Practices"),
        ("competition", "Competition"),
        ("other", "Other"),
        ("any","Any"),
    ]
    DURATION_CHOICES = [
        ("per full day", "Per Full Day"),
        ("per half day", "Per Half Day"),
        ("per hour", "Per Hour")
        ]

    court_rate_id = models.AutoField(primary_key=True)
    court = models.ForeignKey(Court, on_delete=models.CASCADE)
    activity = models.CharField(max_length=255, choices=ACTIVITY_CHOICES,default="none")
    duration = models.CharField(max_length=255, choices=DURATION_CHOICES,default="per hour")
    is_competitive = models.BooleanField(default=False)
    is_foreign = models.BooleanField(default=False) 
    is_school = models.BooleanField(default=False)
    is_gov = models.BooleanField(default=False)
    rate = models.FloatField()

    def __str__(self):
        return f"{self.court.court_name} ({self.rate})"
    
    
class ReservationRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled')
    ]
    RATE_TYPE_CHOICES = [
        ('hourly_rate', 'Hourly Rate'),
        ('day_rate', 'Day Rate')
    ]

    res_req_id  = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255)
    court = models.ForeignKey(Court, on_delete=models.CASCADE)
    num_of_courts=models.PositiveIntegerField(default=1, null=True)
    activity = models.CharField(max_length=255, default="none")
    rate_type = models.CharField(max_length=20, choices=RATE_TYPE_CHOICES, default='hourly')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    requirement = models.TextField()  
    is_school = models.BooleanField(default=False)  
    is_gov = models.BooleanField(default=False)  
    is_foreign = models.BooleanField(default=False)  
    is_competitive = models.BooleanField(default=False)  
    org_name = models.CharField(max_length=255)  
    is_pdn = models.BooleanField(default=False)
    num_of_participants = models.PositiveIntegerField()  
    admin_staff_id=models.CharField(max_length=255, null=True) #the admin staff who approved the request
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    is_payment_needed = models.BooleanField(default=True)  # True if payment is required for the reservation
    amount = models.FloatField()
    applied_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f"{self.user.first_name} "


class Reservation(models.Model):
    STATUS_CHOICES = [
        ('approved', 'Approved'),
        ('confirmed', 'Confirmed'), #if payment is confirmed for outsiders/ default for pdn undergrads
        ('cancelled', 'Cancelled'),
        ('rejected', 'Rejected')
    ]

    RATE_TYPE_CHOICES = [
        ('hourly_rate', 'Hourly Rate'),
        ('day_rate', 'Day Rate')
    ]
    reservation_id = models.AutoField(primary_key=True)
    res_req = models.OneToOneField(ReservationRequest, on_delete=models.SET_NULL, related_name='reservation', null=True)
    email = models.EmailField(max_length=255)
    court = models.ForeignKey(Court, on_delete=models.CASCADE)
    num_of_courts=models.PositiveIntegerField()
    activity = models.CharField(max_length=255, default="none")
    rate_type = models.CharField(max_length=20, choices=RATE_TYPE_CHOICES, default='hourly')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    requirement = models.TextField()
    is_school = models.BooleanField(default=False) 
    is_gov = models.BooleanField(default=False)  
    is_foreign = models.BooleanField(default=False)  
    is_competitive = models.BooleanField(default=False) 
    org_name = models.CharField(max_length=255)
    is_pdn = models.BooleanField(default=False)
    num_of_participants = models.PositiveIntegerField()
    is_payment_needed = models.BooleanField(default=True)  # True if payment is required for the reservation
    amount = models.FloatField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='approved')
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)  

    def __str__(self):
        return f"{self.user.first_name}"


class ReservationDate(models.Model):
    reservation_request = models.ForeignKey(ReservationRequest, on_delete=models.CASCADE, related_name='dates')
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, related_name='reservation_dates', null=True)
    date = models.DateField()
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    duration_type = models.CharField(max_length=10, choices=[('full_day', 'Full Day'), ('half_day', 'Half Day')], null=True, blank=True)

    def __str__(self):
        return f"{self.date} ({self.start_time} to {self.end_time})"
    
class ReservationParticipant(models.Model):
    reservation_request = models.ForeignKey(ReservationRequest, on_delete=models.CASCADE, related_name='participants')
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, related_name='reservation_participants', null=True)
    name=models.CharField(max_length=255)
    nic=models.CharField(max_length=12, default="none")

    def __str__(self):
        return f"({self.name})"    


class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ]

    payment_id = models.AutoField(primary_key=True)
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, related_name="payments_reservation")
    amount = models.FloatField()
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')  # Payment status
    proof_of_payment = models.FileField(upload_to='payment_proofs/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def approve_payment(self):
        if self.status == 'pending':  # Only process if payment is pending
            self.status = 'approved'
            self.save()

            # Update the reservation status
            reservation = self.reservation
            reservation.status = 'confirmed'
            reservation.save()

    def reject_payment(self):
        if self.status == 'pending':  # Only process if payment is pending
            self.status = 'rejected'
            self.save()

    def __str__(self):
        return f"{self.reservation.user.first_name} - {self.reservation.court.court_name} - {self.amount}"
