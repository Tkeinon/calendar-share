from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from calendar_auth.views.index import BaseView


@method_decorator(csrf_protect, name='dispatch')
class LoginView(BaseView):
    def post(self, request, *args, **kwargs):
        auth_field = request.parsed_data.get('username')
        password = request.parsed_data.get('password')

        if not auth_field or not password:
            return JsonResponse({'error': 'Missing credentials'}, status=400)

        user = authenticate(request, username=auth_field, password=password)

        if user:
            login(request, user)

            return JsonResponse({
                'message': 'Logged in',
                'user': user.as_dict(),
                }, status=200)
        
        else:
            return JsonResponse({'error': 'Missing credentials'}, status=401)
        

class UserInfoView(BaseView):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return JsonResponse({'user': request.user.as_dict()})
        
        return JsonResponse({'user': {}})