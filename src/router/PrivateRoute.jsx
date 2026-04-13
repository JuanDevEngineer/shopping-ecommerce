import { Navigate } from 'react-router-dom'

const SESSION_KEY = 'shoppy_session'

export default function PrivateRoute({ element, redirectTo = '/sign-in' }) {
  let isAuthenticated = false
  try {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) {
      isAuthenticated = JSON.parse(stored)?.isAuthenticated === true
    }
  } catch {
    isAuthenticated = false
  }

  return isAuthenticated ? element : <Navigate to={redirectTo} replace />
}
