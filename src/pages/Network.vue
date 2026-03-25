<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
        <!-- Left menu -->
        <aside class="lg:col-span-1">
          <Card as="div">
            <div class="px-4 py-3 border-b flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="inline-block w-4 h-4 rounded-full bg-gray-800"></span>
                <span class="font-semibold text-sm">CONNECTIONS</span>
              </div>
              <span v-if="loading" class="w-8 h-4 bg-gray-200 animate-pulse rounded"></span>
              <span v-else class="text-sm text-gray-500">{{ totalConnections.toLocaleString() }}</span>
            </div>

            <nav class="py-2 text-sm">
              <button v-for="(item, i) in menuItems" :key="i" class="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div class="flex items-center gap-3">
                  <span class="w-1 h-5 rounded-sm" :class="i === 0 ? 'bg-blue-600' : 'bg-gray-200'"></span>
                  <span class="text-gray-700">{{ item.label }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span v-if="item.highlight" class="h-2 w-2 rounded-full bg-amber-400"></span>
                  <span v-if="loading" class="w-4 h-4 bg-gray-100 animate-pulse rounded"></span>
                  <span v-else class="text-gray-500">{{ item.count }}</span>
                </div>
              </button>
            </nav>
          </Card>
        </aside>

        <!-- Right content -->
        <main class="lg:col-span-2 space-y-6">
          <!-- 錯誤提示 -->
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span class="block sm:inline">{{ error }}</span>
            <button @click="loadData" class="ml-4 underline font-bold">Retry</button>
          </div>

          <!-- Invitations -->
          <Card as="section" class="overflow-hidden">
            <!-- Tabs -->
            <div class="flex">
              <button
                class="flex-1 px-4 py-3 text-sm font-semibold border-b transition-colors"
                :class="tab === 'received' ? 'text-blue-700 border-blue-600' : 'text-gray-500 border-transparent'"
                @click="tab = 'received'"
              >
                RECEIVED
              </button>
              <button
                class="flex-1 px-4 py-3 text-sm font-semibold border-b transition-colors"
                :class="tab === 'sent' ? 'text-blue-700 border-blue-600' : 'text-gray-500 border-transparent'"
                @click="tab = 'sent'"
              >
                SENT
              </button>
            </div>

            <div class="px-4 py-3 text-sm text-gray-500 border-b">
              <template v-if="loading">
                <div class="w-48 h-4 bg-gray-100 animate-pulse rounded"></div>
              </template>
              <template v-else>
                <span v-if="tab === 'received'">
                  YOU HAVE <span class="text-blue-700 font-semibold">{{ receivedInvites.length }}</span> NEW CONNECTIONS
                </span>
                <span v-else>
                  YOU SENT <span class="text-blue-700 font-semibold">{{ sentInvites.length }}</span> INVITES
                </span>
              </template>
            </div>

            <!-- List -->
            <ul class="divide-y">
              <template v-if="loading">
                <li v-for="i in 2" :key="i" class="px-4 py-4 flex flex-col sm:flex-row gap-4 animate-pulse">
                  <div class="flex items-start gap-3 flex-1">
                    <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div class="flex-1 space-y-2">
                      <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                      <div class="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </li>
              </template>
              <template v-else>
                <li
                  v-for="item in (tab === 'received' ? receivedInvites : sentInvites)"
                  :key="item.id"
                  class="px-4 py-4 flex flex-col sm:flex-row gap-4"
                >
                  <div class="flex items-start gap-3 flex-1">
                    <img :src="item.avatar" class="w-12 h-12 rounded-full object-cover" alt="" />
                    <div class="flex-1">
                      <div class="font-semibold text-gray-800">{{ item.name }}</div>
                      <div class="text-sm text-gray-500">{{ item.title }}</div>
                      <button class="text-xs text-blue-600 mt-1 hover:underline">
                        {{ item.connections }} connections
                      </button>
                      <p class="mt-2 text-sm text-gray-600 leading-relaxed" v-if="item.note">{{ item.note }}</p>
                    </div>
                  </div>

                  <div class="w-full sm:w-auto grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3">
                    <template v-if="tab === 'received'">
                      <BaseButton class="w-full sm:w-auto" size="sm" @click="accept(item.id)">ACCEPT</BaseButton>
                      <BaseButton class="w-full sm:w-auto" size="sm" variant="outline" @click="decline(item.id)">DECLINE</BaseButton>
                    </template>
                    <template v-else>
                      <button class="w-full sm:w-auto px-4 py-2 rounded bg-gray-100 text-gray-600 text-sm">Pending</button>
                      <BaseButton class="w-full sm:w-auto" size="sm" variant="outline" @click="withdraw(item.id)">WITHDRAW</BaseButton>
                    </template>
                  </div>
                </li>

                <li v-if="(tab === 'received' ? receivedInvites : sentInvites).length === 0" class="px-4 py-10">
                  <p class="text-center text-sm text-gray-500">No invitations.</p>
                </li>
              </template>
            </ul>
          </Card>

          <!-- Recent connections -->
          <Card as="section">
            <h3 class="px-4 py-3 text-sm font-semibold text-gray-700 border-b">RECENT CONNECTIONS</h3>
            <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <template v-if="loading">
                <div v-for="i in 4" :key="i" class="border rounded-lg px-4 py-3 flex items-center gap-4 animate-pulse">
                  <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </template>
              <template v-else>
                <article
                  v-for="c in recent"
                  :key="c.id"
                  class="border rounded-lg px-4 py-3 flex items-center gap-4"
                >
                  <img :src="c.avatar" class="w-12 h-12 rounded-full object-cover bg-gray-100" alt="" />
                  <div class="flex-1 min-w-0">
                    <div class="font-semibold text-gray-800 truncate">{{ c.name }}</div>
                    <div class="text-sm text-gray-500 truncate">{{ c.title }}</div>
                    <div class="text-xs text-gray-400 mt-1">{{ c.when }}</div>
                  </div>
                  <BaseButton size="sm">Message</BaseButton>
                </article>
                <div v-if="recent.length === 0" class="sm:col-span-2 text-center py-6 text-gray-500 text-sm">
                  No recent connections.
                </div>
              </template>
            </div>
          </Card>
        </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import BaseButton from '../components/common/BaseButton.vue'
import Card from '../components/common/Card.vue'

type Invite = {
  id: number
  name: string
  title: string
  connections: number
  avatar: string
  note?: string
}
type Connection = { id: number; name: string; title: string; avatar: string; when: string }

const tab = ref<'received' | 'sent'>('received')
const loading = ref(false)
const error = ref<string | null>(null)

const receivedInvites = ref<Invite[]>([])
const sentInvites = ref<Invite[]>([])
const recent = ref<Connection[]>([])

const menuItems = computed(() => [
  { label: 'INVITATIONS', count: receivedInvites.value.length, highlight: true },
  { label: 'TEAMMATES', count: 0 },
  { label: 'GROUPS', count: 6 },
  { label: 'PAGES', count: 28 },
  { label: 'HASHTAGS', count: 8 },
])

const totalConnections = computed(() => 1038)

async function loadData() {
  loading.value = true
  error.value = null
  try {
    // 模擬 API 延遲
    await new Promise(res => setTimeout(res, 800))
    
    receivedInvites.value = [
      {
        id: 1,
        name: 'Brandon Wilson',
        title: 'Senior UX designer',
        connections: 623,
        avatar: 'https://i.pravatar.cc/96?img=12',
        note: "Hey, I saw your works. I like it! Can we do something together? Or maybe you have project for UX at the moment?",
      },
      {
        id: 2,
        name: 'Theresa Steward',
        title: 'iOS developer',
        connections: 481,
        avatar: 'https://i.pravatar.cc/96?img=32',
      },
    ]

    sentInvites.value = [
      { id: 101, name: 'Alex Moore', title: 'PM at Startup', connections: 210, avatar: 'https://i.pravatar.cc/96?img=25', note: 'Let’s connect!' },
    ]

    recent.value = [
      { id: 11, name: 'Audrey Alexander', title: 'Team lead at Google', avatar: 'https://i.pravatar.cc/96?img=5', when: 'Yesterday, 14:30' },
      { id: 12, name: 'Kyle Fisher', title: 'Product designer at Commandor Corp', avatar: 'https://i.pravatar.cc/96?img=15', when: 'Yesterday, 12:03' },
      { id: 13, name: 'Darlene Black', title: 'HR-manager, 10 000 connections', avatar: 'https://i.pravatar.cc/96?img=7', when: '26 Aug, Monday' },
      { id: 14, name: 'Eduardo Russell', title: 'Full stack developer at Yandex', avatar: 'https://i.pravatar.cc/96?img=66', when: '25 Aug, Sunday' },
    ]
  } catch (e) {
    error.value = 'Failed to load network data.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

function accept(id: number) {
  const idx = receivedInvites.value.findIndex(i => i.id === id)
  if (idx !== -1) {
    const picked = receivedInvites.value[idx]
    recent.value.unshift({ id: Date.now(), name: picked.name, title: picked.title, avatar: picked.avatar, when: 'Just now' })
    receivedInvites.value.splice(idx, 1)
  }
}
function decline(id: number) {
  const idx = receivedInvites.value.findIndex(i => i.id === id)
  if (idx !== -1) receivedInvites.value.splice(idx, 1)
}
function withdraw(id: number) {
  const idx = sentInvites.value.findIndex(i => i.id === id)
  if (idx !== -1) sentInvites.value.splice(idx, 1)
}
</script>
