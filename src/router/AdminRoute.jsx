import { Navigate } from 'react-router-dom'

const SESSION_KEY = 'shoppy_session'

/**
 * AdminRoute — only allows access if the logged-in user has role === 'admin'.
 * Redirects non-admins to '/' and unauthenticated users to '/sign-in'.
 */
export default function AdminRoute({ element }) {
  try {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) {
      const session = JSON.parse(stored)
      if (session?.isAuthenticated && session?.user?.role === 'admin') {
        return element
      }
      if (session?.isAuthenticated) {
        return <Navigate to="/" replace />
      }
    }
  } catch {
    // fall through
  }
  return <Navigate to="/sign-in" replace />
}
