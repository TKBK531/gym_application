from rest_framework import serializers
from .models import Court, Facility, ReservationRequest, Reservation, Payment, CourtRate, ReservationDate, ReservationParticipant
from django.contrib.auth.models import User

class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ['facility_id', 'facility_name', 'status']


class CourtSerializer(serializers.ModelSerializer):
    facility = serializers.PrimaryKeyRelatedField(queryset=Facility.objects.all())

    class Meta:
        model = Court
        fields = ['court_id', 'court_name', 'num_of_courts', 'max_players', 'facility', 'status']


class CourtRateSerializer(serializers.ModelSerializer):
    court = CourtSerializer()

    class Meta:
        model = CourtRate
        fields=["court_rate_id", "court", "activity", "duration", 
                "is_competitive","is_foreign", "is_school", 
                "is_gov", "rate"]
    

class ReservationRequestSerializer(serializers.ModelSerializer):
    court = serializers.PrimaryKeyRelatedField(queryset=Court.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = ReservationRequest
        fields = [
            'res_req_id',  'email', 'rate_type',
            'court', 'num_of_courts', 'activity', 'user', 'requirement', 'is_school',
            'is_gov', 'is_foreign','is_competitive', 'org_name','is_pdn',
            'num_of_participants', 'admin_staff_id', 'status', 
            'is_payment_needed' ,'amount', 'applied_at'
        ]


class ReservationSerializer(serializers.ModelSerializer):
    court = serializers.PrimaryKeyRelatedField(queryset=Court.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Reservation
        fields = [
            'reservation_id', 'res_req', 'email', 'rate_type',
            'court', 'num_of_courts', 'activity', 'user', 'requirement', 'is_school',
            'is_gov', 'is_foreign','is_competitive', 'org_name','is_pdn', 
            'num_of_participants', 'is_payment_needed', 'amount', 'status', 
            'created_at', 'updated_at'
        ]


class ReservationDateSerializer(serializers.ModelSerializer):
    reservation_request = serializers.PrimaryKeyRelatedField(queryset=ReservationRequest.objects.all())
    reservation = serializers.PrimaryKeyRelatedField(queryset=Reservation.objects.all(), required=False, allow_null=True)

    class Meta:
        model = ReservationDate
        fields = [
            'id', 'reservation_request', 'reservation', 'date', 'start_time', 
            'end_time', 'duration_type'
        ]

class ReservationParticipantSerializer(serializers.ModelSerializer):
    reservation_request = serializers.PrimaryKeyRelatedField(queryset=ReservationRequest.objects.all())
    reservation = serializers.PrimaryKeyRelatedField(queryset=Reservation.objects.all(), required=False, allow_null=True)

    class Meta:
        model = ReservationParticipant
        fields = [
            'id', 'reservation_request', 'reservation', 'name', 'nic'
        ]        


class PaymentSerializer(serializers.ModelSerializer):
    reservation = serializers.PrimaryKeyRelatedField(queryset=Reservation.objects.all())

    class Meta:
        model = Payment
        fields = [
            'payment_id', 'reservation', 'amount', 'payment_date', 
            'payment_method', 'status', 'proof_of_payment', 
            'created_at', 'updated_at'
        ]


