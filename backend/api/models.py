from django.db import models
from django.contrib.auth.models import User, AbstractUser

class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(
        upload_to='profile_pictures/',
        blank=True,
        null=True
    )

class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)

class Products(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    text = models.TextField(blank=True, null=True)
    ingredents = models.TextField(blank=True, null=True)
    allergens = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)
    is_favorite = models.BooleanField(default=False)
    chefs = models.ForeignKey('ChefsData', on_delete=models.SET_NULL, null=True, blank=True)
    rating = models.FloatField(blank=True, null=True)

class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    total = models.FloatField()

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.FloatField()

class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50)
    payment_status = models.CharField(max_length=50)
    payment_date = models.DateTimeField(auto_now_add=True)
    amount = models.FloatField()

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE, null=True, blank=True)
    rating = models.PositiveIntegerField()
    comment = models.TextField(blank=True, null=True)
    review_date = models.DateTimeField(auto_now_add=True)
    
class ChefsData(models.Model):
    name = models.CharField(max_length=150)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    rating = models.FloatField(blank=True, null=True)
        
class Ads(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='ads/', blank=True, null=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)