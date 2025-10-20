<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <h1 class="text-3xl font-bold text-orange-600 mb-4">Reddit Client</h1>
        <div class="flex gap-2 max-w-lg">
          <input
            v-model="newSubreddit"
            @keypress.enter="addSubreddit"
            type="text"
            placeholder="Enter subreddit name (e.g., javascript)"
            class="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
          <button
            @click="addSubreddit"
            class="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
          >
            Add Subreddit
          </button>
        </div>
      </div>
    </header>
    <main class="container mx-auto px-4 py-4">
      <div v-if="subreddits.length === 0" class="text-center py-20">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Welcome to Reddit Client!</h2>
        <p class="text-gray-600 mb-2">Add your first subreddit above to get started.</p>
        <p class="text-sm text-gray-500">Try: javascript, programming, webdev, reactjs</p>
      </div>
      <div v-else class="flex gap-4 overflow-x-auto pb-4">
        <SubredditLane
          v-for="subreddit in subreddits"
          :key="subreddit"
          :subreddit="subreddit"
          @remove="removeSubreddit"
        />
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import SubredditLane from './components/SubredditLane.vue'
const STORAGE_KEY = 'reddit-client-subreddits'
const subreddits = ref([])
const newSubreddit = ref('')
const loadFromStorage = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      subreddits.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to load subreddits:', e)
    }
  }
}
const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subreddits.value))
}
const addSubreddit = () => {
  const sub = newSubreddit.value.trim().toLowerCase()
  if (!sub) {
    alert('Vui lòng nhập tên subreddit')
    return
  }

  if (!/^[a-zA-Z0-9_]+$/.test(sub)) {
    alert('Tên subreddit không hợp lệ. Chỉ được dùng chữ, số và dấu gạch dưới.')
    return
  }

  if (subreddits.value.includes(sub)) {
    alert('Subreddit này đã được thêm rồi!')
    return
  }

  subreddits.value.push(sub)
  saveToStorage()
  newSubreddit.value = ''
}

const removeSubreddit = (subreddit) => {
  subreddits.value = subreddits.value.filter(s => s !== subreddit)
  saveToStorage()
}

onMounted(() => {
  loadFromStorage()
})
</script>
