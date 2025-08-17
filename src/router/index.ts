import { createRouter, createWebHistory } from 'vue-router'
import Chat from '../pages/Chat.vue'
import Feed from '../pages/Feed.vue'
import Jobs from '../pages/Jobs.vue'
import Network from '../pages/Network.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
  { path: '/', component: ProfilePage },
  { path: '/feed', component: Feed },
  { path: '/network', component: Network },
  { path: '/jobs', component: Jobs },
  { path: '/chat', component: Chat },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router