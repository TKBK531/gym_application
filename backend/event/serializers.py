from datetime import timezone
from rest_framework import serializers
from .models import Event, SportEvent, MusicalShowEvent, OtherFunctionEvent


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

    def validate(self, data):
        if data["date"] < timezone.now().date():
            raise serializers.ValidationError("The event date cannot be in the past.")
        return data


class SportEventSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = SportEvent
        fields = "__all__"


class MusicalShowEventSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = MusicalShowEvent
        fields = "__all__"


class OtherFunctionEventSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = OtherFunctionEvent
        fields = "__all__"
