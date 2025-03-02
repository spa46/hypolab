# hypo/views.py

from rest_framework import generics
from .models import HypoCluster
from .serializers import HypoClusterSerializer

class AdminHypoClusterListView(generics.ListAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer