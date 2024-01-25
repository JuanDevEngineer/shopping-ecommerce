import { BrowserRouter } from 'react-router-dom'

import Router from '@/router'
import RootLayout from '@pages/RootLayout'

import { Navbar } from '@/components/commons/Navbar'
import { CheckOutCart } from '@/components/CheckOutCart/index'

import { ShoppingProvider } from '@/context/ShoppingContext'
import { AuthProvider } from '@/context/AuthContext'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ShoppingProvider>
            <RootLayout>
              <Navbar />
              <Router />
              <CheckOutCart />
            </RootLayout>
          </ShoppingProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}
