from django.db import models

# Create your models here.

class EventCategory(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField(max_length=500)

    def __str__(self):
        return self.name

class Event(models.Model):
    category = models.ForeignKey(EventCategory, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()

    def __str__(self):
        return self.name
