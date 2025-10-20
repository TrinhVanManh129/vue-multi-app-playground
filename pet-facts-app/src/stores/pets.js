import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { petAPI } from '@/services/api'

export const usePetsStore = defineStore('pets', () => {
  // State
  const catFact = ref(null)
  const dogImage = ref(null)
  const joke = ref(null)
  const loading = ref(false)
  const error = ref(null)
  // Getters
  const hasData = computed(() => {
    return !!(catFact.value || dogImage.value || joke.value)
  })
  
  const loadingMessage = computed(() => {
    return loading.value ? 'Loading...' : 'Ready'
  })

  // Actions
  async function fetchCatFact() {
    loading.value = true
    error.value = null
    try {
      const response = await petAPI.getCatFact()
      catFact.value = response.data.fact
    } catch (err) {
      error.value = 'Failed to fetch cat fact'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchDogImage() {
    loading.value = true
    error.value = null
    try {
      const response = await petAPI.getDogImage()
      dogImage.value = response.data.message
    } catch (err) {
      error.value = 'Failed to fetch dog image'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchJoke() {
    loading.value = true
    error.value = null
    try {
      const response = await petAPI.getJoke()
      if (response.data.type === 'single') {
        joke.value = response.data.joke
      } else {
        joke.value = `${response.data.setup}\n${response.data.delivery}`
      }
    } catch (err) {
      error.value = 'Failed to fetch joke'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchAll() {
    await Promise.all([
      fetchCatFact(),
      fetchDogImage(),
      fetchJoke()
    ])
  }

  // Return everything to expose
  return {
    // State
    catFact,
    dogImage,
    joke,
    loading,
    error,
    // Getters
    hasData,
    loadingMessage,
    // Actions
    fetchCatFact,
    fetchDogImage,
    fetchJoke,
    fetchAll
  }
})
