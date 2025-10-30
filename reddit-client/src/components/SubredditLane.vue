<template>
  <div class="min-w-[350px] max-w-[400px] bg-white rounded-lg shadow-lg flex flex-col max-h-[calc(100vh-180px)]">
    <div class="bg-orange-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
      <h2 class="text-xl font-semibold">r/{{ subreddit }}</h2>
      <button
        @click="$emit('remove', subreddit)"
        class="w-7 h-7  bg-white/20 hover:bg-white/30 transition text-xl leading-none"
        title="Remove"
      >
      &times;
      </button>
    </div>
    <div class="flex-1 overflow-y-auto p-4">
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="w-10 h-10 border-4 border-gray-200 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-6 rounded-lg text-center">
        <strong class="block mb-2 text-lg">❌ Lỗi</strong>
        <p class="text-base">{{ error }}</p>
      </div>
      <div v-else-if="posts.length === 0" class="text-center py-12 text-gray-500">
        No posts found
      </div>
      <div v-else class="space-y-3">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PostCard from './PostCard.vue'

const props = defineProps({
  subreddit: {
    type: String,
    required: true
  }
})

defineEmits(['remove'])

const loading = ref(false)
const error = ref(null)
const posts = ref([])

const fetchPosts = async () => {
  loading.value = true
  error.value = null

  try {
    const redditUrl = `https://www.reddit.com/r/${props.subreddit}.json`
    const { data } = await axios.get(`https://cors.eu.org/${redditUrl}`)
    
    if (data?.data?.children) {
      posts.value = data.data.children.map(child => child.data)
    } else {
      throw new Error('Invalid response')
    }
  } catch (err) {
    console.error('Reddit API Error:', err)
    if (err.response?.status === 404) {
      error.value = 'Không tìm thấy subreddit này. Vui lòng kiểm tra lại tên.'
    } else if (err.message?.includes('Network Error')) {
      error.value = 'Lỗi kết nối mạng. Vui lòng thử lại sau.'
    } else if (err.message?.includes('Invalid response')) {
      error.value = 'Không thể tải dữ liệu từ Reddit. Proxy có thể bị lỗi.'
    } else {
      error.value = 'Không thể tải bài viết. Vui lòng thử lại sau.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})
</script>
