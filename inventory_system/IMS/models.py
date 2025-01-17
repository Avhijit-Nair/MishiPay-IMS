from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator,RegexValidator
from django.core.exceptions import ValidationError
from decimal import Decimal
import re


# Create your models here.

def validate_phone(value):
    if not re.match(r'^\d{10}$', value):
        raise ValidationError('Phone number must be exactly 10 digits')

def validate_email(value):
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', value):
        raise ValidationError('Invalid email format')

#Product Model
class Product(models.Model):
    name = models.CharField(max_length=100,unique = True)
    description = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    stock_quantity = models.PositiveIntegerField(default=0,validators=[MinValueValidator(1), MaxValueValidator(1000)])
    price = models.DecimalField(max_digits=12, decimal_places=2,validators=[MinValueValidator(Decimal('0.01'))])
    supplier = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.name} ({self.sku})"

# Supplier Model
class Supplier(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(validators=[validate_email],unique = True)
    phone = models.CharField(max_length=10, validators=[validate_phone],unique = True)
    address = models.TextField()


    def __str__(self):
        return self.name

# Sales Order Model
class SaleOrder(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    total_price = models.DecimalField(max_digits=12, decimal_places=2,validators=[MinValueValidator(Decimal('0.01'))])
    sale_date = models.DateField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Pending'
    )

    def clean(self):
        if self.quantity > self.product.stock_quantity:
            raise ValidationError('Insufficient stock available')
        if self.quantity <= 0:
            raise ValidationError('Quantity must be positive')
        
    def save(self, *args, **kwargs):
        if not self.total_price:
            self.total_price = self.product.price * self.quantity
        super().save(*args, **kwargs)

# Stock Movement Model
class StockMovement(models.Model):
    MOVEMENT_CHOICES = [
        ('In', 'In'),
        ('Out', 'Out'),
    ]
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    movement_type = models.CharField(max_length=3, choices=MOVEMENT_CHOICES)
    movement_date = models.DateField(auto_now_add=True)
    notes = models.TextField(blank=True)

    def clean(self):
        if self.movement_type == 'Out' and self.quantity > self.product.stock_quantity:
            raise ValidationError('Insufficient stock for outgoing movement')
        
    def save(self, *args, **kwargs):
        if self.movement_type == 'In':
            self.product.stock_quantity += self.quantity
        else:
            self.product.stock_quantity -= self.quantity
        self.product.save()
        super().save(*args, **kwargs)