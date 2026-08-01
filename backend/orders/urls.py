from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, ReturnViewSet, DashboardMetricsView

router = DefaultRouter()
router.register(r'ordenes', OrderViewSet, basename='ordenes')
router.register(r'devoluciones', ReturnViewSet, basename='devoluciones')

urlpatterns = [
    path('', include(router.urls)),
    path('metricas/', DashboardMetricsView.as_view(), name='metricas'),
]