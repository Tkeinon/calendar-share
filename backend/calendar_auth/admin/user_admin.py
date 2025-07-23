from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from calendar_auth.models.user_model import CalendarUser


class CalendarUserAdmin(UserAdmin):
    pass


admin.site.register(CalendarUser, CalendarUserAdmin)
