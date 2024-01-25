import { Link, useParams } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

import useShopping from '@/hooks/useShopping'
import { OrderCard } from '@/components/OrderCard'

export default function MyOrderPage() {
  const {orders} = useShopping()
  const params = useParams();
  const indexOrderPath = params.id;
  const findOrder = orders?.filter((item) => item.id === indexOrderPath) || []

  return (
    <div className="h-full">
      <div className='flex justify-center items-center relative w-80'>
        <Link to={`/my-orders`} className="absolute left-0">
          <ChevronLeftIcon className='h-6 w-6 text-black dark:text-white cursor-pointer' />
        </Link>
        <h2 className='font-medium text-2xl dark:text-white'>My Order page</h2>
      </div>

      <div className="mt-5 flex flex-col w-full">
        {orders.length === 0 ? (
          <div className="px-6 h-full flex items-center justify-center">
            <span className="flex justify-center items-center h-3/4 dark:text-white">
              No hay products en el cart
            </span>
          </div>
        ): (
          <div className="p-6">
            {findOrder.length === 0 ? (
              orders?.slice(-1)[0].products.map(function(item, key) {
                return (
                  <OrderCard
                    key={key}
                    keyOrder={key}
                    id={item.id}
                    title={item.title}
                    imageUrl={item.images}
                    price={item.price}
                    quantity={item.quantity}
                  />
                )
              })
            ) : (
              findOrder[0].products.map((product) => (
                <OrderCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  imageUrl={product.images}
                  price={product.price}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}