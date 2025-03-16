import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import useShopping from '@/hooks/useShopping'
import { cn } from '@/lib/utils'

export function OrderCard({
  keyOrder,
  id,
  title,
  imageUrl,
  price,
  quantity,
  isCartItem = false,
}) {
  const { removeToCart, increaseQuantity, decreaseQuantity } = useShopping()

  return (
    <div className={cn('flex flex-col mb-2', isCartItem && 'border-b-2')}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <figure className="w-20 h-20">
            <img
              className="w-full h-full rounded-lg object-cover shadow-lg"
              src={imageUrl}
              alt={title}
            />
          </figure>
          <p className="text-sm font-light dark:text-white">{title}</p>
        </div>
        <div className="flex flex-row justify-between gap-5">
          <p className="text-lg font-medium dark:text-white">
            {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
            }).format(price)}
          </p>
          {isCartItem && (
            <span onClick={() => removeToCart(keyOrder, id)}>
              <XMarkIcon className="h-6 w-6 text-black cursor-pointer dark:text-white" />
            </span>
          )}
        </div>
      </div>
      {isCartItem && (
        <div className="flex mt-1 justify-end items-center mb-1">
          {quantity > 1 && (
            <button
              className="bg-red-400 p-1 w-9 rounded-md flex justify-center"
              onClick={() => decreaseQuantity(keyOrder)}
            >
              <MinusIcon className="h-6 w-6 text-black cursor-pointer" />
            </button>
          )}
          <span className="px-5 dark:text-white">{quantity}</span>
          <button
            className="bg-green-400 p-1 w-9 rounded-md flex justify-center"
            onClick={() => increaseQuantity(keyOrder)}
          >
            <PlusIcon className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </div>
      )}
    </div>
  )
}
