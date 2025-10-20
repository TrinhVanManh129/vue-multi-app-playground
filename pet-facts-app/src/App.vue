<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
    <header class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-4xl">🐾</div>
            <h1 class="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pet Facts App
            </h1>
          </div>
          <nav class="flex gap-2">
            <RouterLink 
              to="/" 
              class="px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              active-class="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              exact-active-class="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
            >
              Home
            </RouterLink>
            <RouterLink 
              to="/about" 
              class="px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              active-class="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
            >
              About
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>
    <main class="max-w-7xl mx-auto px-6 py-10">
      <RouterView />
    </main>
  </div>
</template>
