from rest_framework import serializers
from django.db import transaction
from .models import Order, Return, OrderItem
from inventory.models import Component

class OrderItemSerializer(serializers.ModelSerializer):
    component_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = OrderItem
        fields = ['component_id', 'product_name', 'price', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, required=False)

    class Meta:
        model = Order
        fields = ['id', 'client_name', 'total', 'status', 'created_at', 'items']
        read_only_fields = ['created_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        
        user = self.context['request'].user 
        with transaction.atomic():
            order = Order.objects.create(user=user, **validated_data)
            
            for item_data in items_data:
                component_id = item_data.pop('component_id')
                
                try:
                    component = Component.objects.select_for_update().get(id=component_id) 
                except Component.DoesNotExist:
                    raise serializers.ValidationError(f"El producto con ID {component_id} ya no existe.")
                
                if component.stock < item_data['quantity']:
                    raise serializers.ValidationError(f"Stock insuficiente para {component.name}. Solo quedan {component.stock}.")
                
                component.stock -= item_data['quantity']
                component.save()
                
                OrderItem.objects.create(order=order, component=component, **item_data)
            
        return order

class ReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Return
        fields = '__all__'