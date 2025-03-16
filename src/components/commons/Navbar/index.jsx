import { NavLink } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'

import { NavbarItem } from '@components/commons/NavbarItem'

import useAuth from '@/hooks/useAuth'
import useShopping from '@/hooks/useShopping'
import useScrollTop from '@/hooks/useScrollTop'

import { cn } from '@/lib/utils'
import { Switcher } from '@components/commons/Switcher'
import { MenuPublic } from './_components/MenuPublic'
import { MenuPrivate } from './_components/MenuPrivate'

const navList = [
  {
    to: '/',
    index: true,
    name: 'Shoppi',
    category: '',
  },
  {
    to: '/',
    index: false,
    name: 'All',
    category: '',
  },
  {
    to: '/clothes',
    index: false,
    name: 'Clothes',
    category: 'clothes',
  },
  {
    to: '/electronics',
    index: false,
    name: 'Electronics',
    category: 'electronics',
  },
  {
    to: '/furnitures',
    index: false,
    name: 'Furnitures',
    category: 'furnitures',
  },
  {
    to: '/toys',
    index: false,
    name: 'Toys',
    category: 'toys',
  },
  {
    to: '/others',
    index: false,
    name: 'Others',
    category: 'others',
  },
]

export function Navbar() {
  const { session } = useAuth()
  const { quantityItemsCart, openCartDetail } = useShopping()
  const scrolled = useScrollTop()

  return (
    <nav
      className={cn(
        'flex justify-between max-sm:hidden items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light',
        scrolled &&
          'border-b bg-white shadow-md dark:shadow-amber-50 dark:bg-slate-900'
      )}
    >
      {session?.user ? (
        <ul className="flex items-center gap-5">
          {navList.map((element, key) => (
            <NavbarItem
              key={key}
              to={element.to}
              name={element.name}
              index={element.index}
              category={element.category}
            />
          ))}
        </ul>
      ) : (
        <ul>
          <li className={ 'font-semibold text-lg text-slate-900 dark:text-white' }>
            <NavLink
          to={'/'}
            >
              Shoppi
            </NavLink>
          </li>
        </ul>
      )}
      <ul className="flex items-center gap-5">
        <li
          className="flex items-center justify-center hover:cursor-pointer dark:text-white"
          onClick={() => openCartDetail()}
        >
          <ShoppingBagIcon className="h-6 w-6 text-[#6d28d9] dark:text-white" />
          <span>({quantityItemsCart})</span>
        </li>
        <li>
          <Switcher />
        </li>
        {session?.user ? (
          <li>
            <MenuPrivate />
          </li>
        ) : (
          <MenuPublic />
        )}
      </ul>
    </nav>
  )
}
