import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cats',
      name: 'cats',
      component: () => import('../views/CatsView.vue'),
    },
    {
      path: '/dogs',
      name: 'dogs',
      component: () => import('../views/DogsView.vue'),
    },

    
    
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
