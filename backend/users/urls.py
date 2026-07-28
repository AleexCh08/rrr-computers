from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, UserProfileView, AdminUserViewSet, ContactMessageCreateView, AdminContactMessageViewSet

router = DefaultRouter()
router.register(r'admin-users', AdminUserViewSet, basename='admin-user')
router.register(r'admin-mensajes', AdminContactMessageViewSet, basename='admin-mensaje')

urlpatterns = [
    path('registro/', RegisterView.as_view(), name='registro'),
    path('perfil/', UserProfileView.as_view(), name='perfil'),
    path('contacto/', ContactMessageCreateView.as_view(), name='contacto'),
    path('', include(router.urls)),
]