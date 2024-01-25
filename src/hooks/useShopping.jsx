import { useContext } from 'react'
import ShoppingContext from '@/context/ShoppingContext'

export default function useShopping() {
  return useContext(ShoppingContext)
}