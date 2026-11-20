import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


# User roles
class Role(models.TextChoices):
    ADMIN = "Admin", "Admin"
    USER = "User", "User"
    MANAGER = "Manager", "Manager"
    GUEST = "Guest", "Guest"


# Custom User Manager
class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("role", Role.ADMIN)

        return self.create_user(email, password, **extra_fields)


# Team Model
class Team(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    name = models.CharField(max_length=50)

    description = models.CharField(
        max_length=200,
        null=True,
        blank=True
    )

    code = models.CharField(
        max_length=10,
        unique=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# Custom User Model
class User(AbstractUser):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    username = None

    name = models.CharField(max_length=100)

    email = models.EmailField(unique=True)

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.USER
    )

    team = models.ForeignKey(
        Team,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="members"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    class Meta:
        db_table = "users"