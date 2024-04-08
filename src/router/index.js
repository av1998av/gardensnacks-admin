import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import OrdersPage from '../views/OrdersPage.vue'
import ProductsPage from '../views/ProductsPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersPage
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsPage
    }
  ]
})

export default router
