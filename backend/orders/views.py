from rest_framework import viewsets, permissions, filters
from .models import Order, Return
from .serializers import OrderSerializer, ReturnSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from django.utils.timezone import now
from inventory.models import Donation, Component
from users.models import ContactMessage

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

class DashboardMetricsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        pending_donations = Donation.objects.filter(status='Pendiente').count()
        stock_alerts = Component.objects.filter(stock__lte=5).count()
        unread_messages = ContactMessage.objects.filter(is_read=False).count()
        active_orders = Order.objects.exclude(status__in=['Entregado', 'Cancelado']).count()

        current_date = now()
        current_month_orders = Order.objects.filter(
            created_at__year=current_date.year,
            created_at__month=current_date.month
        ).exclude(status='Cancelado')
        
        monthly_income = current_month_orders.aggregate(Sum('total'))['total__sum'] or 0

        chart_data = []
        months_label = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

        for i in range(6, -1, -1):
            target_month = current_date.month - i
            target_year = current_date.year
            if target_month <= 0:
                target_month += 12
                target_year -= 1

            month_orders = Order.objects.filter(
                created_at__year=target_year,
                created_at__month=target_month
            ).exclude(status='Cancelado')

            month_total = month_orders.aggregate(Sum('total'))['total__sum'] or 0

            chart_data.append({
                'monthIndex': target_month - 1,
                'year': target_year,
                'label': months_label[target_month - 1],
                'value': float(month_total) 
            })

        return Response({
            'pending_donations': pending_donations,
            'stock_alerts': stock_alerts,
            'unread_messages': unread_messages,
            'active_orders': active_orders,
            'monthly_income': float(monthly_income),
            'chart_data': chart_data
        })