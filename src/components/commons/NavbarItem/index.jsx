import { NavLink } from 'react-router-dom'
import useShopping from '@/hooks/useShopping'

export function NavbarItem({ to, name, index, category = ''}) {
  const { setSearchByCategory } = useShopping()
  const activeStyle = 'underline underline-offset-4'

  if (index)
    return (
      <li className={ 'font-semibold text-lg text-slate-900 dark:text-white' }>
        <NavLink
          to={ to }
        >
          { name }
        </NavLink>
      </li>
    )

  if (category) {
    return <li className='text-slate-900 dark:text-white'>
      <NavLink
        to={ to }
        onClick={() => setSearchByCategory(category)}
        className={ ({ isActive }) => (isActive ? activeStyle : undefined) }
      >
        { name }
      </NavLink>
    </li>
  }

  return (
    <li className='text-slate-900 dark:text-white'>
      <NavLink
        to={ to }
        onClick={() => setSearchByCategory('')}
        className={ ({ isActive }) => (isActive ? activeStyle : undefined) }
      >
        { name }
      </NavLink>
    </li>
  )
}
