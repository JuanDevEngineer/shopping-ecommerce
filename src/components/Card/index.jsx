import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'
import useShopping from '@/hooks/useShopping'
import { cn } from '@/lib/utils'

const defaultImage = 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

export function Card({ item }) {
  const { cartProducts, viewProductDetail, addToCart, closeProductDetail } = useShopping()

  function renderIcon(id) {
    const isInCart = cartProducts.filter((product) => product.id === id).length > 0
    if (isInCart) {
      return <CheckIcon className='h-6 w-6 text-black dark:text-white' />
    } else {
      return <PlusIcon className='h-6 w-6 text-black dark:text-white' />
    }
  }

  return (
    <div
      className='bg-white shadow-md cursor-pointer w-56 h-60 rounded-lg dark:bg-violet-700 dark:shadow-md dark:shadow-white'
      onClick={ () => viewProductDetail(item) }
    >
      <figure className='relative mb-2 w-full h-4/5'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>
          { item?.title }
        </span>
        <img
          className='w-full h-full object-cover rounded-t-lg'
          src={ item?.images[0] || defaultImage }
          // src={defaultImage}
          alt='Headphones'
        />
        <button className={ cn(
          'absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 dark:bg-black'
        ) }
          onClick={ (e) => {
            closeProductDetail()
            addToCart(e, item)
          } }
        >
          { renderIcon(item.id) }
          {/* <PlusIcon className="h-6 w-6 text-black dark:text-white"/> */ }
        </button>
      </figure>
      <p className='flex justify-between px-2'>
        <span className='text-sm font-light dark:text-white'>{ item?.category?.name }</span>
        <span className='text-lg font-medium dark:text-white'>${ item?.price }</span>
      </p>
    </div>
  )
}
