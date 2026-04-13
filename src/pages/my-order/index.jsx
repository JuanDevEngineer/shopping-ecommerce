import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeftIcon,
  CalendarIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid'

import useShopping from '@/hooks/useShopping'
import { OrderCard } from '@/components/OrderCard'

function StatPill({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2.5 bg-white dark:bg-gray-800 border border-black dark:border-white rounded-lg px-4 py-3">
      <div className={`p-1.5 rounded-lg ${color}`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  )
}

export default function MyOrderPage() {
  const { orders } = useShopping()
  const { id } = useParams()

  const order = orders.find((o) => o.id === id) ?? orders[orders.length - 1] ?? null

  if (orders.length === 0 || !order) {
    return (
      <div className="w-full max-w-2xl px-4 pb-16 space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/my-orders" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Detail</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border border-black dark:border-white rounded-lg">
          <ShoppingBagIcon className="h-12 w-12 text-gray-200 dark:text-gray-700" />
          <p className="text-gray-400 dark:text-gray-500">No order found.</p>
          <Link to="/" className="text-sm text-violet-600 dark:text-violet-400 hover:underline">
            Back to shopping
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = order.products.reduce(
    (sum, p) => sum + p.price * (p.quantity ?? 1),
    0
  )
  const tax = order.totalPrice - subtotal

  return (
    <div className="w-full max-w-2xl px-4 pb-16 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/my-orders" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Detail</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">
            #{order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-black dark:border-white px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <CheckCircleIcon className="h-3.5 w-3.5" />
          Completed
        </span>
      </div>

      {/* Summary pills */}
      <div className="grid grid-cols-3 gap-3">
        <StatPill icon={CalendarIcon}      label="Date"  value={order.date}                                                                                                               color="bg-violet-500" />
        <StatPill icon={ShoppingBagIcon}   label="Items" value={`${order.totalProducts} ${order.totalProducts === 1 ? 'item' : 'items'}`}                                                 color="bg-blue-500" />
        <StatPill icon={CurrencyDollarIcon} label="Total" value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.totalPrice)} color="bg-emerald-500" />
      </div>

      {/* Items list */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-white overflow-hidden">
        <div className="px-5 py-4 border-b border-black dark:border-white">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Products ordered</h2>
        </div>

        <div className="px-5 divide-y divide-black dark:divide-white">
          {order.products.map((product, key) => (
            <OrderCard
              key={product.id ?? key}
              keyOrder={key}
              id={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
              quantity={product.quantity}
              isCartItem={false}
            />
          ))}
        </div>

        {/* Price breakdown */}
        <div className="px-5 py-4 bg-gray-50 dark:bg-gray-900/40 space-y-2 border-t border-black dark:border-white">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Subtotal</span>
            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Tax (19%)</span>
            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tax)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white border-t border-black dark:border-white pt-2 mt-1">
            <span>Total</span>
            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.totalPrice)}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-black dark:border-white bg-violet-700 hover:bg-violet-800 text-white text-sm font-medium transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
