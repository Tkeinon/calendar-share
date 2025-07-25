from django.urls import path
from calendar_auth.views import index, login
from django.views.generic import TemplateView

urlpatterns = [
    path('', index.index, name='index'),
    path('api/login/', login.LoginView.as_view(), name='login'),

    # Catch-all for React frontend
    path('', TemplateView.as_view(template_name='base.html'), name='react-app'),
]
