<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">🐶 Dog Images</h2>
    <button @click="fetchDogImage" :disabled="loading" class="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4">
      Get New Image
    </button>
    <div v-if="dogImage" class="bg-white rounded-lg shadow p-6">
      <img :src="dogImage" alt="Random dog" class="w-full rounded-lg" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePetsStore } from '@/stores/pets'

const store = usePetsStore()
const { dogImage, loading } = storeToRefs(store)
const { fetchDogImage } = store
</script>
