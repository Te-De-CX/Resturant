from rest_framework import serializers
from .models import User, Products, Order, OrderItem, Category, Payment, Review, ChefsData,Ads
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password',
            'first_name', 'last_name', 'phone_number',
            'address', 'profile_picture'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'profile_picture': {'read_only': True},
        }

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class ProductsSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Products
        fields = ['id', 'name', 'price', 'description', 'image', 'category']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductsSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'user', 'order_date', 'status', 'total', 'items']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'payment_method', 'payment_status', 'payment_date', 'amount']

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    product = ProductsSerializer(read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'user', 'product', 'rating', 'comment', 'review_date']
        
class ChefsDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChefsData
        fields = ['id', 'name', 'profile_picture', 'description', 'text', 'rating']
        
class AdsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ads
        fields = ['id', 'title', 'description', 'image', 'start_date', 'end_date', 'is_active']
