from django.db import models

class Component(models.Model):
    CATEGORY_CHOICES = [
        ('PC', 'PC Completa'),
        ('Componente', 'Componente Suelto'),
    ]

    CONDITION_CHOICES = [
        ('nuevo', 'Nuevo'),
        ('usado_bueno', 'Usado (Buen Estado)'),
        ('reparado', 'Reparado / Reacondicionado'),
    ]

    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Componente')
    type = models.CharField(max_length=100)
    stock = models.PositiveIntegerField(default=0)
    condition = models.CharField(max_length=50, choices=CONDITION_CHOICES, default='nuevo')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.type}"


class Donation(models.Model):
    STATUS_CHOICES = [
        ('Pendiente', 'Pendiente'),
        ('Aprobado', 'Aprobado'),
        ('Recibido', 'Recibido'),
        ('Rechazado', 'Rechazado'),
    ]

    donor_name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True) 
    phone = models.CharField(max_length=50, blank=True, null=True) 
    address = models.TextField(blank=True, null=True) 
    item_name = models.CharField(max_length=255)
    condition = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True) 
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pendiente')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Donación: {self.item_name} - {self.donor_name}"