from django.contrib.auth.models import AbstractUser
from django.db import models


class CalendarUser(AbstractUser):
    email = models.EmailField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.email:
            self.email = self.email.lower()  # Enforce uniqueness in emails
        
        super().save(*args, **kwargs)
