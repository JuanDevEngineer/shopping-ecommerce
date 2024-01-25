import { ShoppingBagIcon } from '@heroicons/react/24/solid'

import { NavbarItem } from '@components/commons/NavbarItem'

import useAuth from '@/hooks/useAuth'
import useShopping from '@/hooks/useShopping'
import useScrollTop from '@/hooks/useScrollTop'

import { cn } from '@/lib/utils'
import { Switcher } from '@components/commons/Switcher'

const navList = [
  {
    to: '/',
    index: true,
    name: 'Shopi',
    category: ''
  },
  {
    to: '/',
    index: false,
    name: 'All',
    category: ''
  },
  {
    to: '/clothes',
    index: false,
    name: 'Clothes',
    category: 'clothes'
  },
  {
    to: '/electronics',
    index: false,
    name: 'Electronics',
    category: 'electronics'
  },
  {
    to: '/furnitures',
    index: false,
    name: 'Furnitures',
    category: 'furnitures'
  },
  {
    to: '/toys',
    index: false,
    name: 'Toys',
    category: 'toys'
  },
  {
    to: '/others',
    index: false,
    name: 'Others',
    category: 'others'
  }
]

const account = [
  {
    to: '/my-orders',
    name: 'My Orders'
  },
  {
    to: '/account',
    name: 'My Account'
  },
  {
    to: '/sign-in',
    name: 'Sign In'
  }
]

export function Navbar() {
  const { session } = useAuth()
  const { quantityItemsCart, openCartDetail } = useShopping()
  const scrolled = useScrollTop()

  return (
    <nav className={ cn(
      'flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light',
      scrolled && 'border-b bg-white shadow-md dark:shadow-amber-50 dark:bg-slate-900'
    ) }>
      <ul className='flex items-center gap-5'>
        { navList.map((element, key) => (
          <NavbarItem
            key={ key }
            to={ element.to }
            name={ element.name }
            index={ element.index }
            category={element.category}
          />
        )) }
      </ul>
      <ul className='flex items-center gap-5'>
        <li className='text-slate/60 dark:text-white/60'>{ session?.user }</li>
        { account.map((element, i) => (
          <NavbarItem key={ i } to={ element.to } name={ element.name } />
        )) }
        <li className='flex items-center justify-center hover:cursor-pointer dark:text-white' onClick={ () => openCartDetail() } >
          <ShoppingBagIcon className='h-6 w-6 text-[#6d28d9] dark:text-white' />
          <span>({ quantityItemsCart })</span>
        </li>
        <li>
          <Switcher />
        </li>
      </ul>
    </nav>
  )
}
