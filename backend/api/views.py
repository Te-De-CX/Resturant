from rest_framework import viewsets, permissions
from .models import Products, Order, OrderItem, Category, Payment, Review, Ads, ChefsData
from .serializers import ProductsSerializer, OrderSerializer, CategorySerializer, PaymentSerializer, ReviewSerializer, AdsSerializer, ChefsDataSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def perform_create(self, serializer):
        password = serializer.validated_data.get('password')
        serializer.validated_data['password'] = make_password(password)
        serializer.save()

    def perform_update(self, serializer):
        if 'password' in serializer.validated_data:
            password = serializer.validated_data['password']
            serializer.validated_data['password'] = make_password(password)
        serializer.save()

class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class ChefsDataViewSet(viewsets.ModelViewSet):
    queryset = ChefsData.objects.all()
    serializer_class = ChefsDataSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
class AdsViewSet(viewsets.ModelViewSet):
    queryset = Ads.objects.all()
    serializer_class = AdsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)