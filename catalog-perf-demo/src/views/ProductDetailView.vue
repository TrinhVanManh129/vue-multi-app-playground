<template>
  <div class="max-w-4xl mx-auto p-4">
    <button @click="$router.back()" class="mb-4 text-blue-600 hover:underline">
      ← Quay lại
    </button>
    <SkeletonLoader v-if="loading" type="detail" />

    <div v-else-if="product" class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <LazyImage :src="product.imageUrl" :alt="product.title" class="w-full h-96 rounded-lg" />
      </div>

      <div class="space-y-4">
        <h1 class="text-3xl font-bold">{{ product.title }}</h1>
        <p class="text-gray-600">ID: #{{ product.id }}</p>
        <p class="text-gray-600">Danh mục: {{ product.category }}</p>
        
        <div class="flex items-center gap-4">
          <span class="text-3xl font-bold text-green-600">${{ product.price }}</span>
          <span class="text-gray-500">Còn {{ product.stock }} sản phẩm</span>
        </div>

        <div class="flex gap-3">
          <button
            @click="handleAddToCart"
            :disabled="isInCart"
            class="flex-1 px-6 py-3 rounded-lg font-semibold transition-colors"
            :class="isInCart ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'"
          >
            {{ isInCart ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ hàng' }}
          </button>
          
          <button
            @click="$router.push('/compare')"
            class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            So sánh
          </button>
        </div>

        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold mb-2">Thông tin sản phẩm</h3>
          <p class="text-gray-700">{{ product.description || 'Không có mô tả' }}</p>
          
          <div class="mt-4 space-y-2 text-sm">
            <div v-if="product.brand">
              <span class="font-semibold">Thương hiệu:</span> {{ product.brand }}
            </div>
            <div v-if="product.rating">
              <span class="font-semibold">Đánh giá:</span> 
              <span class="text-yellow-500">★</span> {{ product.rating }}/5
            </div>
            <div v-if="product.discountPercentage">
              <span class="font-semibold">Giảm giá:</span> {{ product.discountPercentage }}%
            </div>
            <div v-if="product.warrantyInformation">
              <span class="font-semibold">Bảo hành:</span> {{ product.warrantyInformation }}
            </div>
            <div v-if="product.shippingInformation">
              <span class="font-semibold">Vận chuyển:</span> {{ product.shippingInformation }}
            </div>
            <div v-if="product.returnPolicy">
              <span class="font-semibold">Chính sách đổi trả:</span> {{ product.returnPolicy }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-xl text-gray-500">Không tìm thấy sản phẩm</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import LazyImage from '../components/LazyImage.vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const product = computed(() => productsStore.getProductById(route.params.id))
const loading = computed(() => productsStore.loading)
const isInCart = computed(() => product.value && cartStore.isInCart(product.value.id))

const handleAddToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}

onMounted(async () => {
  const productId = parseInt(route.params.id)
  
  // Đầu tiên thử fetch chi tiết sản phẩm
  const productDetail = await productsStore.fetchProductDetail(productId)
  
  // Nếu không có trong cache chi tiết, fetch all products và tìm trong đó
  if (!productDetail && productsStore.products.length === 0) {
    await productsStore.fetchProducts()
  }
})
</script>
