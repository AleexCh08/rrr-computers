from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ComponentViewSet, DonationViewSet

router = DefaultRouter()

router.register(r'componentes', ComponentViewSet)
router.register(r'donaciones', DonationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]