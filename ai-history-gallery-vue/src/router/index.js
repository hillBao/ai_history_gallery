import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/App.vue')
  },
  {
    path: '/demo',
    name: 'DrawerDemo',
    component: () => import('@/views/DrawerDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 