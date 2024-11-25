from datetime import timezone
from rest_framework import serializers

from sport.models import Sport
from .models import Event, SportEvent, MusicalShowEvent, OtherFunctionEvent


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class SportEventSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = SportEvent
        fields = "__all__"

    def create(self, validated_data):
        event_data = validated_data.pop("event")
        sport_id = validated_data.pop("sport").id

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
        event = Event.objects.create(**event_data)
        other_function_event = OtherFunctionEvent.objects.create(
            event=event, **validated_data
        )
        return other_function_event
