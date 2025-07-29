import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views import View


def index(request):
    return render(request, 'base.html')


class BaseView(View):
    def dispatch(self, request, *args, **kwargs):
        if request.method in ('POST', 'PUT', 'PATCH'):
            try:
                request.parsed_data = json.loads(request.body)
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid data'}, status=400)
        else:
            request.parsed_data = {}
        
        return super().dispatch(request, *args, **kwargs)
