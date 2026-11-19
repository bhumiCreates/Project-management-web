from django.db import models

class Role(models.TextChoices):
    Admin="Admin","Admin"
    Guest="Guest","Guest"
    Manager="Manager","Manager"
    User="User","User"
    
class Team(models.Model):
    teamId= models.CharField(unique=True)
    name= models.CharField(max_length=50,unique=True)
    description = models.CharField(null=True, blank=True, max_length=200)
    code=models.CharField(max_length=10)
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at=models.DateField(auto_now=True)
    
    class Meta:  
        db_table = "Team"
    

class users(models.Model):  #Django already creates an id field
    user_id = models.UUIDField(primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=50,unique=True)
    role = models.CharField(choices=Role.choices, default=Role.User)
    team = models.ForeignKey(
    Team,
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name="members"
    )
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateField(auto_now=True)
    
    class Meta:
        indexes=[
            models.Index(fields=["team","role","email"])
        ]
        
        db_table = "users"




    def __str__(self):
        return self.name