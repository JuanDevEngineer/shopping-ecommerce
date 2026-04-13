import { ChevronRightIcon, CalendarIcon, ShoppingBagIcon } from '@heroicons/react/20/solid'
import { cn } from '@/lib/utils'

export function OrdersCard({ date, totalPrice, totalProducts }) {
  return (
    <div className={cn(
      'group flex items-center justify-between',
      'bg-white dark:bg-gray-800',
      'border border-black dark:border-white',
      'rounded-lg p-5 w-full',
      'hover:bg-gray-50 dark:hover:bg-gray-700',
      'transition-colors duration-200 cursor-pointer'
    )}>
      {/* Left: icon + info */}
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-lg border border-black dark:border-white flex-shrink-0">
          <ShoppingBagIcon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            <CalendarIcon className="h-3 w-3" />
            <span>{date}</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {totalProducts} {totalProducts === 1 ? 'item' : 'items'}
          </p>
          <span className="inline-flex w-fit items-center rounded-full border border-black dark:border-white px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Completed
          </span>
        </div>
      </div>

      {/* Right: price + arrow */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs text-gray-400 dark:text-gray-500">Total</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(totalPrice)}
          </p>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
      </div>
    </div>
  )
}
