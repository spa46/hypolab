# clusters/models.py

from django.db import models
import uuid

class HypoCluster(models.Model):
    id = models.CharField(max_length=8, unique=True, primary_key=True)
    location = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_registered = models.BooleanField(default=False)
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id