import { Dropdown } from '@components/commons/Dropdown'
import useAuth from '@/hooks/useAuth'

const account = [
  {
    to: '/my-orders',
    name: 'My Orders',
  },
  {
    to: '/account',
    name: 'My Account',
  },
]

export function MenuPrivate() {
    const { session } = useAuth()
  return (
    <>
      <Dropdown list={account} session={session} />
    </>
  )
}
