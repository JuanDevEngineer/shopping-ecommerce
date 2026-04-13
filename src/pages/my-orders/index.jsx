import { Link } from 'react-router-dom'
import { ArrowLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'

import { OrdersCard } from '@/components/OrdersCard'
import useShopping from '@/hooks/useShopping'

function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center border border-black dark:border-white rounded-lg">
      <div className="p-5 rounded-full border border-black dark:border-white">
        <ShoppingBagIcon className="h-10 w-10 text-violet-300 dark:text-violet-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No orders yet</h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          Once you place an order it will appear here.
        </p>
      </div>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-black dark:border-white bg-violet-700 hover:bg-violet-800 text-white text-sm font-medium transition-colors"
      >
        Start shopping
      </Link>
    </div>
  )
}

export default function MyOrdersPage() {
  const { orders } = useShopping()

  // Show newest first
  const sortedOrders = [...orders].reverse()

  const totalSpent = orders.reduce((sum, o) => sum + o.totalPrice, 0)

  return (
    <div className="w-full max-w-2xl px-4 pb-16 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h1>
          {orders.length > 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} &middot;{' '}
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSpent)} total spent
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <div className="flex flex-col gap-3">
          {sortedOrders.map((item) => (
            <Link key={item.id} to={`/my-orders/${item.id}`}>
              <OrdersCard
                orderId={item.id}
                date={item.date}
                totalPrice={item.totalPrice}
                totalProducts={item.totalProducts}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
