import { createRouter, createWebHistory } from 'vue-router'

const CatalogView = () => import('../views/CatalogView.vue')
const ProductDetailView = () => import('../views/ProductDetailView.vue')
const CartView = () => import('../views/CartView.vue')
const CompareView = () => import('../views/CompareView.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'catalog', 
      component: CatalogView 
    },
    { 
      path: '/product/:id', 
      name: 'product-detail', 
      component: ProductDetailView 
    },
    { 
      path: '/cart', 
      name: 'cart', 
      component: CartView 
    },
    { 
      path: '/compare', 
      name: 'compare', 
      component: CompareView 
    }
  ]
})

export default router
