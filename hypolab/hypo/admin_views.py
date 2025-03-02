# hypo/views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import HypoCluster
from .serializers import HypoClusterSerializer


class AdminHypoClusterListView(generics.ListAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer


class InitClusterView(APIView):
    def post(self, request, *args, **kwargs):
        uuid = request.data.get('uuid')
        if not uuid:
            return Response({"error": "UUID is required"}, status=status.HTTP_400_BAD_REQUEST)

        if HypoCluster.objects.filter(id=uuid).exists():
            return Response({"error": "UUID already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new HypoCluster instance with the provided UUID
        HypoCluster.objects.create(id=uuid)
        print('New cluster Joined ...', uuid)

        return Response({"message": "Cluster initialized successfully"}, status=status.HTTP_200_OK)



