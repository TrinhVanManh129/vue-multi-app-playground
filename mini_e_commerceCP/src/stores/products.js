import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listProducts, getProduct, getCategories } from '@/services/products'

export const useProductsStore = defineStore('products', () => {
  const items = ref([])
  const total = ref(0)
  const limit = ref(12)
  const skip = ref(0)
  const q = ref('')
  const sortBy = ref('')
  const order = ref('asc')
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  const byId = ref({})
  const activeCategory = ref('')
  async function fetchCategories() {
    try {
      categories.value = await getCategories()
    } catch (e) {
      console.error(e)
    }
  }
  async function fetchList() {
    loading.value = true
    error.value = null
    try {
      const data = await listProducts({
        limit: limit.value,
        skip: skip.value,
        q: q.value,
        sortBy: sortBy.value,
        order: order.value,
      })
      let products = data.products || []
      if (activeCategory.value) {
        products = products.filter((p) => (p.category || '').toLowerCase() === activeCategory.value.toLowerCase())
        total.value = products.length
      } else {
        total.value = data.total || products.length
      }
      items.value = products
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }
  async function fetchById(id) {
    if (byId.value[id]) return byId.value[id]
    const p = await getProduct(id)
    byId.value[id] = p
    return p
  }
  function setQuery(newQ) {
    q.value = newQ
    skip.value = 0
  }

  function setCategory(c) {
    activeCategory.value = c
    skip.value = 0
  }

  function setSort(newSortBy, newOrder = 'asc') {
    sortBy.value = newSortBy
    order.value = newOrder
    skip.value = 0
  }

  function setPage(page) {
    skip.value = (page - 1) * limit.value
  }

  return {
    items,
    total,
    limit,
    skip,
    q,
    sortBy,
    order,
    categories,
    loading,
    error,
    byId,
    activeCategory,
    fetchCategories,
    fetchList,
    fetchById,
    setQuery,
    setCategory,
    setSort,
    setPage,
  }
})
