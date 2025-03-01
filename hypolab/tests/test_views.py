import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from hypo.models import HypoCluster

@pytest.mark.django_db
def test_init_cluster_view():
    client = APIClient()
    url = reverse('init-cluster')
    data = {'uuid': 'test-uuid'}

    response = client.post(url, data, format='json')

    assert response.status_code == status.HTTP_200_OK
    assert HypoCluster.objects.filter(id='test-uuid').exists()