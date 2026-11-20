from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.db import transaction

from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import Team, Role

from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


User = get_user_model()


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def register_user(request):

    try:
        # Get request data
        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")
        team_code = request.data.get("team_code")

        # Validate required fields
        if not name or not email or not password:
            return Response(
                {"error": "Name, email and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check existing user
        if User.objects.filter(email__iexact=email).exists():
            return Response(
                {"error": "User already exists"},
                status=status.HTTP_409_CONFLICT
            )

        # Find team
        team = None

        if team_code:
            team = Team.objects.filter(code=team_code).first()

            if not team:
                return Response(
                    {"error": "Please enter a valid team code"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # First user becomes Admin
        user_count = User.objects.count()

        role = Role.ADMIN if user_count == 0 else Role.USER

        # Create user
        user = User.objects.create_user(
            email=email,
            password=password,
            name=name,
            role=role,
            team=team
        )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        access_token = str(refresh.access_token)

        refresh_token = str(refresh)

        # Response
        return Response(
            {
                "user": {
                    "id": str(user.id),
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                    "teamId": str(user.team_id) if user.team else None,
                    "team": {
                        "id": str(team.id),
                        "name": team.name,
                        "code": team.code
                    } if team else None
                },
                "tokens": {
                    "access": access_token,
                    "refresh": refresh_token
                }
            },
            status=status.HTTP_201_CREATED
        )

    except Exception as error:
        print("Registration failed:", error)

        return Response(
            {"error": "Internal server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )