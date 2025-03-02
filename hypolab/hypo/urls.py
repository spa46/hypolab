# hypo/urls.py
from django.urls import path
from .admin_views import AdminHypoClusterListView, InitClusterView
from .views import RegisterHypoClusterView, HypoClusterStatusView, ControlHypoClusterView, MonitorHypoClusterView

urlpatterns = [
    path('admin/', AdminHypoClusterListView.as_view(), name='admin_clusters'),
    path('init-cluster/', InitClusterView.as_view(), name='init_cluster'),
    path('register/', RegisterHypoClusterView.as_view(), name='register_hypo_cluster'),

    path('status/', HypoClusterStatusView.as_view(), name='status_hypo_cluster'),
    path('control/<int:pk>/', ControlHypoClusterView.as_view(), name='control_hypo_cluster'),
    path('monitor/<int:pk>/', MonitorHypoClusterView.as_view(), name='monitor_hypo_cluster'),
]