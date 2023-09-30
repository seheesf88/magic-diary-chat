import { createRouter, createWebHistory } from 'vue-router'  

const routes = [
  {
    path: '/',
    name: 'MagicChat',
    component: () => import('./components/MagicChat.vue')
  },
  {
    path: '/api',
    name: 'CreateApi',
    component: () => import('./components/CreateApi.vue')
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router
