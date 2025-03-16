import { useState } from 'react'
import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { v4 as uuid } from 'uuid'

import { OrderCard } from '@components/OrderCard/'
import useShopping from '@/hooks/useShopping'
import { cn, dateTime } from '@/lib/utils'
import './styles.css'

export function CheckOutCart() {
  const [iva] = useState(1.19)
  const {
    cartProducts,
    isCheckOutCart,
    closeCartDetail,
    totalProductPrice,
    setOrdersData,
    cleanCart,
    setSearchInput,
  } = useShopping()

  function handleCheckout() {
    const orderToAdd = {
      id: uuid(),
      date: dateTime(),
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalProductPrice() * iva,
    }
    setOrdersData(orderToAdd)
    cleanCart()
    closeCartDetail()
    setSearchInput('')
  }

  return (
    <aside
      className={cn(
        'product-detail hidden flex-col fixed bg-white right-0 border border-black rounded-t-lg dark:bg-gray-900',
        isCheckOutCart && 'flex'
      )}
    >
      <div className="flex justify-between items-center px-3 pt-3">
        <h2 className="font-medium text-xl dark:text-white mb-5">
          Products Cart
        </h2>
        <span onClick={() => closeCartDetail()}>
          <XMarkIcon className="h-6 w-6 text-black dark:text-white hover:cursor-pointer" />
        </span>
      </div>
      {cartProducts.length === 0 ? (
        <div className="px-6 h-3/4">
          <span className="flex justify-center items-center h-3/4 dark:text-white">
            No hay products en el cart
          </span>
        </div>
      ) : (
        <div className="px-6 h-3/4 product-check overflow-y-scroll">
          {cartProducts.map(function (item, key) {
            return (
              <OrderCard
                key={key}
                keyOrder={key}
                id={item.id}
                title={item.title}
                imageUrl={item.images}
                price={item.price}
                quantity={item.quantity}
                isCartItem={true}
              />
            )
          })}
        </div>
      )}

      <div className="flex flex-col w-full pt-5 px-5 total-shadow-top">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold dark:text-white">Subtotal: </p>{' '}
          <span className="text-md font-semibold dark:text-white">
            {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
            }).format(totalProductPrice())}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold dark:text-white">Total + iva: </p>{' '}
          <span className="text-md font-semibold dark:text-white">
            {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
            }).format(parseFloat(totalProductPrice() * iva))}
          </span>
        </div>

        {cartProducts.length > 0 && (
          <Link
            onClick={() => handleCheckout()}
            to="/my-orders/last"
            className="bg-violet-700 w-full py-3 mb-2 rounded-md hover:bg-slate-900 text-white text-center"
          >
            Check out
          </Link>
        )}
      </div>
    </aside>
  )
}
