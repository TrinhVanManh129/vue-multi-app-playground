<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100">
    <router-link :to="`/product/${product.id}`" class="block">
      <div class="aspect-square bg-gray-100 overflow-hidden relative">
        <img 
          :src="product.thumbnail || (product.images && product.images[0])" 
          :alt="product.title" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      <div class="p-4">
        <h3 class="line-clamp-2 font-semibold text-gray-900 min-h-[3rem] text-sm leading-tight">
          {{ product.title }}
        </h3>
        <div class="mt-2 flex items-center gap-2">
          <div class="flex items-center gap-1">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-xs font-medium text-gray-700">{{ product.rating?.toFixed(1) || '5.0' }}</span>
          </div>
        </div>
        <div class="mt-3">
          <p class="text-lg font-bold text-blue-600">${{ product.price }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
defineProps({ 
  product: { type: Object, required: true } 
})
</script>
