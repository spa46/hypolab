# clusters/admin_views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import HypoCluster
from .serializers import HypoClusterSerializer
from .kafka_utils import get_kafka_producer, send_message


class AdminHypoClusterListView(generics.ListAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer


class InitClusterView(APIView):
    def post(self, request, *args, **kwargs):
        uuid = request.data.get('uuid')
        if not uuid:
            return Response({"error": "UUID is required"}, status=status.HTTP_400_BAD_REQUEST)

        if HypoCluster.objects.filter(id=uuid).exists():
            return Response({"message": "Cluster already initialized"}, status=status.HTTP_200_OK)

        # Create a new HypoCluster instance with the provided UUID
        HypoCluster.objects.create(id=uuid)
        print('New cluster Joined ...', uuid)

        return Response({"message": "Cluster initialized successfully"}, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        uuid = request.data.get('uuid')
        if not uuid:
            return Response({"error": "UUID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cluster = HypoCluster.objects.get(id=uuid)
            cluster.is_registered = True
            cluster.save()

            # Send Kafka registration message
            producer = get_kafka_producer()
            send_message(producer, uuid, 'Cluster registered successfully')

            return Response({"message": "Cluster updated successfully"}, status=status.HTTP_200_OK)
        except HypoCluster.DoesNotExist:
            return Response({"error": "Cluster not found"}, status=status.HTTP_404_NOT_FOUND)