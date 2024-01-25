import { Link } from 'react-router-dom'

import { OrdersCard } from '@/components/OrdersCard'
import useShopping from '@/hooks/useShopping'

export default function MyOrdersPage() {
  const { orders } = useShopping()

  return (
    <>
      <div className='flex justify-center items-center relative w-80'>
        <h2 className='font-medium text-2xl dark:text-white'>My Orders page</h2>
      </div>
      { orders.map(function(item, key) {
        return (
          <Link key={ key } to={ `/my-orders/${ item.id }` }>
            <OrdersCard
              date={item.date}
              totalPrice={ item.totalPrice }
              totalProducts={ item.totalProducts }
            />
          </Link>
        )
      }) }
    </>
  )
}