from django.utils import timezone
from rest_framework import serializers
from sport.models import Sport
from .models import Event, SportEvent, MusicalShowEvent, OtherFunctionEvent


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError(
                "Event name must be at least 3 characters long."
            )
        return value

    def validate(self, data):
        if data["date"] < timezone.now().date():
            raise serializers.ValidationError("The event date cannot be in the past.")

        # Check for uniqueness of date and place
        if Event.objects.filter(date=data["date"], place=data["place"]).exists():
            raise serializers.ValidationError(
                "An event with the same date and place already exists."
            )

        return data


class SportEventSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = SportEvent
        fields = "__all__"

    def create(self, validated_data):
        event_data = validated_data.pop("event")
        sport_id = validated_data.pop("sport").id

        # Check for uniqueness of date and place
        if Event.objects.filter(
            date=event_data["date"], place=event_data["place"]
        ).exists():
            raise serializers.ValidationError(
                "An event with the same date and place already exists."
            )

        event = Event.objects.create(**event_data)
        sport = Sport.objects.get(id=sport_id)

        sport_event = SportEvent.objects.create(event=event, sport=sport)
        return sport_event


class MusicalShowEventSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = MusicalShowEvent
        fields = "__all__"

    def create(self, validated_data):
        event_data = validated_data.pop("event")

        # Check for uniqueness of date and place
        if Event.objects.filter(
            date=event_data["date"], place=event_data["place"]
        ).exists():
            raise serializers.ValidationError(
                "An event with the same date and place already exists."
            )

        event = Event.objects.create(**event_data)
        musical_show_event = MusicalShowEvent.objects.create(
            event=event, **validated_data
        )
        return musical_show_event


class OtherFunctionEventSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = OtherFunctionEvent
        fields = "__all__"

    def create(self, validated_data):
        event_data = validated_data.pop("event")

        # Check for uniqueness of date and place
        if Event.objects.filter(
            date=event_data["date"], place=event_data["place"]
        ).exists():
            raise serializers.ValidationError(
                "An event with the same date and place already exists."
            )

        event = Event.objects.create(**event_data)
        other_function_event = OtherFunctionEvent.objects.create(
            event=event, **validated_data
        )
        return other_function_event


class CombinedEventSerializer(serializers.Serializer):
    event = EventSerializer()
    sport_event = SportEventSerializer(many=True, read_only=True)
    musical_show_event = MusicalShowEventSerializer(many=True, read_only=True)
    other_function_event = OtherFunctionEventSerializer(many=True, read_only=True)
