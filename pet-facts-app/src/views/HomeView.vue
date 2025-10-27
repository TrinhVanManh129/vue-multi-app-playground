<template>
  <div class="py-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-5xl font-extrabold mb-3">
          <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            🐱 Pet Facts & Fun 🐶
          </span>
        </h1>
        <p class="text-lg text-gray-600">Discover amazing facts, adorable images, and funny jokes about pets!</p>
      </div>
      <!-- Stats Panel -->
      <StatsPanel :stats="{ loaded: hasData ? 3 : 0 }" :status="loadingMessage" class="mb-6" />
      <!-- Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button 
          @click="fetchCatFact" 
          :disabled="loading" 
          class="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="text-2xl block mb-1">🐱</span>
          Get Cat Fact
        </button>
        <button 
          @click="fetchDogImage" 
          :disabled="loading" 
          class="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="text-2xl block mb-1">🐶</span>
          Get Dog Image
        </button>
        <button 
          @click="fetchJoke" 
          :disabled="loading" 
          class="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="text-2xl block mb-1">😄</span>
          Get Joke
        </button>
      </div>
      <button 
        @click="fetchAll" 
        :disabled="loading" 
        class="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        <span class="text-2xl mr-2">🔄</span>
        Refresh All
      </button>
      <!-- Cat Fact -->
      <PetCard v-if="catFact" icon="🐱" title="Cat Fact" class="mb-4">
        <p class="text-gray-700">{{ catFact }}</p>
      </PetCard>

      <!-- Dog Image -->
      <PetCard v-if="dogImage" icon="🐶" title="Dog Image" class="mb-4">
        <img :src="dogImage" alt="Random dog" class="w-full rounded-lg" />
      </PetCard>

      <!-- Joke -->
      <PetCard v-if="joke" icon="😄" title="Joke" class="mb-4">
        <p class="text-gray-700 whitespace-pre-line">{{ joke }}</p>
      </PetCard>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePetsStore } from '@/stores/pets'
import PetCard from '@/components/PetCard.vue'
import StatsPanel from '@/components/StatsPanel.vue'

const petsStore = usePetsStore()

// Using storeToRefs to keep reactivity
const { catFact, dogImage, joke, loading, loadingMessage, hasData } = storeToRefs(petsStore)

// Actions
const { fetchCatFact, fetchDogImage, fetchJoke, fetchAll } = petsStore


</script>
