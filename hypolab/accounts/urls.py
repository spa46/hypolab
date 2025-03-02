# accounts/urls.py
from django.urls import path
from .admin_views import AdminUserListView
from .views import RegisterView, LoginView, LogoutView

urlpatterns = [
    path('admin/', AdminUserListView.as_view(), name='admin_clusters'),

    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]