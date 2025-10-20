<template>
  <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div class="flex items-center gap-2 mb-4">
      <span class="text-3xl">{{ icon }}</span>
      <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String
})
</script>
