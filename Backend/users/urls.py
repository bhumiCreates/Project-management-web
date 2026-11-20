from django.urls import path
from .views import get_current_user

urlpatterns = [
    path("users/me", get_current_user, name="get_users"),
]