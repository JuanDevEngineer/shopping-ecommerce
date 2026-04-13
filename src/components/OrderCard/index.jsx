import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import useShopping from '@/hooks/useShopping'
import { cn } from '@/lib/utils'

const FALLBACK_IMG = 'https://placehold.co/80x80/e5e7eb/9ca3af?text=?'

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

  // imageUrl can be an array or a plain string
  const imgSrc = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl

  return (
    <div className={cn(
      'flex flex-col gap-2 py-3',
      isCartItem && 'border-b border-gray-100 dark:border-gray-700 last:border-0',
      !isCartItem && 'border-b border-gray-100 dark:border-gray-700 last:border-0'
    )}>
      <div className="flex items-center justify-between gap-3">
        {/* Image + title */}
        <div className="flex items-center gap-3 min-w-0">
          <figure className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              className="w-full h-full object-cover"
              src={imgSrc || FALLBACK_IMG}
              alt={title}
              onError={(e) => { e.target.src = FALLBACK_IMG }}
            />
          </figure>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate leading-snug">
              {title}
            </p>
            {!isCartItem && quantity != null && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                Qty: {quantity}
              </p>
            )}
          </div>
        </div>

        {/* Price + remove */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(price)}
          </p>
          {isCartItem && (
            <button
              onClick={() => removeToCart(keyOrder, id)}
              className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              aria-label="Remove from cart"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quantity controls — only in cart */}
      {isCartItem && (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => decreaseQuantity(keyOrder)}
            disabled={quantity <= 1}
            className={cn(
              'w-7 h-7 rounded-lg flex items-center justify-center transition-colors',
              quantity <= 1
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/40 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
            )}
          >
            <MinusIcon className="h-3.5 w-3.5" />
          </button>

          <span className="text-sm font-semibold text-gray-900 dark:text-white w-6 text-center">
            {quantity}
          </span>

          <button
            onClick={() => increaseQuantity(keyOrder)}
            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-violet-100 dark:hover:bg-violet-900/40 text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 flex items-center justify-center transition-colors"
          >
            <PlusIcon className="h-3.5 w-3.5" />
          </button>

          <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
            = {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price * quantity)}
          </span>
        </div>
      )}
    </div>
  )
}
