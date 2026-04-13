import { API_URL } from '../constants'
import { adaptProducts } from '../adapters/productAdapter'

/**
 * ApiService — wraps all HTTP calls to the product API.
 *
 * All methods return normalized data via adapters, so the rest of the app
 * is decoupled from the raw API shape.
 *
 * To point at a different API, update VITE_BASE_URL in your .env file
 * and (if needed) update productAdapter.js to handle the new shape.
 */
class ApiService {
  /**
   * Fetch a list of products.
   * @param {string} url  - relative path (e.g. "/products?limit=28&offset=1")
   * @param {AbortSignal} [signal]
   * @returns {Promise<object[]>} Normalized products array
   */
  async getProducts(url, signal) {
    const response = await fetch(`${API_URL}${url}`, { signal })
    if (!response.ok) throw new Error(`HTTP error ${response.status}`)
    const raw = await response.json()
    return adaptProducts(raw)
  }

  /**
   * Fetch a single product by id.
   * @param {number|string} id
   * @param {AbortSignal} [signal]
   * @returns {Promise<object>} Normalized product
   */
  async getProductById(id, signal) {
    const response = await fetch(`${API_URL}/products/${id}`, { signal })
    if (!response.ok) throw new Error(`HTTP error ${response.status}`)
    const raw = await response.json()
    const { adaptProduct } = await import('../adapters/productAdapter')
    return adaptProduct(raw)
  }
}

export default new ApiService()
