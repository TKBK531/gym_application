# # from django.db import models

# # # Create your models here.

# # class EventCategory(models.Model):
# #     name = models.CharField(max_length=255)
# #     description = models.TextField()
# #     image = models.URLField(max_length=500)

# #     def __str__(self):
# #         return self.name

# # class Event(models.Model):
# #     category = models.ForeignKey(EventCategory, on_delete=models.CASCADE, related_name='events')
# #     name = models.CharField(max_length=255)
# #     description = models.TextField()
# #     date = models.DateField()

# #     def __str__(self):
# #         return self.name

# # from django.db import models

# # class EventCategory(models.Model):
# #     name = models.CharField(max_length=255)
# #     description = models.TextField()
# #     image = models.URLField(max_length=500)

# #     def __str__(self):
# #         return self.name

# # class Event(models.Model):
# #     category = models.ForeignKey(
# #         EventCategory, on_delete=models.CASCADE, related_name='events'
# #     )
# #     name = models.CharField(max_length=255)
# #     description = models.TextField()
# #     date = models.DateField()

# #     def __str__(self):
# #         return self.name

# # events/models.py
# from django.db import models

# class EventCategory(models.Model):
#     CATEGORY_CHOICES = [
#         ('sport', 'Sport Event'),
#         ('musical', 'Musical Show'),
#         ('function', 'Other Function'),
#     ]
#     name = models.CharField(max_length=20, choices=CATEGORY_CHOICES, unique=True)

#     def __str__(self):
#         return self.get_name_display()

# class Event(models.Model):
#     STATUS_CHOICES = [
#         ('upcoming', 'Upcoming'),
#         ('ongoing', 'Ongoing'),
#         ('completed', 'Completed'),
#     ]
    
#     category = models.ForeignKey(EventCategory, on_delete=models.CASCADE)
#     place = models.CharField(max_length=255)
#     time = models.TimeField()
#     date = models.DateField()
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES)

#     def __str__(self):
#         return f"{self.category} Event at {self.place} on {self.date}"

# class SportEvent(Event):
#     sport = models.CharField(max_length=100)

#     def __str__(self):
#         return f"Sport Event: {self.sport} at {self.place}"

# class MusicalShowEvent(Event):
#     musical_show = models.CharField(max_length=100)

#     def __str__(self):
#         return f"Musical Show: {self.musical_show} at {self.place}"

# class OtherFunctionEvent(Event):
#     function_name = models.CharField(max_length=100)

#     def __str__(self):
#         return f"Function: {self.function_name} at {self.place}"

# models.py
from django.db import models


class Event(models.Model):
    EVENT_STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('postponed', 'Postponed'),
        ('cancelled', 'Cancelled'),
    ]

    name = models.CharField(max_length=255)
    place = models.CharField(max_length=255)
    time = models.TimeField()
    date = models.DateField()
    status = models.CharField(max_length=20, choices=EVENT_STATUS_CHOICES)

    def __str__(self):
        return self.name


class SportEvent(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='sport_event')
    sport_type = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.event.name} - {self.sport_type}"


class MusicalShowEvent(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='musical_show_event')
    genre = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.event.name} - {self.genre}"


class OtherFunctionEvent(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='other_function_event')
    function_type = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.event.name} - {self.function_type}"


class EventCategory(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
