from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from calendar_auth.views.index import BaseView


@method_decorator(csrf_protect, name='dispatch')
class LogoutView(BaseView):
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            logout(request)
            return JsonResponse({'message': 'Logged out'}, status=200)
        else:
            return JsonResponse({'error': 'Not logged in'}, status=400)
        
