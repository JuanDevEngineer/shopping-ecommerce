import { Dropdown } from '@components/commons/Dropdown'
import useAuth from '@/hooks/useAuth'

export function MenuPrivate() {
  const { session } = useAuth()

  const isAdmin = session?.user?.role === 'admin'

  const menuItems = [
    { to: '/my-orders', name: 'My Orders' },
    { to: '/account',   name: 'My Account' },
    ...(isAdmin ? [{ to: '/admin', name: '⚙️ Admin Dashboard' }] : []),
  ]

  return <Dropdown list={menuItems} session={session} />
}
