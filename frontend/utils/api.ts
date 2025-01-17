const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  getProducts: () => fetchFromAPI('/v0/listproducts/'),
  addProduct: (data: any) => fetchFromAPI('/v0/addproduct/', { method: 'POST', body: JSON.stringify(data) }),
  getSuppliers: () => fetchFromAPI('/v0/listsuppliers/'),
  addSupplier: (data: any) => fetchFromAPI('/v0/addsupplier/', { method: 'POST', body: JSON.stringify(data) }),
  getSalesOrders: () => fetchFromAPI('/v0/salesorder/'),
  createSalesOrder: (data: any) => fetchFromAPI('v0/createsaleorder/', { method: 'POST', body: JSON.stringify(data) }),
//   cancelSalesOrder: (id: number) => fetchFromAPI(`/sales-orders/${id}/cancel/`, { method: 'POST' }),
//   getStockMovements: () => fetchFromAPI('/stock-movements/'),
  addStockMovement: (data: any) => fetchFromAPI('v0/addstockmovement/', { method: 'POST', body: JSON.stringify(data) }),
};

