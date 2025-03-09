def mqtt_message(topic, payload):
    from .models import HypoCluster  # Move the import inside the function

    topic_parts = topic.split('/')
    if len(topic_parts) == 3:
        cluster_id = topic_parts[1]
        if topic_parts[2] == 'status':
            handle_status_message(cluster_id, payload)
        elif topic_parts[2] == 'control':
            handle_control_message(cluster_id, payload)

def handle_status_message(cluster_id, payload):
    from .models import HypoCluster  # Import inside the function

    try:
        cluster = HypoCluster.objects.get(id=cluster_id)
        if payload == 'connected':
            cluster.is_connected = True
        elif payload == 'disconnected':
            cluster.is_connected = False
        cluster.save()

        # Send WebSocket message
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "cluster_status",
            {
                "type": "cluster_status_update",
                "message": {
                    "id": cluster_id,
                    "is_connected": cluster.is_connected,
                },
            },
        )
    except HypoCluster.DoesNotExist:
        print(f'Cluster with id {cluster_id} does not exist')

def handle_control_message(cluster_id, payload):
    # Handle control messages
    print(f'Control message received for cluster {cluster_id}: {payload}')