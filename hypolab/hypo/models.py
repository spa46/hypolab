# hypo/views.py
from rest_framework import generics
from .models import HypoCluster
from .serializers import HypoClusterSerializer

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