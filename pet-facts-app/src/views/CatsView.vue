<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">🐱 Cat Facts</h2>
    <button @click="fetchCatFact" :disabled="loading" class="bg-orange-500 text-white px-6 py-3 rounded-lg mb-4">
      Get New Fact
    </button>
    <div v-if="catFact" class="bg-white rounded-lg shadow p-6">
      <p class="text-gray-700">{{ catFact }}</p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePetsStore } from '@/stores/pets'

const store = usePetsStore()
const { catFact, loading } = storeToRefs(store)
const { fetchCatFact } = store
</script>
