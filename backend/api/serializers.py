from rest_framework import serializers
from .models import CustomUser, Products, Order, OrderItem, Category, Payment, Review, ChefsData, Ads, UserFavorites
from django.contrib.auth import get_user_model

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
        }

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductsSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    
    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return UserFavorites.objects.filter(user=request.user, product=obj).exists()
        return False
    
    class Meta:
        model = Products
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductsSerializer(read_only=True)
    
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    product = ProductsSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = '__all__'
        
class ChefsDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChefsData
        fields = '__all__'
        
class AdsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ads
        fields = '__all__'
        
class UserFavoritesSerializer(serializers.ModelSerializer):
    product = ProductsSerializer(read_only=True)  # Nested product details

    class Meta:
        model = UserFavorites
        fields = ['id', 'product', 'added_at']
        
        