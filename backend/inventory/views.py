from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action 
from rest_framework.response import Response
from .models import Component, Donation
from .serializers import ComponentSerializer, DonationSerializer

class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all().order_by('-created_at')
    serializer_class = ComponentSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'type', 'description']
    ordering_fields = ['price', 'created_at']

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all().order_by('-created_at')
    serializer_class = DonationSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'donor_name', 'item_name', 'email']

    def get_permissions(self):
        if self.action == 'mis_donaciones':
            return [permissions.IsAuthenticated()]
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def mis_donaciones(self, request):
        donaciones = Donation.objects.filter(email=request.user.email).order_by('-created_at')
        page = self.paginate_queryset(donaciones)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(donaciones, many=True)
        return Response(serializer.data)