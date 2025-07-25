from django.urls import path
from calendar_auth.views import index, login, logout, register
from django.views.generic import TemplateView

urlpatterns = [
    path('', index.index, name='index'),
    path('api/login/', login.LoginView.as_view(), name='login'),
    path('api/logout/', logout.LogoutView.as_view(), name='logout'), 
    path('api/register/', register.RegisterView.as_view(), name='register'),

    # Catch-all for React frontend
    path('', TemplateView.as_view(template_name='base.html'), name='react-app'),
]
