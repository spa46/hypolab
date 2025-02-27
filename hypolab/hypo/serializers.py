from rest_framework import serializers
from .models import HypoCluster

class HypoClusterSerializer(serializers.ModelSerializer):
    class Meta:
        model = HypoCluster
        fields = ['id', 'registered_at']