from django.urls import path
from calendar_auth.views import views
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.index, name='index'),
    
    # Catch-all for React frontend
    path('', TemplateView.as_view(template_name='base.html'), name='react-app'),
]
