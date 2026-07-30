from rest_framework import viewsets, permissions, filters
from .models import Order, Return
from .serializers import OrderSerializer, ReturnSerializer

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'client_name'] 

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all().order_by('-created_at')
        return Order.objects.filter(user=user).order_by('-created_at')

class ReturnViewSet(viewsets.ModelViewSet):
    queryset = Return.objects.all().order_by('-created_at')
    serializer_class = ReturnSerializer
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'client_name', 'item_name']

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]