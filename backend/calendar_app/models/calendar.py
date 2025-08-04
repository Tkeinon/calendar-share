from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class Calendar(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now=True)
    edited_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True, 
        blank=True,
        related_name='edited_calendars'
    )

    class Meta:
        verbose_name = 'Calendar'
        verbose_name_plural = 'Calendars'

    def as_dict(self):
        return {
            'id': self.id,
            'owner': self.owner.username,
            'name': self.name,
            'share_perms': self.get_perms(),
        }
    
    def get_perms(self):
        """
        User gets automatically all permissions if they are the owner
        of the calendar.
        """
        return {
            'can_edit_events': True if self.owner else self.share_perms.can_edit_events,
            'can_remove_events': True if self.owner else self.share_perms.can_remove_events,
            'can_edit_calendar': True if self.owner else self.share_perms.can_edit_calendar,
            'can_invite_users': True if self.owner else self.share_perms.can_invite_users,
        }


class CalendarPerm(models.Model):
    """
    With model, it's possible to control what other users may do
    with the calendar
    """
    calendar = models.ForeignKey(
        Calendar,
        on_delete=models.CASCADE,
        related_name='share_perms'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='shared_calendars'
    )

    can_edit_events = models.BooleanField(default=False)
    can_remove_events = models.BooleanField(default=False)
    can_edit_calendar = models.BooleanField(default=False)
    can_invite_users = models.BooleanField(default=False)

    invited_at = models.DateTimeField(auto_now_add=True)
    invited_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='calendar_invites_sent'
    )

    edited_at = models.DateTimeField(auto_now=True)
    edited_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True, 
        blank=True,
        related_name='calendar_perms_edited'
    )

    class Meta:
        unique_together = ('calendar', 'user')  # Avoid giving multiple perms for same calendar
        verbose_name = 'Calendar share and permission'
        verbose_name_plural = 'Calendar shares and permissions'

    def __str__(self):
        return f'{self.user} permissions to {self.calendar}'
    