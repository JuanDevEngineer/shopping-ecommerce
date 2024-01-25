import { ChevronRightIcon } from '@heroicons/react/20/solid'

import { cn } from '@/lib/utils'

export function OrdersCard({ date, totalPrice, totalProducts }) {
  return (
    <div className={cn(
      "flex justify-between items-center border border-black dark:border-white rounded-lg p-4 w-80 mb-2 mt-5"
    )}>
      <div className="flex justify-between w-full">
        <div className=" flex flex-col">
          <span className="font-light dark:text-white">{ date }</span>
          <span className="font-light dark:text-white">{ totalProducts } articles</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-2xl dark:text-white">{totalPrice.toFixed(2)}</span>
          <ChevronRightIcon className="h-6 w-6 text-black dark:text-white cursor-pointer" />
        </div>
      </div>
    </div>
  )
}