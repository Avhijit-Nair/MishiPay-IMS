import { Card } from "@/components/ui/card"
import Link from 'next/link'
import { Package, Users, ShoppingCart, ArrowUpDown, List, PlusCircle, XCircle } from 'lucide-react'

const actions = [
  { title: 'Add Product', icon: PlusCircle, href: '/add-product' },
  { title: 'List Products', icon: Package, href: '/get-products' },
  { title: 'Add Supplier', icon: PlusCircle, href: '/add-supplier' },
  { title: 'List Suppliers', icon: Users, href: '/get-suppliers' },
  { title: 'Create Sales Order', icon: ShoppingCart, href: '/create-order' },
  { title: 'Cancel Sales Order', icon: XCircle, href: '/cancel-order' },
  { title: 'List Sales Orders', icon: List, href: '/orders' },
  { title: 'Stock Movement', icon: ArrowUpDown, href: '/stock-movement' },
]

export default function Dashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Inventory Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <Link href={action.href} key={index}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <action.icon className="w-12 h-12 mb-4 text-blue-600" />
                <h2 className="text-xl font-semibold">{action.title}</h2>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

