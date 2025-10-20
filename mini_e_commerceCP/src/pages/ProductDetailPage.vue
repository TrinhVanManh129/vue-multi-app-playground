<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
const route = useRoute()
const store = useProductsStore()
const product = ref(null)
const currentImage = ref('')
const loaded = ref(false)
onMounted(async () => {
  try {
    product.value = await store.fetchById(route.params.id)
    currentImage.value = product.value.thumbnail || (product.value.images && product.value.images[0])
  } catch (error) {
    console.error(error)
  } finally {
    loaded.value = true
  }
})
</script>
<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <button 
      @click="$router.back()"
      class="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      <span class="font-medium">Quay lại</span>
    </button>
    <div v-if="product" class="grid md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <div class="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
          <img 
            :src="currentImage" 
            :alt="product.title" 
            class="w-full h-full object-cover"
          />
        </div>   
      </div>
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.title }}</h1>
          <div class="text-sm text-gray-600 mb-4">
            <span class="font-medium">Rating:</span> {{ product.rating || 5 }} ⭐
          </div>
        </div>
        <div class="border-t border-b py-6">
          <div class="flex items-baseline gap-3">
            <span class="text-4xl font-bold text-blue-600">${{ product.price }}</span>
          </div>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 mb-2">Mô tả sản phẩm</h3>
          <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
        </div>
        <div v-if="product.brand" class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Thương hiệu:</span>
          <span class="text-sm font-semibold text-gray-900">{{ product.brand }}</span>
        </div>
      </div>
    </div>
    <div v-else-if="loaded" class="text-center py-16">
      <h3 class="text-lg font-medium text-gray-900">Không tìm thấy sản phẩm</h3>
    </div>
  </div>
</template>

