// para tu ver lo que nunca has visto, tiendrás que hacer lo que nunca has hecho

import { createContext, useState, useEffect } from 'react'

import useShoppingCart from '@/hooks/useShoppingCart'
import api from '../api/services/api'

const ShoppingContext = createContext({})

export function ShoppingProvider({ children }) {
  const [products, setProducts] = useState(null) // get all products
  const [status, setStatus] = useState('loading')
  const [detailProduct, setDetailProduct] = useState({}) // Product Detail
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  // Shopping Orders Cart
  const [orders, setOrders] = useState([])
  // Filters data by input
  const [filterItems, setFilterItems] = useState(null)
  // Search input filters
  const [searchInput, setSearchInput] = useState('')
  // Filters data by current path category
  const [searchByCategory, setSearchByCategory] = useState('')

  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  async function fetchProducts() {
    try {
      const response = await api.getProducts(`/products?limit=${28}&offset=${1}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
        setStatus('success')
      } else {
        setProducts([])
      }
    } catch (e) {
      setStatus('error')
    }
  }

  function viewProductDetail(product = {}) {
    setDetailProduct(product)
    openProductDetail()
  }

  function setOrdersData(data) {
    setOrders((item) => [...item, data])
  }

  function filteredItemsBySearchInput(items, searchInput) {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    )
  }

  function filteredItemsByCategory(items, searchByCategory) {
    return items?.filter((item) =>
      item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
    )
  }

  function filterBy(searchType, items, searchByTitle, searchByCategory) {
    if (searchType === 'BY_TITLE') {
      return filteredItemsBySearchInput(items, searchByTitle)
    }
    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }
    if (searchType === 'BY_CATEGORY_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      )
    }
    if (!searchType) {
      return items
    }
    return items
  }

  const {
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
  } = useShoppingCart()

  useEffect(() => {
    const abortController = new AbortController()
    fetchProducts().then(() => {})
    return () => abortController.abort()
  }, [])

  useEffect(() => {
    if (searchInput && searchByCategory)
      setFilterItems(
        filterBy(
          'BY_TITLE_AND_CATEGORY',
          products,
          searchInput,
          searchByCategory
        )
      )
    if (searchInput && !searchByCategory)
      setFilterItems(
        filterBy('BY_TITLE', products, searchInput, searchByCategory)
      )
    if (!searchInput && searchByCategory)
      setFilterItems(
        filterBy('BY_CATEGORY', products, searchInput, searchByCategory)
      )
    if (!searchInput && !searchByCategory)
      setFilterItems(filterBy('', products, searchInput, searchByCategory))
  }, [products, searchInput, searchByCategory])

  return (
    <ShoppingContext.Provider
      value={{
        products,
        status,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        isCheckOutCart,
        openCartDetail,
        closeCartDetail,
        detailProduct,
        viewProductDetail,
        cartProducts,
        quantityItemsCart,
        addToCart,
        removeToCart,
        increaseQuantity,
        decreaseQuantity,
        totalProductPrice,
        cleanCart,
        orders,
        setOrdersData,
        searchInput,
        setSearchInput,
        filterItems,
        searchByCategory,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  )
}

export default ShoppingContext
