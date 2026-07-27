from django.db import models

class Order(models.Model):
    STATUS_CHOICES = [
        ('Procesando', 'Procesando'),
        ('Ensamblando', 'Ensamblando'),
        ('Enviado', 'Enviado'),
        ('Entregado', 'Entregado'),
        ('Cancelado', 'Cancelado'),
    ]

    client_name = models.CharField(max_length=255)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Procesando')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Orden #{self.id} - {self.client_name}"

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