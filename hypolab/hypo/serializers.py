# hypo/serializers.py

from rest_framework import serializers
from .models import HypoCluster

class HypoClusterSerializer(serializers.ModelSerializer):
    class Meta:
        model = HypoCluster
        fields = ['id', 'name', 'location', 'registered_at']