<template>
  <div
    @click="openPost"
    class="border-b border-gray-200 pb-3 cursor-pointer hover:bg-gray-50 transition p-3 rounded-lg"
  >
    <h3 class="font-semibold text-gray-900 mb-2 leading-tight">
      {{ post.title }}
    </h3>
    <div class="flex gap-4 text-sm text-gray-600">
      <span class="text-orange-600">u/{{ post.author }}</span>
      <span class="font-semibold">↑ {{post.score}} points</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const openPost = () => {
  window.open(`https://www.reddit.com${props.post.permalink}`, '_blank')
}


</script>
