import { useRoutes } from 'react-router-dom'

import HomePage from '../pages/home'
import AccountPage from '../pages/account'
import SignInPage from '../pages/sign-in'
import MyOrderPage from '../pages/my-order'
import MyOrdersPage from '../pages/my-orders'
import NotFoundPage from '../pages/NotFound'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      index: true,
      element: <HomePage />,
    },
    {
      path: '/:category',
      element: <HomePage />,
    },
    {
      path: '/my-order',
      element: <MyOrderPage />,
    },
    {
      path: '/my-orders',
      element: <MyOrdersPage />,
    },
    {
      path: '/my-orders/last',
      element: <MyOrderPage />,
    },
    {
      path: '/my-orders/:id',
      element: <MyOrderPage />,
    },
    {
      path: '/account',
      element: <AccountPage />,
    },
    {
      path: '/sign-in',
      element: <SignInPage />,
    },
    {
      path: '/*',
      element: <NotFoundPage />,
    },
  ])
}
