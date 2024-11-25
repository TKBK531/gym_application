from django.db import models
from sport.models import Sport


class Event(models.Model):
    EVENT_STATUS_CHOICES = [
        ("upcoming", "Upcoming"),
        ("scheduled", "Scheduled"),
        ("postponed", "Postponed"),
        ("cancelled", "Cancelled"),
    ]

    PLACE_CHOICES = [
        ("gymnasium", "Gymnasium"),
        ("ground", "Ground"),
        ("pool", "Pool"),
    ]

    name = models.CharField(max_length=255)
    place = models.CharField(max_length=255, choices=PLACE_CHOICES)
    time = models.TimeField()
    date = models.DateField()
    status = models.CharField(max_length=20, choices=EVENT_STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class SportEvent(models.Model):
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name="sport_event"
    )
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.event.name} - {self.sport.label}"


class MusicalShowEvent(models.Model):
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name="musical_show_event"
    )

    def __str__(self):
        return f"{self.event.name}"


class OtherFunctionEvent(models.Model):
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name="other_function_event"
    )

    def __str__(self):
        return f"{self.event.name}"
