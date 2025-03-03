# clusters/admin_views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import HypoCluster
from .serializers import HypoClusterSerializer
from .kafka_utils import get_kafka_producer, send_message
from confluent_kafka.admin import AdminClient, NewTopic


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

            # Create Kafka topic
            admin_client = AdminClient({'bootstrap.servers': os.getenv('KAFKA_BOOTSTRAP_SERVERS', 'localhost:9092')})
            topic_list = [NewTopic(topic=f'{uuid}/register', num_partitions=1, replication_factor=1)]
            fs = admin_client.create_topics(topic_list)

            for topic, f in fs.items():
                try:
                    f.result()  # The result itself is None
                    print(f"Topic {topic} created")
                except Exception as e:
                    print(f"Failed to create topic {topic}: {e}")

            return Response({"message": "Cluster updated successfully"}, status=status.HTTP_200_OK)
        except HypoCluster.DoesNotExist:
            return Response({"error": "Cluster not found"}, status=status.HTTP_404_NOT_FOUND)