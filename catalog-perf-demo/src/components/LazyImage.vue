<template>
  <div ref="imgContainer" class="relative overflow-hidden bg-gray-200">
    <img
      v-if="isInView"
      :src="src"
      :alt="alt"
      :class="['w-full h-full object-cover transition-opacity duration-300', { 'opacity-0': !isLoaded, 'opacity-100': isLoaded }]"
      @load="handleLoad"
    />
    <div v-if="!isLoaded" class="absolute inset-0 animate-pulse bg-gray-300"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLazyImage } from '../composables/useLazyImage'

defineProps({
  src: String,
  alt: String
})

const imgContainer = ref(null)
const { isLoaded, isInView, handleLoad } = useLazyImage(imgContainer)
</script>
