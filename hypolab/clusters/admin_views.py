# clusters/admin_views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import HypoCluster
from .serializers import HypoClusterSerializer
from .utils import generate_hashed_id


class AdminHypoClusterListView(generics.ListAPIView):
    queryset = HypoCluster.objects.all()
    serializer_class = HypoClusterSerializer


class InitClusterView(APIView):
    def post(self, request, *args, **kwargs):
        _id = request.data.get('id')
        if not _id:
            _id = generate_hashed_id()

        # Create a new HypoCluster instance with the provided UUID
        obj, created = HypoCluster.objects.get_or_create(id=_id)

        if created:
            print('New cluster Joined ...', id)
        else:
            print('Cluster already exists ...', id)

        return Response({"id": obj.id}, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):

        id = request.data.get('id')

        try:
            cluster = HypoCluster.objects.get(id=id)
            cluster.is_registered = True
            cluster.save()

            return Response({"message": "Cluster updated successfully"}, status=status.HTTP_200_OK)

        except HypoCluster.DoesNotExist:
            return Response({"error": "Cluster not found"}, status=status.HTTP_404_NOT_FOUND)