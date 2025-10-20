import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchAllForVirtual, fetchProductById } from '../services/products'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)
  const cache = ref(new Map())
  const productCache = ref(new Map())

  const totalProducts = computed(() => products.value.length)
  
  const getProductById = computed(() => {
    return (id) => {
      // Đầu tiên tìm trong products array
      const product = products.value.find(p => p.id === parseInt(id))
      if (product) return product
      
      // Nếu không có, tìm trong cache chi tiết
      return productCache.value.get(parseInt(id))
    }
  })

  async function fetchProducts(query = '') {
    const cacheKey = query || '__all__'
    
    if (cache.value.has(cacheKey)) {
      products.value = cache.value.get(cacheKey)
      return
    }

    loading.value = true
    error.value = null
    
    try {
      const data = await fetchAllForVirtual({ q: query })
      products.value = data
      cache.value.set(cacheKey, data)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchProductDetail(id) {
    if (productCache.value.has(parseInt(id))) {
      return productCache.value.get(parseInt(id))
    }

    loading.value = true
    error.value = null
    
    try {
      const product = await fetchProductById(id)
      if (product) {
        productCache.value.set(parseInt(id), product)
      }
      return product
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  function clearCache() {
    cache.value.clear()
    productCache.value.clear()
  }

  return {
    products,
    loading,
    error,
    totalProducts,
    getProductById,
    fetchProducts,
    fetchProductDetail,
    clearCache
  }
})
