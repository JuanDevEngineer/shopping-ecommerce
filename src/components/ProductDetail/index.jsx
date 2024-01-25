import { XMarkIcon } from '@heroicons/react/20/solid'

import useShopping from '@/hooks/useShopping'
import { cn } from '@/lib/utils'
import './styles.css'
export function ProductDetail() {
  const {isProductDetailOpen, closeProductDetail, detailProduct} = useShopping()
  return (
    <aside className={cn(
      "product-detail hidden flex-col fixed bg-white right-0 border border-black rounded-t-lg dark:bg-gray-900",
      isProductDetailOpen && "flex"
    )}>
      <div className="flex justify-between items-center px-3 pt-3">
        <h2 className="font-medium text-xl dark:text-white">Product Detail</h2>
        <span onClick={() => closeProductDetail()}>
          <XMarkIcon className="h-6 w-6 text-black dark:text-white hover:cursor-pointer" />
        </span>
      </div>
      <figure className="flex justify-center p-6 dark:shadow-amber-50 text-center">
        <img src={`${detailProduct?.images}`} alt={`${detailProduct?.title}`} className="w-80 h-80 object-cover rounded-lg" />
      </figure>
      <p className="flex flex-col px-6">
        <span className="font-medium text-2xl dark:text-white">${detailProduct?.price}</span>
        <span className="font-medium text-md dark:text-white">{detailProduct?.title}</span>
        <span className="font-light text-md dark:text-white">{detailProduct?.description}</span>
      </p>
    </aside>
  )
}