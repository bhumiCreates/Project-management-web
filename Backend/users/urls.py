from django.urls import path
from . import views
from .views import get_current_user, register_user

urlpatterns = [
    path("users/me", get_current_user, name="get_users"),
    path('register/', register_user, name='register'),
    path('logout/', views.logout, name='logout'),
]