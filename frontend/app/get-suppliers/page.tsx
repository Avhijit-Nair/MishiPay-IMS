'use client'

import { useState, useEffect } from 'react'
import { api } from '@/utils/api'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
}

export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchsupplier() {
      try {
        const data = await api.getSuppliers();
        setSuppliers(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch supplier. Please try again later.');
        setIsLoading(false);
      }
    }

    fetchsupplier();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-8">Loading supplier...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">supplier</h1>
        <Link href="/add-product">
          <Button>Add New Supplier</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id}>
            <CardHeader>
              <CardTitle>{supplier.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mt-2">Email: ${supplier.email}</p>
              <p>Phone: {supplier.phone}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


