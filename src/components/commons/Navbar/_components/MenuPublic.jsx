import { NavbarItem } from '@components/commons/NavbarItem'


const account = [
  {
    to: '/sign-in',
    name: 'Sign In',
  },
  {
    to: '/sign-up',
    name: 'Sign Up',
  },
]

export function MenuPublic() {
  return (
    <>
      {account.map((element, i) => (
        <NavbarItem key={i} to={element.to} name={element.name} />
      ))}
    </>
  )
}
