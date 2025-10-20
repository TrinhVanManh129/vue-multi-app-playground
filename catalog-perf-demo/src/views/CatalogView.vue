<template>
  <div class="p-4 max-w-6xl mx-auto">
    <header v-once class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">Catalog Performance Demo</h1>
        <p class="text-gray-600">Debounce + Virtual List + Pinia + Lazy Load</p>
      </div>
      <div class="flex gap-3">
        <router-link to="/cart" class="relative px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          🛒 Giỏ hàng
          <span v-if="cartStore.totalItems > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {{ cartStore.totalItems }}
          </span>
        </router-link>
        <router-link to="/compare" class="px-4 py-2 border rounded hover:bg-gray-50">
          ⚖️ So sánh
        </router-link>
      </div>
    </header>
    <div class="mb-4 flex gap-3">
      <input
        v-model="q"
        @input="onSearch"
        placeholder="Tìm kiếm sản phẩm..."
        class="flex-1 p-2 border rounded"
      />
      <select v-model="selectedCategory" @change="onFilterChange" class="p-2 border rounded">
        <option value="">Tất cả danh mục</option>
        <option v-for="category in categories" :key="category.slug" :value="category.slug">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div v-if="productsStore.loading" class="space-y-2">
      <SkeletonLoader v-for="i in 8" :key="i" type="list" />
    </div>

    <div
      v-else
      ref="scrollContainer"
      class="border rounded"
      :style="{ height: viewportHeight + 'px', overflow: 'auto' }"
      @scroll="handleScroll"
    >
      <div :style="{ height: filteredProducts.length * rowHeight + 'px', position: 'relative' }">
        <div :style="{ transform: `translateY(${offset}px)` }">
          <div
            v-for="(p, i) in slice"
            :key="start + i"
            v-memo="[p.price, cartStore.isInCart(p.id)]"
            class="h-14 flex items-center px-4 border-b hover:bg-gray-50 gap-3 cursor-pointer"
            @click="$router.push(`/product/${p.id}`)"
          >
            <img :src="p.imageUrl" alt="thumb" class="w-10 h-10 rounded object-cover" />
            <strong class="w-24">#{{ p.id }}</strong>
            <span class="flex-1 truncate">{{ p.title }}</span>
            <span class="font-bold">${{ p.price }}</span>
            <button
              @click.stop="handleAddToCart(p)"
              :disabled="cartStore.isInCart(p.id)"
              class="px-3 py-1 text-sm rounded transition-colors"
              :class="cartStore.isInCart(p.id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'"
            >
              {{ cartStore.isInCart(p.id) ? '✓' : '+' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <footer class="mt-4 text-sm text-gray-600 flex justify-between">
      <span>Tổng: {{ filteredProducts.length }} | Đang render: {{ slice.length }}</span>
      <span>Cache hits: {{ productsStore.products.length }}</span>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { useVirtualList } from '../composables/useVirtualList'
import { debounce } from '../composables/useDebounce'
import SkeletonLoader from '../components/SkeletonLoader.vue'
import { fetchCategories } from '../services/products'
const productsStore = useProductsStore()
const cartStore = useCartStore()
const q = ref('')
const selectedCategory = ref('')
const categories = ref([])
const filteredProducts = computed(() => {
  let result = productsStore.products
  if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value)
  }
  return result
})

const { scrollTop, start, offset, slice, rowHeight, viewportHeight } = useVirtualList(filteredProducts, {
  rowHeight: 56,
  viewportHeight: 560,
  overscan: 6
})

const load = async () => {
  await productsStore.fetchProducts(q.value)
}

const onSearch = debounce(load, 300)

const onFilterChange = () => {
  scrollTop.value = 0
}

const handleAddToCart = (product) => {
  cartStore.addToCart(product)
}

const handleScroll = (e) => {
  scrollTop.value = e.target.scrollTop
}

onMounted(async () => {
  await load()
  categories.value = await fetchCategories()
})
</script>
