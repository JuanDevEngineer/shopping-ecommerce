/**
 * Product Adapter
 *
 * Normalizes raw product data from any API into a consistent internal shape.
 * To support a different API, implement the same output interface — the rest
 * of the app never needs to change.
 *
 * Internal Product shape:
 * {
 *   id: number | string,
 *   title: string,
 *   description: string,
 *   price: number,
 *   images: string[],
 *   category: { id: number | string | null, name: string }
 * }
 */

/**
 * Adapt a single raw product from the API to the internal shape.
 * Works with Platzi Fake Store API and similar REST APIs.
 * @param {object} raw - Raw product object from the API
 * @returns {object} Normalized product
 */
export function adaptProduct(raw) {
  return {
    id: raw.id,
    title: raw.title ?? raw.name ?? 'Unnamed product',
    description: raw.description ?? '',
    price: Number(raw.price) || 0,
    // Platzi returns images as an array; other APIs may use `image` or `thumbnail`
    images: Array.isArray(raw.images)
      ? raw.images
      : [raw.image ?? raw.thumbnail ?? ''],
    category: {
      id: raw.category?.id ?? raw.categoryId ?? null,
      name: raw.category?.name ?? (typeof raw.category === 'string' ? raw.category : 'Other'),
    },
  }
}

/**
 * Adapt a list of raw products.
 * @param {object[]} rawList
 * @returns {object[]}
 */
export function adaptProducts(rawList) {
  if (!Array.isArray(rawList)) return []
  return rawList.map(adaptProduct)
}
