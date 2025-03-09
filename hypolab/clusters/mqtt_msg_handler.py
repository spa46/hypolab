# mqtt_msghandler.py
from .models import HypoCluster


def mqtt_message(topic, payload):
    topic_parts = topic.split('/')

    if len(topic_parts) == 3 and topic_parts[2] == 'status':
        cluster_id = topic_parts[1]
        try:
            cluster = HypoCluster.objects.get(id=cluster_id)
            if payload == 'connected':
                cluster.is_connected = True
            elif payload == 'disconnected':
                cluster.is_connected = False
            cluster.save()
        except HypoCluster.DoesNotExist:
            print(f'Cluster with id {cluster_id} does not exist')