# clusters/urls.py
from django.urls import path
from .admin_views import AdminHypoClusterListView, InitClusterView
from .views import RegisterHypoClusterView, ClusterStatusView, ClusterControlView, ClusterMonitorView

urlpatterns = [
    path('admin/', AdminHypoClusterListView.as_view(), name='admin_clusters'),
    path('init-cluster/', InitClusterView.as_view(), name='init_cluster'),
    path('status/<str:id>/', ClusterStatusView.as_view(), name='status_cluster'),
    path('control/<int:pk>/', ClusterControlView.as_view(), name='control_cluster'),
    path('monitor/<int:pk>/', ClusterMonitorView.as_view(), name='monitor_cluster'),
]