from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/inventario/', include('inventory.urls')),
    path('api/ordenes/', include('orders.urls')),
]