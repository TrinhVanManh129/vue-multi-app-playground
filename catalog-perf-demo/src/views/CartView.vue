<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Giỏ hàng</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <p class="text-xl text-gray-500 mb-4">Giỏ hàng trống</p>
      <router-link to="/" class="text-blue-600 hover:underline">
        Tiếp tục mua sắm
      </router-link>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in cartStore.items"
        :key="item.id"
        class="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
      >
        <img :src="item.imageUrl" :alt="item.title" class="w-20 h-20 rounded object-cover" />
        
        <div class="flex-1">
          <router-link :to="`/product/${item.id}`" class="font-semibold hover:text-blue-600">
            {{ item.title }}
          </router-link>
          <p class="text-gray-600">${{ item.price }}</p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="decreaseQuantity(item)"
            class="w-8 h-8 border rounded hover:bg-gray-100"
          >
            -
          </button>
          <input
            :value="item.quantity"
            @input="e => updateQuantityDebounced(item.id, parseInt(e.target.value) || 1)"
            type="number"
            min="1"
            class="w-16 text-center border rounded"
          />
          <button
            @click="increaseQuantity(item)"
            class="w-8 h-8 border rounded hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <div class="text-right min-w-[80px]">
          <p class="font-bold">${{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>

        <button
          @click="cartStore.removeFromCart(item.id)"
          class="text-red-600 hover:text-red-800 px-2"
        >
          ✕
        </button>
      </div>

      <div class="border-t pt-4 space-y-3">
        <div class="flex justify-between text-lg">
          <span>Tổng số lượng:</span>
          <span class="font-semibold">{{ cartStore.totalItems }} sản phẩm</span>
        </div>
        <div class="flex justify-between text-2xl font-bold">
          <span>Tổng tiền:</span>
          <span class="text-green-600">${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>

        <div class="flex gap-3">
          <button
            @click="cartStore.clearCart"
            class="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Xóa giỏ hàng
          </button>
          <button class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { debounce } from '../composables/useDebounce'

const cartStore = useCartStore()

const updateQuantityDebounced = debounce((id, quantity) => {
  cartStore.updateQuantity(id, quantity)
}, 500)

const increaseQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.quantity + 1)
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1)
  }
}
</script>
