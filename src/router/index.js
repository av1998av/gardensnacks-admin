import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import OrdersPage from '../views/OrdersPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'orders',
      component: OrdersPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})

export default router
