from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import users

@api_view(['GET'])
def get_users(request):
    all_users = users.objects.all()
    return Response(list(all_users.values()))