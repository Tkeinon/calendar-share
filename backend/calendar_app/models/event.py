from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class CalendarEvent(models.Model):
    calendar = models.ForeignKey(
        'Calendar',
        on_delete=models.CASCADE,
        related_name='events'
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)

    # Determine event's background color. 7 = hashtag + 6 characters
    color = models.CharField(max_length=7, blank=True)

    start = models.DateTimeField()
    end = models.DateTimeField()

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='events_created'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    edited_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='events_modified'
    )
    edited_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['start']
        verbose_name = 'Calendar Event'
        verbose_name_plural = 'Calendar Events'

    def __str__(self):
        return f'{self.title} ({self.start:%Y-%m-%d %H:%M})'
    
    def as_dict(self):
        return {
           'calendar': self.calendar.id,
           'title': self.title,
           'description': self.description,
           'location': self.location,
           'color': self.color,
           'start': self.start.isoformat(),
           'end': self.end.isoformat()
        }