from django.db.models import Q
from django.http import JsonResponse

from calendar_app.models import Calendar
from utils.base_view import BaseView


class CalendarView(BaseView):
    def get(self, request, *args, **kwargs):
        """
        Return all user calendars
        """
        self.user = request.user
        calendars = Calendar.objects.filter(
            Q(owner=self.user) | Q(share_perms__user=self.user)
        ).prefetch_related(
            'share_perms'
        )

        if not calendars:
            return JsonResponse({'calendars': []})

        calendars = [calendar.as_dict() for calendar in calendars]

        return JsonResponse({'calendars': calendars})
        
    def post(self, request, *args, **kwargs):
        """
        Make a new calendar
        """
        owner = request.user
        data = request.parsed_data
        name = data['name']

        Calendar.objects.create(
            owner=owner,
            name=name,
            edited_by=owner
        )

        calendars = Calendar.objects.filter(owner=owner)
        calendars = [calendar.as_dict() for calendar in calendars]

        return JsonResponse({
            'calendars': calendars,
            'success': 'ok'
        })
    