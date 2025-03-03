from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import HypoCluster
from .serializers import HypoClusterSerializer
from .kafka_utils import get_kafka_producer, send_message


class RegisterHypoClusterView(generics.CreateAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

    def perform_create(self, serializer):
        print('!@#')
        instance = serializer.save()
        producer = get_kafka_producer()
        send_message(producer, 'register_hypo_cluster', instance.id)


class HypoClusterStatusView(generics.ListAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

    def list(self, request, *args, **kwargs):
        consumer = get_kafka_consumer('status_group', ['status_hypo_cluster'])
        consume_messages(consumer)
        return super().list(request, *args, **kwargs)


class ControlHypoClusterView(generics.UpdateAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

    def perform_update(self, serializer):
        instance = serializer.save()
        producer = get_kafka_producer()
        send_message(producer, 'control_hypo_cluster', instance.id)


class MonitorHypoClusterView(generics.RetrieveAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

    def retrieve(self, request, *args, **kwargs):
        consumer = get_kafka_consumer('monitor_group', ['monitor_hypo_cluster'])
        consume_messages(consumer)
        return super().retrieve(request, *args, **kwargs)