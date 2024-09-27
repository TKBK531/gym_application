from rest_framework import serializers
from .models import Court, CourtRate, Reservation, Payment


class CourtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Court
        fields = ["id", "label"]


class CourtRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourtRate
        fields = ["id", "court", "hourley_rate", "daily_rate"]

    def validate_court(self, value):
        courtHasRate = CourtRate.objects.filter(court=value).exists()
        if courtHasRate:
            raise serializers.ValidationError("Court rate already exists")
        return value


class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = [
            "id",
            "user",
            "court",
            "start_time",
            "end_time",
            "date",
            "team_name",
            "requirement",
            "is_competitive",
            "number_of_players",
            "is_paid",
            "is_canceled",
            "is_finished",
            "created_at",
            "updated_at",
        ]


class PaymentSerializer(serializers.ModelSerializer):
    reservation = ReservationSerializer()

    class Meta:
        model = Payment
        fields = [
            "id",
            "reservation",
            "amount",
            "payment_date",
            "payment_method",
            "payment_status",
            "created_at",
            "updated_at",
        ]
