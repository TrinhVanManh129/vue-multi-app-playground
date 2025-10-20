import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
  { path: '/product/:id', name: 'product', component: () => import('@/pages/ProductDetailPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
