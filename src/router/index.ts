import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/ProfilePage.vue') },
  { path: '/feed', component: () => import('../pages/Feed.vue') },
  { path: '/network', component: () => import('../pages/Network.vue') },
  { path: '/jobs', component: () => import('../pages/Jobs.vue') },
  { path: '/chat', component: () => import('../pages/Chat.vue') },
  { path: '/notices', component: () => import('../pages/Notices.vue') },
  { path: '/jobsDetail/:jobId', component: () => import('../pages/JobsDetail.vue') },
  { path: '/login', component: () => import('../pages/Login.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router