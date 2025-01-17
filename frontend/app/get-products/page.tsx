'use client'

import { useState, useEffect } from 'react'
import { api } from '@/utils/api'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await api.getProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Products</h1>
        <Link href="/add-product">
          <Button>Add New Product</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
              <p className="mt-2">Price: ${product.price.toFixed(2)}</p>
              <p>Quantity: {product.quantity}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


