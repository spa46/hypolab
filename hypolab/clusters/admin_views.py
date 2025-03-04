# clusters/admin_views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import HypoCluster
from .serializers import HypoClusterSerializer
from .kafka_utils import get_kafka_producer, send_message, create_kafka_topic
from .utils import generate_hashed_id


class AdminHypoClusterListView(generics.ListAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer


# 생성된 ID 저장 (실제 환경에서는 DB 또는 캐시에 저장 가능)
generated_ids = set()




class InitClusterView(APIView):
    def post(self, request, *args, **kwargs):
        _id = generate_hashed_id()

        # Create a new HypoCluster instance with the provided UUID
        HypoCluster.objects.create(id=_id)
        print('New cluster Joined ...', id)

        return Response({"message": "Cluster initialized successfully"}, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):

        uuid = request.data.get('uuid')

        if not uuid:
            return Response({"error": "UUID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cluster = HypoCluster.objects.get(id=uuid)
            cluster.is_registered = True
            cluster.save()

            # Create Kafka topic
            is_sent = create_kafka_topic(f'{uuid}/register', num_partitions=1, replication_factor=1)

            if is_sent:
                return Response({"message": "Cluster updated successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Cluster not updated"}, status=status.HTTP_400_BAD_REQUEST)
        except HypoCluster.DoesNotExist:
            return Response({"error": "Cluster not found"}, status=status.HTTP_404_NOT_FOUND)