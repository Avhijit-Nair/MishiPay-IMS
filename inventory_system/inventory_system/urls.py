"""
URL configuration for inventory_system project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from IMS import views

urlpatterns = [
    path('api/v0/addproduct/', views.add_product,name = 'Add a Product'),
    path('api/v0/listproducts/', views.list_products,name = 'List all Products'),
    path('api/v0/addsupplier/', views.add_supplier,name = 'Add a Supplier'),
    path('api/v0/listsuppliers/', views.list_suppliers,name = 'List all Supplier'),
    path('api/v0/createsaleorder/', views.create_sale_order,name = 'Create Sale Orders'),
    path('api/v0/addstockmovement/', views.add_stock_movement,name = 'Add Stock Movement'),
    path('api/v0/listsaleorder/', views.list_sale_orders,name = 'List Sale Orders'),
    path('api/v0/checkstocklevel/', views.check_stock_level,name = 'Check Stock Level'),
    path('api/v0/updatesaleorder/',views.update_sale_order,name = "Updates the sale order status"),
]
