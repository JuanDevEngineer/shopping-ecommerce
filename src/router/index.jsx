import { useRoutes } from 'react-router-dom'

import HomePage from '../pages/home'
import AccountPage from '../pages/account'
import SignInPage from '../pages/sign-in'
import MyOrderPage from '../pages/my-order'
import MyOrdersPage from '../pages/my-orders'
import NotFoundPage from '../pages/NotFound'
import SignUpPage from '../pages/sign-up'
import ForgotPage from '../pages/forgot'

import PrivateRoute from './PrivateRoute'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      index: true,
      element: <PrivateRoute element={<HomePage />} />,
    },
    {
      path: '/:category',
      element: <PrivateRoute element={<HomePage />} />,
    },
    {
      path: '/my-order',
      element: <PrivateRoute element={<MyOrderPage />} />,
    },
    {
      path: '/my-orders',
      element: <PrivateRoute element={<MyOrdersPage />} />,
    },
    {
      path: '/my-orders/last',
      element: <PrivateRoute element={<MyOrderPage />} />,
    },
    {
      path: '/my-orders/:id',
      element: <PrivateRoute element={<MyOrderPage />} />,
    },
    {
      path: '/account',
      element: <PrivateRoute element={<AccountPage />} /> ,
    },
    {
      path: '/sign-in',
      element: <SignInPage />,
    },
    {
      path: '/sign-up',
      element: <SignUpPage />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPage />,
    },
    {
      path: '/*',
      element: <NotFoundPage />,
    },
  ])
}
