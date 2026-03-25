import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import router from './router';
import { useUserStore } from './stores/user';
import { getUserById } from './services/fakeApi';

async function initApp() {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.use(router)

  // Auto login logic
  const userStore = useUserStore(pinia)
  const userId = localStorage.getItem('userId')
  if (userId) {
    const user = await getUserById(Number(userId))
    if (user) {
      userStore.setUser(user)
    }
  }

  app.mount('#app')
}

void initApp()