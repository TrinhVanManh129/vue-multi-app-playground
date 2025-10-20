<template>
  <div class="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg p-6 text-white">
    <h3 class="text-xl font-bold mb-4">📊 Stats</h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="text-center">
        <div class="text-3xl font-bold">{{ stats.loaded }}</div>
        <div class="text-sm opacity-90">Items Loaded</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold">{{ status }}</div>
        <div class="text-sm opacity-90">Status</div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  stats: {
    type: Object,
    default: () => ({ loaded: 0 })
  },
  status: {
    type: String,
    default: 'Ready'
  }
})
</script>
