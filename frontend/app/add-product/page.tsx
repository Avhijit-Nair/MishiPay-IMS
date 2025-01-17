'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    supplier:''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await api.addProduct({
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
      });
      router.push('/add-products');
    } catch (err) {
      setError('Failed to add product. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Add New Product</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" type="text" value={formData.category} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="quantity">Stock Quantity</Label>
            <Input id="quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="supplier">Supplier</Label>
            <Input id="supplier" name="supplier" type="text"  value={formData.supplier} onChange={handleChange} required />
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
          {isLoading ? 'Adding Product...' : 'Add Product'}
        </Button>
      </form>
    </div>
  );
}

