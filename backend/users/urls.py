from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, UserProfileView, AdminUserViewSet

router = DefaultRouter()
router.register(r'admin-users', AdminUserViewSet, basename='admin-user')

urlpatterns = [
    path('registro/', RegisterView.as_view(), name='registro'),
    path('perfil/', UserProfileView.as_view(), name='perfil'),
    path('', include(router.urls)),
]