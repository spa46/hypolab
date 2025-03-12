import paho.mqtt.client as mqtt
from django.conf import settings
from .mqtt_msg_handler import mqtt_message

is_subscribed = False

def on_connect(mqtt_client, userdata, flags, rc):
    global is_subscribed
    if rc == 0:
        print('Connected successfully')
        if not is_subscribed:
            mqtt_client.subscribe("clients/+/status", qos=1)
            is_subscribed = True
    else:
        print('Bad connection. Code:', rc)

def on_message(mqtt_client, userdata, msg):
    # print(f'Received message on topic: {msg.topic} with payload: {msg.payload}')
    mqtt_message(msg.topic, msg.payload.decode())

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.username_pw_set(settings.MQTT_USER, settings.MQTT_PASSWORD)
client.connect(
    host=settings.MQTT_SERVER,
    port=settings.MQTT_PORT,
    keepalive=settings.MQTT_KEEPALIVE
)
client.loop_start()