from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ContactMessage, UserProfile

class UserSerializer(serializers.ModelSerializer):
    phone = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'is_staff', 'is_active', 'date_joined', 'phone', 'address']

    def get_phone(self, obj):
        return obj.profile.phone if hasattr(obj, 'profile') else ""

    def get_address(self, obj):
        return obj.profile.address if hasattr(obj, 'profile') else ""

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.save()

        phone_data = self.initial_data.get('phone')
        address_data = self.initial_data.get('address')
        profile, _ = UserProfile.objects.get_or_create(user=instance)
        
        if phone_data is not None:
            profile.phone = phone_data
        if address_data is not None:
            profile.address = address_data
        profile.save()

        return instance

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', '')
        )
        return user

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'