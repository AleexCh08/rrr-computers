from django.db import models
from django.contrib.auth.models import User 
from inventory.models import Component

class Order(models.Model):
    STATUS_CHOICES = [
        ('Procesando', 'Procesando'),
        ('Ensamblando', 'Ensamblando'),
        ('Enviado', 'Enviado'),
        ('Entregado', 'Entregado'),
        ('Cancelado', 'Cancelado'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', null=True)
    client_name = models.CharField(max_length=255)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Procesando')
    created_at = models.DateTimeField(auto_now_add=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    shipping_address = models.TextField(blank=True, null=True)
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    payment_reference = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Orden #{self.id} - {self.client_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    component = models.ForeignKey(Component, on_delete=models.SET_NULL, null=True) # ACTUALIZADO
    product_name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity}x {self.product_name} en Orden #{self.order.id}"

class Return(models.Model):
    STATUS_CHOICES = [
        ('Pendiente', 'Pendiente'),
        ('Aprobado', 'Aprobado'),
        ('Completado', 'Completado'),
        ('Rechazado', 'Rechazado'),
    ]

    client_name = models.CharField(max_length=255)
    item_name = models.CharField(max_length=255)
    reason = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pendiente')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ticket #{self.id} - {self.client_name}"