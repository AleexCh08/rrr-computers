from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, ReturnViewSet

router = DefaultRouter()
router.register(r'ordenes', OrderViewSet)
router.register(r'devoluciones', ReturnViewSet)

urlpatterns = [
    path('', include(router.urls)),
]