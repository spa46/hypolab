from rest_framework import generics, status
from rest_framework.response import Response
from .models import HypoCluster
from .serializers import HypoClusterSerializer
import paho.mqtt.client as mqtt
from .mqtt import client as mqtt_client


class RegisterHypoClusterView(generics.CreateAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

    def perform_create(self, serializer):
        instance = serializer.save()


class ClusterStatusView(generics.RetrieveAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        cluster_id = kwargs.get('id')
        topic = f"/dev/{cluster_id}/status"
        topic = 'abc'

        result = mqtt_client.publish(topic, "Status request received")

        if result.rc != mqtt.MQTT_ERR_SUCCESS:
            return Response({"error": "Failed to publish MQTT message"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            cluster = self.get_object()
            serializer = self.get_serializer(cluster)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except HypoCluster.DoesNotExist:
            return Response({"error": "Cluster not found"}, status=status.HTTP_404_NOT_FOUND)


class ClusterControlView(generics.UpdateAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

    def perform_update(self, serializer):
        instance = serializer.save()


class ClusterMonitorView(generics.RetrieveAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


def publish_message(request):
    request_data = json.loads(request.body)
    rc, mid = mqtt_client.publish(request_data['topic'], request_data['msg'])
    return JsonResponse({'code': rc})