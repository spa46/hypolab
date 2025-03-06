from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import HypoCluster
from .serializers import HypoClusterSerializer
from .mqtt import client as mqtt_client


class RegisterHypoClusterView(generics.CreateAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

    def perform_create(self, serializer):
        instance = serializer.save()


class HypoClusterStatusView(generics.ListAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ControlHypoClusterView(generics.UpdateAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

    def perform_update(self, serializer):
        instance = serializer.save()


class MonitorHypoClusterView(generics.RetrieveAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


def publish_message(request):
    request_data = json.loads(request.body)
    rc, mid = mqtt_client.publish(request_data['topic'], request_data['msg'])
    return JsonResponse({'code': rc})