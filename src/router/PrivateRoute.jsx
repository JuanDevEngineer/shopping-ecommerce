import { Navigate } from 'react-router-dom'

export default function PrivateRoute({
  element,
  defaultNavitage = '/sign-in',
}) {
  let isAuthenticated = false
  if (localStorage.getItem('session') && JSON.parse(localStorage.getItem('session')).isAuthenticated) {
    isAuthenticated = true
  }

  return isAuthenticated ? element : <Navigate to={defaultNavitage} />
}
