<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar/>
    <main>
      <Suspense>
        <template #default>
          <RouterView />
        </template>
        <template #fallback>
          <div class="max-w-6xl mx-auto px-4 py-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="i in 8" :key="i" class="h-64 bg-gray-100 animate-pulse rounded"></div>
            </div>
          </div>
        </template>
      </Suspense>
    </main>
  </div>
</template>

<style scoped>
main { min-height: 70vh; }
</style>
