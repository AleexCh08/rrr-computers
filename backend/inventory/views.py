from rest_framework import viewsets, permissions
from .models import Component, Donation
from .serializers import ComponentSerializer, DonationSerializer

class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]