# hypo/views.py
from rest_framework import generics
from .models import HypoCluster
from .serializers import HypoClusterSerializer

from django.db import models


class HypoCluster(models.Model):
    id = models.CharField(max_length=80, primary_key=True)
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id

class RegisterHypoClusterView(generics.CreateAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

class HypoClusterStatusView(generics.ListAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

class ControlHypoClusterView(generics.UpdateAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

class MonitorHypoClusterView(generics.RetrieveAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer