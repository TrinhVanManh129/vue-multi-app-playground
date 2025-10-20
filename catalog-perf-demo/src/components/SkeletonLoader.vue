<template>
  <div class="animate-pulse">
    <div v-if="type === 'card'" class="space-y-3">
      <div class="h-48 bg-gray-300 rounded"></div>
      <div class="h-4 bg-gray-300 rounded w-3/4"></div>
      <div class="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
    <div v-else-if="type === 'list'" class="flex items-center gap-3 h-14 px-4">
      <div class="w-10 h-10 bg-gray-300 rounded"></div>
      <div class="flex-1 space-y-2">
        <div class="h-3 bg-gray-300 rounded w-3/4"></div>
        <div class="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
    <div v-else-if="type === 'detail'" class="space-y-4">
      <div class="h-64 bg-gray-300 rounded"></div>
      <div class="h-6 bg-gray-300 rounded w-3/4"></div>
      <div class="h-4 bg-gray-300 rounded"></div>
      <div class="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  type: {
    type: String,
    default: 'card',
    validator: (val) => ['card', 'list', 'detail'].includes(val)
  }
})
</script>
