import { http } from './http'
export function listProducts({ limit = 12, skip = 0, q = '', sortBy, order } = {}) {
  const params = { limit, skip }
  if (q) params.q = q
  if (sortBy) params.sortBy = sortBy
  if (order) params.order = order
  return http.get('/products',{ params }).then((r) => r.data)
}
export function getProduct(id) {
  return http.get(`/products/${id}`).then((r) => r.data)
}

export function getCategories() {
  return http.get('/products/category-list').then((r) => r.data)
}
