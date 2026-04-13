import { useRoutes } from 'react-router-dom'

import HomePage from '@/pages/home'
import AccountPage from '@/pages/account'
import SignInPage from '@/pages/sign-in'
import SignUpPage from '@/pages/sign-up'
import MyOrderPage from '@/pages/my-order'
import MyOrdersPage from '@/pages/my-orders'
import NotFoundPage from '@/pages/NotFound'
import ForgotPage from '@/pages/forgot'
import AdminPage from '@/pages/admin'

import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

export default function Router() {
  return useRoutes([
    // Public routes
    { path: '/sign-in',         element: <SignInPage /> },
    { path: '/sign-up',         element: <SignUpPage /> },
    { path: '/forgot-password', element: <ForgotPage /> },

    // Protected — any authenticated user
    { path: '/',                element: <PrivateRoute element={<HomePage />} /> },
    { path: '/:category',       element: <PrivateRoute element={<HomePage />} /> },
    { path: '/my-order',        element: <PrivateRoute element={<MyOrderPage />} /> },
    { path: '/my-orders',       element: <PrivateRoute element={<MyOrdersPage />} /> },
    { path: '/my-orders/last',  element: <PrivateRoute element={<MyOrderPage />} /> },
    { path: '/my-orders/:id',   element: <PrivateRoute element={<MyOrderPage />} /> },
    { path: '/account',         element: <PrivateRoute element={<AccountPage />} /> },

    // Protected — admin only
    { path: '/admin',           element: <AdminRoute element={<AdminPage />} /> },
    { path: '/admin/*',         element: <AdminRoute element={<AdminPage />} /> },

    // Fallback
    { path: '/*',               element: <NotFoundPage /> },
  ])
}
