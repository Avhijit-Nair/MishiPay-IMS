from rest_framework import serializers
from .models import *

class ProductSerializer(serializer.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name','description','category','price','stock_quantity','supplier']

class SupplierSerializer(serializer.ModelSerializer):
    class Meta:
        model = Supplier
        fiels = ['name','email','phone','address']

class SaleOrderSerializer(serializer.ModelSerializer):
    class Meta:
        model = SaleOrder
        fiels = ['product','quantity','total_price','sale_date','status']

class StockMovementSerializer(serializer.ModelSerializer):
    class Meta:
        model = StockMovement
        fiels = ['product','quantity','movement_type','movement_date','notes']