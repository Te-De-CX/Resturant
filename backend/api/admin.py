from django.contrib import admin
from .models import Category, Products, Order, OrderItem, Payment, Review, UsersData, ChefsData, Ads

# Register your models here.

admin.site.register(Category)
admin.site.register(Products)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)
admin.site.register(Review)
admin.site.register(UsersData)
admin.site.register(ChefsData)
admin.site.register(Ads)


