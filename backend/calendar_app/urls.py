from django.contrib.auth.decorators import login_required
from django.urls import path
from calendar_app.views import calendar

urlpatterns = [
    path('api/calendar/', login_required(calendar.CalendarView.as_view()), name='own-calendars'),
]
