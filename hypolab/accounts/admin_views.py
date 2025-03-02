# hypolab/accounts/admin_views.py

from rest_framework import generics
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

class AdminUserListView(generics.ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer