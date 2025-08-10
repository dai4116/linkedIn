import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../pages/Feed.vue'
import Network from '../pages/Network.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
  { path: '/', component: ProfilePage },
  { path: '/feed', component: Feed },
  { path: '/Network', component: Network },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router