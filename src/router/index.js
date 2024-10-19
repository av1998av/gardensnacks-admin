import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import OrdersPage from '../views/OrdersPage.vue'
import ProductsPage from '../views/ProductsPage.vue';
import DiscountsPage from '../views/DiscountsPage.vue';
import MessageGroupPage from '../views/MessageGroupPage.vue';
import UsersPage from '../views/UsersPage.vue';
import JobsPage from '../views/JobsPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/users',
      name: 'users',
      component: UsersPage
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
    },
    {
      path: '/discounts',
      name: 'discounts',
      component: DiscountsPage
    },
    {
      path: '/messagGroups',
      name: 'messagGroups',
      component: MessageGroupPage
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsPage
    }
  ]
})

export default router
