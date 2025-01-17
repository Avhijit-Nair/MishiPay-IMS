import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
      <h1 className="text-5xl font-bold mb-8">Inventory Management System</h1>
      <div className="max-w-2xl text-center mb-12">
        <p className="text-xl mb-4">
          Streamline your business operations with our powerful Inventory Management System. 
          Efficiently track products, manage suppliers, and handle sales orders all in one place.
        </p>
        <p className="text-lg mb-6">
          Use cases include:
        </p>
        <ul className="list-disc list-inside text-left mb-6">
          <li>Real-time stock tracking</li>
          <li>Supplier management</li>
          <li>Sales order processing</li>
          <li>Stock movement analysis</li>
          <li>Inventory forecasting</li>
        </ul>
      </div>
      <Link href="/dashboard">
        <Button size="lg" className="text-xl px-8 py-4 bg-white text-blue-600 hover:bg-blue-100">
          Launch System
        </Button>
      </Link>
    </div>
  )
}

