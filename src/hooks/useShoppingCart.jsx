import { useState, useEffect } from 'react'
import Toastify from 'toastify-js'

const CART_STORAGE_KEY = 'shoppy_cart'

function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export default function useShoppingCart() {
  const [cartProducts, setCartProducts] = useState(() => loadCartFromStorage())
  const [isCheckOutCart, setIsCheckOutCart] = useState(false)
  const openCartDetail = () => setIsCheckOutCart(true)
  const closeCartDetail = () => setIsCheckOutCart(false)

  // Derived quantity — always in sync with cartProducts
  const quantityItemsCart = cartProducts.reduce((sum, item) => sum + item.quantity, 0)

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartProducts))
  }, [cartProducts])

  function addToCart(event, product = {}) {
    event.stopPropagation()
    openCartDetail()
    if (cartProducts.some((item) => item.id === product.id)) {
      setCartProducts((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
      Toastify({
        text: "Product added",
        duration: 1000,
        style: { background: "#00D330" },
      }).showToast()
      return
    }

    setCartProducts((prev) => [...prev, { ...product, quantity: 1 }])
    Toastify({
      text: "Product added successfully",
      duration: 1000,
      style: { background: "#00D330" },
    }).showToast()
  }

  function removeToCart(key, id) {
    setCartProducts((prev) => prev.filter((item) => item.id !== id))
  }

  function increaseQuantity(key) {
    setCartProducts((prev) =>
      prev.map((item, i) => (i === key ? { ...item, quantity: item.quantity + 1 } : item))
    )
  }

  function decreaseQuantity(key) {
    setCartProducts((prev) =>
      prev.map((item, i) =>
        i === key && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    )
  }

  function totalProductPrice() {
    return cartProducts.reduce((totalPrice, currentProduct) => {
      return totalPrice + currentProduct.price * currentProduct.quantity
    }, 0)
  }

  function cleanCart() {
    setCartProducts([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  return {
    cartProducts,
    quantityItemsCart,
    addToCart,
    removeToCart,
    increaseQuantity,
    decreaseQuantity,
    totalProductPrice,
    cleanCart,
    isCheckOutCart,
    openCartDetail,
    closeCartDetail,
  }
}