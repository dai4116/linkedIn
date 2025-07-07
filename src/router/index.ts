import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../pages/Feed.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
  { path: '/', component: ProfilePage },
  { path: '/feed', component: Feed },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router