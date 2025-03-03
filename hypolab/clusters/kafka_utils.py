# clusters/kafka_utils.py
from confluent_kafka import Producer, Consumer, KafkaException
from confluent_kafka.admin import AdminClient
from confluent_kafka.cimpl import NewTopic
from django.conf import settings


def get_kafka_admin_client():
    admin_client = AdminClient({'bootstrap.servers': settings.KAFKA_CONFIG['bootstrap.servers']})
    return admin_client


def create_kafka_topic(topic_name, num_partitions=1, replication_factor=1):
    admin_client = get_kafka_admin_client()
    topic_name = 'test-topic2'
    topic_list = [NewTopic(topic_name, num_partitions=num_partitions, replication_factor=replication_factor)]

    try:
        fs = admin_client.create_topics(topic_list)

        # Wait for the result
        for topic, future in fs.items():
            future.result()
            print(f"Topic '{topic}' created successfully")

        return True

    except KafkaException as e:
        print(f"Error occurred while creating topic: {e}")

        return False

def delete_kafka_topic(topic_name):
    admin_client = get_kafka_admin_client()
    admin_client.delete_topics([topic_name])


def get_kafka_producer():
    producer = Producer({'bootstrap.servers': settings.KAFKA_CONFIG['bootstrap.servers']})
    return producer


def send_message(producer, message):
    producer.produce(settings.KAFKA_CONFIG['topic'], message)
    producer.flush()