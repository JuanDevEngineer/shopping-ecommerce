import { useState, useEffect } from 'react'
import Toastify from 'toastify-js'

export default function useShoppingCart() {
  const [cartProducts, setCartProducts] = useState([])
  const [quantityItemsCart, setQuantityItemsCart] = useState(0)
  const [isCheckOutCart, setIsCheckOutCart] = useState(false)
  const openCartDetail = () => setIsCheckOutCart(true)
  const closeCartDetail = () => setIsCheckOutCart(false)

  function addToCart(event, product = {}) {
    event.stopPropagation()
    openCartDetail()
    if (cartProducts.some((item) => item.id === product.id)) {
      let updateProductCarts = [...cartProducts]
      updateProductCarts = updateProductCarts.map(function(item) {
        return (item.id === product.id) ?
          { ...item, quantity: item.quantity + 1 } : item
      })
      setCartProducts(updateProductCarts)
      Toastify({
        text: "Product added",
        duration: 1000,
        style: { background: "#00D330"}
      }).showToast();
      return
    }

    setQuantityItemsCart((countPrev) => ++countPrev)
    setCartProducts([...cartProducts, { ...product, quantity: 1 }])
    Toastify({
      text: "Product add successfully",
      duration: 1000,
      style: { background: "#00D330"}
    }).showToast();
  }

  function removeToCart(key, id) {
    let removeProductCarts = [...cartProducts]
    removeProductCarts = removeProductCarts.filter(function(item) {
      return item.id !== id
    })
    setQuantityItemsCart((prev) => --prev)
    setCartProducts(removeProductCarts)
  }

  function increaseQuantity(key) {
    const currentProducts = [...cartProducts]
    currentProducts[key].quantity++
    setCartProducts(currentProducts)
  }

  function decreaseQuantity(key) {
    const currentProducts = [...cartProducts]
    if (currentProducts[key].quantity === 0) return
    currentProducts[key].quantity--
    setCartProducts(currentProducts)
  }

  function totalProductPrice() {
    return cartProducts.reduce(function (totalPrice, currentProduct) {
      return totalPrice + currentProduct.price * currentProduct.quantity
    }, 0)
  }

  function cleanCart() {
    setQuantityItemsCart(0)
    setCartProducts([])
  }

  useEffect(() => {
    totalProductPrice()
  }, [cartProducts])

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