'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AddSupplierPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address:''
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
      await api.addSupplier({
        ...formData,
      });
      router.push('/get-supplier');
    } catch (err) {
      setError('Failed to add supplier. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Add New Supplier</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Textarea id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="number" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" type="text" value={formData.address} onChange={handleChange} required />
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
          {isLoading ? 'Adding Supplier...' : 'Add Supplier'}
        </Button>
      </form>
    </div>
  );
}

