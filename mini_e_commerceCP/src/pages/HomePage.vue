<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Sản phẩm nổi bật</h1>
      <p class="text-gray-600">Khám phá bộ sưu tập sản phẩm chất lượng cao</p>
    </div>
    <div class="mb-6 bg-white rounded-xl shadow-sm border p-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              v-model="search" 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..." 
              class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              @input="onSearch" 
            />
          </div>
        </div> 
        <div class="flex gap-4">
          <div class="flex-1 lg:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
            <select 
              v-model="category" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Tất cả</option>
              <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="flex-1 lg:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2">Sắp xếp</label>
            <select 
              v-model="sort" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Mặc định</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
              <option value="title-asc">Tên: A-Z</option>
              <option value="title-desc">Tên: Z-A</option>
            </select>
          </div>
        </div>
      </div>   
      <div class="mt-4 flex items-center justify-between text-sm">
        <div class="text-gray-600">
          Tìm thấy <span class="font-semibold text-gray-900">{{ total }}</span> sản phẩm
        </div>
        <button 
          v-if="search || category || sort"
          @click="resetFilters"
          class="text-blue-600 hover:text-blue-700 font-medium"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
    <div v-if="loading || initialLoad" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="aspect-square bg-gray-200 animate-pulse"></div>
        <div class="p-4 space-y-3">
          <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          <div class="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
    </div>
    <TransitionGroup 
      v-else
      name="list" 
      tag="div" 
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProductCard v-for="p in items" :key="p.id" :product="p" />
    </TransitionGroup>
    <div v-if="!loading && items.length === 0" class="text-center py-16">
      <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">Không tìm thấy sản phẩm</h3>
      <p class="mt-2 text-gray-500">Thử tìm kiếm với từ khóa khác</p>
    </div>
    <div v-if="total > limit && !loading" class="mt-8 flex items-center justify-center gap-2">
      <button 
        class="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
        :disabled="page === 1" 
        @click="goto(page - 1)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div class="flex items-center gap-2">
        <button
          v-for="p in visiblePages"
          :key="p"
          @click="goto(p)"
          class="px-4 py-2 rounded-lg font-medium transition-colors"
          :class="p === page 
            ? 'bg-blue-600 text-white' 
            : 'border border-gray-300 hover:bg-gray-50'"
        >
          {{ p }}
        </button>
      </div>
      <button 
        class="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
        :disabled="page >= maxPage" 
        @click="goto(page + 1)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const store = useProductsStore()
const { items, total, limit, loading, categories } = storeToRefs(store)
const search = ref('')
const category = ref('')
const sort = ref('')
const initialLoad = ref(true)
const page = computed(() => Math.floor(store.skip / store.limit) + 1)
const maxPage = computed(() => Math.ceil(store.total / store.limit))
const visiblePages = computed(() => {
  const current = page.value
  const max = maxPage.value
  const pages = []

  let start = Math.max(1, current - 2)
  let end = Math.min(max, current + 2)
  
  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(max, start + 4)
    } else if (end === max) {
      start = Math.max(1, end - 4)
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

let searchTimeout

function onSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    store.setQuery(search.value)
    store.fetchList()
  }, 400)
}

function applySort() {
  const [s, o] = sort.value.split('-')
  store.setSort(s || '', o || 'asc')
  store.fetchList()
}

function applyCategory() {
  store.setCategory(category.value)
  store.fetchList()
}

function goto(p) {
  store.setPage(p)
  store.fetchList()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function resetFilters() {
  search.value = ''
  category.value = ''
  sort.value = ''
  store.setQuery('')
  store.setCategory('')
  store.setSort('', 'asc')
  store.fetchList()
}
watch(sort, applySort)
watch(category, applyCategory)

onMounted(async () => {
  await store.fetchCategories()
  await store.fetchList()
  initialLoad.value = false
})
</script>
