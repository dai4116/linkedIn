<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-5 gap-6">
      <aside class="md:col-span-1 space-y-6">
        <div class="bg-white rounded-lg overflow-hidden shadow-sm">
          <div class="divide-y divide-gray-200 text-sm">
            <a href="#" class="block w-full flex items-center px-4 py-3
             border-l-4 border-blue-600 bg-blue-50
             text-blue-700 font-semibold">
              Notifications
            </a>

            <a href="#" class="block w-full flex items-center px-4 py-3
             text-gray-600 hover:bg-gray-100 transition-colors">
              Notification Settings
            </a>
          </div>
        </div>

        <Card as="div" class="p-6">
          <h3 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Your Dashboard</h3>
          <div v-if="loading" class="space-y-6 animate-pulse">
            <div v-for="i in 3" :key="i" class="space-y-2">
              <div class="h-8 bg-gray-200 rounded w-1/2"></div>
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
          <div v-else class="space-y-6">
            <div>
              <p class="text-4xl font-bold text-blue-600">367</p>
              <p class="text-sm text-gray-500">views today</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-blue-600">15</p>
              <p class="text-sm text-gray-500">post views</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-blue-600">9</p>
              <p class="text-sm text-gray-500">search appearances</p>
            </div>
          </div>
        </Card>
      </aside>

      <main class="md:col-span-4 space-y-8">
        <!-- 錯誤提示 -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span class="block sm:inline">{{ error }}</span>
          <button @click="loadNotifications" class="ml-4 underline font-bold">Retry</button>
        </div>

        <section>
          <h3 class="flex items-center justify-center text-gray-500 uppercase text-xs mb-4">Recent</h3>
          <ul class="space-y-4">
            <template v-if="loading">
              <Card v-for="i in 3" :key="i" as="li" class="p-4 shadow-sm flex items-center justify-between animate-pulse">
                <div class="flex items-center space-x-4 flex-1">
                  <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </Card>
            </template>
            <template v-else>
              <Card v-for="note in recentNotes" :key="note.id" as="li" class="p-4 shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div class="flex items-center space-x-4">
                  <img :src="note.avatar" alt="icon" class="w-10 h-10 rounded-full bg-gray-100" />
                  <div>
                    <p class="text-sm text-gray-800">
                      <span v-html="note.content"></span>
                    </p>
                    <p class="text-xs text-gray-400 mt-1">{{ note.time }}</p>
                  </div>
                </div>
                <button class="text-gray-400 hover:text-gray-600 p-1">⋯</button>
              </Card>
              <div v-if="recentNotes.length === 0" class="text-center py-6 text-gray-500 text-sm">
                No recent notifications.
              </div>
            </template>
          </ul>
        </section>

        <section>
          <h3 class="flex items-center justify-center text-gray-500 uppercase text-xs mb-4">Earlier</h3>
          <ul class="space-y-4">
            <template v-if="loading">
              <Card v-for="i in 2" :key="i" as="li" class="p-4 shadow-sm flex items-center justify-between animate-pulse">
                <div class="flex items-center space-x-4 flex-1">
                  <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/5"></div>
                  </div>
                </div>
              </Card>
            </template>
            <template v-else>
              <Card v-for="note in earlierNotes" :key="note.id" as="li" class="p-4 shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div class="flex items-center space-x-4">
                  <img :src="note.avatar" alt="avatar" class="w-10 h-10 rounded-full bg-gray-100" />
                  <div>
                    <p class="text-sm text-gray-800">
                      <span v-html="note.content"></span>
                    </p>
                    <p class="text-xs text-gray-400 mt-1">{{ note.time }}</p>
                  </div>
                </div>
                <button class="text-gray-400 hover:text-gray-600 p-1">⋯</button>
              </Card>
            </template>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from '../components/common/Card.vue'

interface Notification {
  id: number
  content: string
  time: string
  avatar: string
}

const loading = ref(false)
const error = ref<string | null>(null)
const recentNotes = ref<Notification[]>([])
const earlierNotes = ref<Notification[]>([])

async function loadNotifications() {
  loading.value = true
  error.value = null
  try {
    await new Promise(res => setTimeout(res, 700))
    
    recentNotes.value = [
      {
        id: 1,
        content: '<span class="font-semibold">You appeared in 9 searches</span> this week',
        time: '3 hours',
        avatar: 'https://randomuser.me/api/portraits/women/47.jpg'
      },
      {
        id: 2,
        content: '<span class="font-semibold">Audrey Alexander and 10 others</span> viewed your profile',
        time: '9 hours',
        avatar: 'https://randomuser.me/api/portraits/women/52.jpg'
      },
      {
        id: 3,
        content: '<span class="font-semibold">Eduardo Russel and 4 others</span> liked your post',
        time: '12 hours',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    ]

    earlierNotes.value = [
      {
        id: 4,
        content: '<span class="font-semibold">We found jobs</span> that you may be interested',
        time: '2 days ago',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        id: 5,
        content: '<span class="font-semibold">Kyle Fisher and 17 others</span> viewed your profile',
        time: '3 days ago',
        avatar: 'https://randomuser.me/api/portraits/men/15.jpg'
      }
    ]
  } catch (e) {
    error.value = 'Failed to load notifications.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadNotifications()
})
</script>
