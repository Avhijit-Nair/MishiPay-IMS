from django.shortcuts import render
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from .models import Product, Supplier, SaleOrder, StockMovement
import json
# Create your views here.

# Product Operations
@csrf_exempt
def add_product(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            supplier = get_object_or_404(Supplier, id=data['supplier_id'])
            
            # Check for duplicate products
            if Product.objects.filter(name=data['name'], supplier=supplier).exists():
                return JsonResponse({'error': 'Product already exists'}, status=400)
            
            product = Product.objects.create(
                name=data['name'],
                description=data['description'],
                category=data['category'],
                price=data['price'],
                stock_quantity=data['stock_quantity'],
                supplier=supplier
            )
            return JsonResponse({'id': product.id, 'message': 'Product added successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

def list_products(request):
    products = Product.objects.select_related('supplier').all()
    return JsonResponse([{
        'id': p.id,
        'name': p.name,
        'description': p.description,
        'category': p.category,
        'price': str(p.price),
        'stock_quantity': p.stock_quantity,
        'supplier': {
            'name': p.supplier.name,
            'email': p.supplier.email
        }
    } for p in products], safe=False)

# Supplier Operations
@csrf_exempt
def add_supplier(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Check for duplicate supplier
            if Supplier.objects.filter(email=data['email']).exists():
                return JsonResponse({'error': 'Supplier with this email already exists'}, status=400)
            
            supplier = Supplier.objects.create(
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                address=data['address']
            )
            return JsonResponse({'id': supplier.id, 'message': 'Supplier added successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

def list_suppliers(request):
    suppliers = Supplier.objects.all()
    return JsonResponse([{
        'id': s.id,
        'name': s.name,
        'email': s.email,
        'phone': s.phone,
        'address': s.address
    } for s in suppliers], safe=False)

# Stock Movement Operations
@csrf_exempt
def add_stock_movement(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product = get_object_or_404(Product, id=data['product_id'])
            
            movement = StockMovement.objects.create(
                product=product,
                quantity=data['quantity'],
                movement_type=data['movement_type'],
                notes=data.get('notes', '')
            )
            return JsonResponse({'message': 'Stock movement recorded successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

# Sale Order Operations
@csrf_exempt
def create_sale_order(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product = get_object_or_404(Product, id=data['product_id'])
            
            if data['quantity'] > product.stock_quantity:
                return JsonResponse({'error': 'Insufficient stock'}, status=400)
            
            order = SaleOrder.objects.create(
                product=product,
                quantity=data['quantity'],
                total_price=product.price * data['quantity']
            )
            
            # Create outgoing stock movement
            StockMovement.objects.create(
                product=product,
                quantity=data['quantity'],
                movement_type='Out',
                notes=f'Sale order #{order.id}'
            )
            
            return JsonResponse({'id': order.id, 'message': 'Sale order created successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def update_sale_order(request, order_id):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            order = get_object_or_404(SaleOrder, id=order_id)
            
            if data['status'] == 'Cancelled' and order.status != 'Cancelled':
                # Restore stock
                StockMovement.objects.create(
                    product=order.product,
                    quantity=order.quantity,
                    movement_type='In',
                    notes=f'Cancelled sale order #{order.id}'
                )
            
            order.status = data['status']
            order.save()
            
            return JsonResponse({'message': 'Sale order updated successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

def list_sale_orders(request):
    orders = SaleOrder.objects.select_related('product').all()
    return JsonResponse([{
        'id': o.id,
        'product_name': o.product.name,
        'quantity': o.quantity,
        'total_price': str(o.total_price),
        'sale_date': o.sale_date.strftime('%Y-%m-%d'),
        'status': o.status
    } for o in orders], safe=False)

def check_stock_level(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    return JsonResponse({
        'product_name': product.name,
        'stock_quantity': product.stock_quantity
    })