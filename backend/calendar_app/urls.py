from django.contrib.auth.decorators import login_required
from django.urls import path
from calendar_app.views import calendar, event

urlpatterns = [
    path('api/calendar/', login_required(calendar.CalendarView.as_view()), name='own-calendars'),
    path('api/event/', login_required(event.CreateEvent.as_view()), name='create-event')
]
