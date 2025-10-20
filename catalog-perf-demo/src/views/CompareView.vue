<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">So sánh sản phẩm</h1>
    <div class="mb-6">
      <label class="block mb-2 font-semibold">Chọn sản phẩm để so sánh:</label>
      <div class="flex gap-2">
        <select
          v-model="selectedIds[0]"
          class="flex-1 p-2 border rounded"
        >
          <option :value="null">Chọn sản phẩm 1</option>
          <option v-for="p in productsStore.products" :key="p.id" :value="p.id">
            {{ p.title }}
          </option>
        </select>
        <select
          v-model="selectedIds[1]"
          class="flex-1 p-2 border rounded"
        >
          <option :value="null">Chọn sản phẩm 2</option>
          <option v-for="p in productsStore.products" :key="p.id" :value="p.id">
            {{ p.title }}
          </option>
        </select>
        <select
          v-model="selectedIds[2]"
          class="flex-1 p-2 border rounded"
        >
          <option :value="null">Chọn sản phẩm 3</option>
          <option v-for="p in productsStore.products" :key="p.id" :value="p.id">
            {{ p.title }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="selectedProducts.length > 0" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="product in selectedProducts"
        :key="product.id"
        class="border rounded-lg p-4 space-y-4 max-w-md mx-auto w-full"
      >
        <img :src="product.imageUrl" :alt="product.title" class="w-full h-48 object-cover rounded" />
        <h3 class="font-bold text-lg">{{ product.title }}</h3>
        
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">ID:</span>
            <span class="font-semibold">#{{ product.id }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Giá:</span>
            <span class="font-bold text-green-600">${{ product.price }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Danh mục:</span>
            <span>{{ product.category }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Tồn kho:</span>
            <span>{{ product.stock }}</span>
          </div>
        </div>

        <router-link
          :to="`/product/${product.id}`"
          class="block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Xem chi tiết
        </router-link>
      </div>
    </div>

    <div v-else class="text-center py-12 text-gray-500">
      Chọn ít nhất 1 sản phẩm để so sánh
    </div>

    <div v-if="comparisonStats" class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 class="font-bold mb-3">Thống kê so sánh (Computed với Memoization):</h3>
      <div class="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p class="text-gray-600">Giá thấp nhất:</p>
          <p class="font-bold text-green-600">${{ comparisonStats.minPrice }}</p>
        </div>
        <div>
          <p class="text-gray-600">Giá cao nhất:</p>
          <p class="font-bold text-red-600">${{ comparisonStats.maxPrice }}</p>
        </div>
        <div>
          <p class="text-gray-600">Giá trung bình:</p>
          <p class="font-bold text-blue-600">${{ comparisonStats.avgPrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()
const selectedIds = ref([null, null, null])

const selectedProducts = computed(() => {
  return selectedIds.value
    .filter(id => id !== null)
    .map(id => productsStore.products.find(p => p.id === id))
    .filter(Boolean)
})

const comparisonStats = computed(() => {
  if (selectedProducts.value.length === 0) return null

  const prices = selectedProducts.value.map(p => p.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const avgPrice = (prices.reduce((sum, p) => sum + p, 0) / prices.length).toFixed(2)

  return { minPrice, maxPrice, avgPrice }
})

onMounted(async () => {
  if (productsStore.products.length === 0) {
    await productsStore.fetchProducts()
  }
})
</script>
