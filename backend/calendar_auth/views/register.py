from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from calendar_auth.views.index import BaseView



@method_decorator(csrf_protect, name='dispatch')
class RegisterView(BaseView):
    def post(self, request, *args, **kwargs):
        data = request.parsed_data

        username = data.get('username')
        email = data.get('email') or None  # Avoid empty strings that will hit unique contstraits
        password1 = data.get('password1')
        password2 = data.get('password2')

        if not username or not password1 or not password2:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        if password1 != password2:
            return JsonResponse({'error': 'Passwords do not match'}, status=400)

        UserModel = get_user_model()

        if UserModel.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        
        if email and UserModel.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        try:
            validate_password(password1, user=UserModel(username=username, email=email))
        except ValidationError as e:
            return JsonResponse({'error': e.messages}, status=400)
        
        print('Email: ', email)
        UserModel.objects.create_user(
            username=username,
            email=email,
            password=password1
        )

        return JsonResponse({'message': 'Registration succesful'}, status=201)
    