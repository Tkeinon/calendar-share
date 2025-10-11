from datetime import datetime, timezone
from django.http import JsonResponse

from calendar_app.models.calendar import Calendar
from calendar_app.models.event import CalendarEvent
from utils.base_view import BaseView


def convert_to_utc(date):
    dt = datetime.fromisoformat(date)
    dt = dt.astimezone(timezone.utc)

    return dt
    
class CreateEvent(BaseView):
    def post(self, request, *args, **kwargs):
        owner = request.user
        data = request.parsed_data
        calendar_id = data.get('calendar')
        title = data.get('title')
        description = data.get('description')
        location = data.get('location')
        color = data.get('color')
        start = data.get('start')
        end = data.get('end')

        if not calendar_id:
            return JsonResponse({'error': 'Missing calendar'}, status=400)
        
        if not title:
            return JsonResponse({'error': 'Missing title'}, status=400)
        

        if not start or not end:
            return JsonResponse({'error': 'Missing date'}, status=400)

        start_utc = convert_to_utc(start)
        end_utc = convert_to_utc(end)

        if start_utc > end_utc:
            return JsonResponse({'error': 'Start date preceeds edn date'}, status=400)

        try:
            calendar = Calendar.objects.get(id=calendar_id)
        except Calendar.DoesNotExist:
            return JsonResponse({'error': 'Calendar not found'}, status=400)
        
        ce = CalendarEvent.objects.create(
            created_by=request.user,
            calendar=calendar,
            title=title,
            description=description,
            location=location,
            color=color,
            start=start_utc,
            end=end_utc,
        )

        ce.save()

        return JsonResponse({'event': ce.as_dict()}, status=200)
        