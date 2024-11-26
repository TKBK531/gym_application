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
    court_name = models.CharField(max_length=255)  # E.g., Netball Court
    num_of_courts= models.PositiveIntegerField(default=1)
    max_players=models.PositiveIntegerField(null=True)
    facility = models.ForeignKey('Facility', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.court_name} ({self.facility.facility_name})"
    

class CourtRate(models.Model):
    # Activity options specific to the court
    ACTIVITY_CHOICES = [
        ("none", "None"),
        ("meeting", "Meeting"),
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
    is_competitive = models.BooleanField(default=False)  # True if the event is competitive
    is_foreign = models.BooleanField(default=False)  # True if it is reserved by foreigner
    is_school = models.BooleanField(default=False)  # True if by a school
    is_gov = models.BooleanField(default=False)  # True if by a gov org
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

    res_req_id  = models.AutoField(primary_key=True)
    date = models.DateField()
    email = models.EmailField(max_length=255)
    start_time = models.TimeField()
    end_time = models.TimeField()

    court = models.ForeignKey(Court, on_delete=models.CASCADE)
    num_of_courts=models.PositiveIntegerField(default=1, null=True)
    activity = models.CharField(max_length=255, default="none")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    requirement = models.TextField()  # Stores additional information about the requirement
    is_school = models.BooleanField(default=False)  # True if reserved for a school
    is_gov = models.BooleanField(default=False)  # True if reserved for a gov org
    is_foreign = models.BooleanField(default=False)  # True if it is reserved by foreigner
    is_competitive = models.BooleanField(default=False)  # True if the event is competitive
    org_name = models.CharField(max_length=255)  # Team or Organization name
    is_pdn = models.BooleanField(default=False)
    num_of_participants = models.PositiveIntegerField()  # Number of participants
    admin_staff_id=models.CharField(max_length=255, null=True) #the admin staff who approved the request
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    is_payment_needed = models.BooleanField(default=True)  # True if payment is required for the reservation
    amount = models.FloatField()
    applied_at = models.DateTimeField(auto_now_add=True)  # Auto-set when the record is created

    def approve(self):
        # Create a Reservation when approved
        if self.status != 'approved':
            self.status = 'approved'
            self.save()
            Reservation.objects.create(
                date=self.date,
                email=self.email,
                start_time=self.start_time,
                end_time=self.end_time,
                court=self.court,
                num_of_courts=self.num_of_courts,
                activity=self.activty,
                res_req=self,
                user=self.user,
                requirement=self.requirement,
                is_school=self.is_school,
                is_gov=self.is_gov,
                is_foreign= self.is_foreign,
                is_competitive=self.is_competitive,
                org_name=self.org_name,
                is_pdn=self.is_pdn,
                num_of_participants=self.num_of_participants,
                amount=self.amount,
            )

    def __str__(self):
        return f"{self.user.first_name} -on {self.date}  {self.start_time} to {self.end_time}"

class Reservation(models.Model):
    STATUS_CHOICES = [
        ('approved', 'Approved'),
        ('confirmed', 'Confirmed'), #if payment is confirmed for outsiders/ defaut for pdn undergrads
        ('cancelled', 'Cancelled'),
        ('rejected', 'Rejected')
    ]
    reservation_id = models.AutoField(primary_key=True)
    res_req = models.OneToOneField(ReservationRequest, on_delete=models.SET_NULL, related_name='reservation', null=True)
    date = models.DateField()
    email = models.EmailField(max_length=255)
    start_time = models.TimeField()
    end_time = models.TimeField()
    court = models.ForeignKey(Court, on_delete=models.CASCADE)
    num_of_courts=models.PositiveIntegerField()
    activity = models.CharField(max_length=255, default="none")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    requirement = models.TextField()
    is_school = models.BooleanField(default=False)  # True if reserved for a school
    is_gov = models.BooleanField(default=False)  # True if reserved for a gov org
    is_foreign = models.BooleanField(default=False)  # True if it is reserved by foreigner
    is_competitive = models.BooleanField(default=False) 
    org_name = models.CharField(max_length=255)
    is_pdn = models.BooleanField(default=False)
    num_of_participants = models.PositiveIntegerField()
    is_payment_needed = models.BooleanField(default=True)  # True if payment is required for the reservation
    amount = models.FloatField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='approved')
    created_at = models.DateTimeField(auto_now_add=True)  # Auto-set when the record is created
    updated_at = models.DateTimeField(auto_now=True)  # Auto-set when the record is updated

    def __str__(self):
        return f"{self.user.first_name} -on {self.date} from {self.start_time} to {self.end_time} at {self.court.court_name}"


class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ]

    payment_id = models.AutoField(primary_key=True)
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, related_name="payments")
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


