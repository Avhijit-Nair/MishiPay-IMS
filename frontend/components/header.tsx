import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          IMS
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </li>
            <li>
              <Link href="/products">
                <Button variant="ghost">Products</Button>
              </Link>
            </li>
            <li>
              <Link href="/suppliers">
                <Button variant="ghost">Suppliers</Button>
              </Link>
            </li>
            <li>
              <Link href="/orders">
                <Button variant="ghost">Orders</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

