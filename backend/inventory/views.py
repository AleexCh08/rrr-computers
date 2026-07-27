from rest_framework import viewsets, permissions
from rest_framework.decorators import action 
from rest_framework.response import Response
from .models import Component, Donation
from .serializers import ComponentSerializer, DonationSerializer

class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def mis_donaciones(self, request):
        donaciones = Donation.objects.filter(email=request.user.email)
        serializer = self.get_serializer(donaciones, many=True)
        return Response(serializer.data)