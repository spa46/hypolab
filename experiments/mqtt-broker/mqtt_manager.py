import paho.mqtt.client as mqtt

BROKER = "localhost"
PORT = 1883

def on_message(client, userdata, msg):
    print(f"[Monitor] {msg.topic}: {msg.payload.decode()}")

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

client.on_message = on_message
client.connect(BROKER, PORT, 60)

# 모든 클라이언트의 상태를 모니터링
client.subscribe("clients/+/status", qos=1)

client.loop_forever()
