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
              <span class="text-sm text-gray-500">{{ totalConnections.toLocaleString() }}</span>
            </div>

            <nav class="py-2 text-sm">
              <button class="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div class="flex items-center gap-3">
                  <span class="w-1 h-5 bg-blue-600 rounded-sm"></span>
                  <span class="text-gray-700">INVITATIONS</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-amber-400"></span>
                  <span class="text-gray-500">{{ receivedInvites.length }}</span>
                </div>
              </button>

              <button class="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div class="flex items-center gap-3">
                  <span class="w-1 h-5 bg-gray-200 rounded-sm"></span>
                  <span class="text-gray-700">TEAMMATES</span>
                </div>
                <span class="text-gray-500">0</span>
              </button>

              <button class="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div class="flex items-center gap-3">
                  <span class="w-1 h-5 bg-gray-200 rounded-sm"></span>
                  <span class="text-gray-700">GROUPS</span>
                </div>
                <span class="text-gray-500">6</span>
              </button>

              <button class="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div class="flex items-center gap-3">
                  <span class="w-1 h-5 bg-gray-200 rounded-sm"></span>
                  <span class="text-gray-700">PAGES</span>
                </div>
                <span class="text-gray-500">28</span>
              </button>

              <button class="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div class="flex items-center gap-3">
                  <span class="w-1 h-5 bg-gray-200 rounded-sm"></span>
                  <span class="text-gray-700">HASHTAGS</span>
                </div>
                <span class="text-gray-500">8</span>
              </button>
            </nav>
          </Card>
        </aside>

        <!-- Right content -->
        <main class="lg:col-span-2 space-y-6">
          <!-- Invitations -->
          <Card as="section" class="overflow-hidden">
            <!-- Tabs -->
            <div class="flex">
              <button
                class="flex-1 px-4 py-3 text-sm font-semibold border-b"
                :class="tab === 'received' ? 'text-blue-700 border-blue-600' : 'text-gray-500 border-transparent'"
                @click="tab = 'received'"
              >
                RECEIVED
              </button>
              <button
                class="flex-1 px-4 py-3 text-sm font-semibold border-b"
                :class="tab === 'sent' ? 'text-blue-700 border-blue-600' : 'text-gray-500 border-transparent'"
                @click="tab = 'sent'"
              >
                SENT
              </button>
            </div>

            <div class="px-4 py-3 text-sm text-gray-500 border-b">
              <span v-if="tab === 'received'">
                YOU HAVE <span class="text-blue-700 font-semibold">{{ receivedInvites.length }}</span> NEW CONNECTIONS
              </span>
              <span v-else>
                YOU SENT <span class="text-blue-700 font-semibold">{{ sentInvites.length }}</span> INVITES
              </span>
            </div>

            <!-- List -->
            <ul class="divide-y">
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
                    <p class="mt-2 text-sm text-gray-600" v-if="item.note">{{ item.note }}</p>
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
            </ul>
          </Card>

          <!-- Recent connections -->
          <Card as="section">
            <h3 class="px-4 py-3 text-sm font-semibold text-gray-700 border-b">RECENT CONNECTIONS</h3>
            <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <article
                v-for="c in recent"
                :key="c.id"
                class="border rounded-lg px-4 py-3 flex items-center gap-4"
              >
                <img :src="c.avatar" class="w-12 h-12 rounded-full object-cover" alt="" />
                <div class="flex-1">
                  <div class="font-semibold text-gray-800">{{ c.name }}</div>
                  <div class="text-sm text-gray-500">{{ c.title }}</div>
                  <div class="text-xs text-gray-400">{{ c.when }}</div>
                </div>
                <BaseButton size="sm">Message</BaseButton>
              </article>
            </div>
          </Card>
        </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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

const receivedInvites = ref<Invite[]>([
  {
    id: 1,
    name: 'Brandon Wilson',
    title: 'Senior UX designer',
    connections: 623,
    avatar: 'https://i.pravatar.cc/96?img=12',
    note:
      "Hey, I saw your works. I like it! Can we do something together? Or maybe you have project for UX at the moment?",
  },
  {
    id: 2,
    name: 'Theresa Steward',
    title: 'iOS developer',
    connections: 481,
    avatar: 'https://i.pravatar.cc/96?img=32',
  },
])

const sentInvites = ref<Invite[]>([
  { id: 101, name: 'Alex Moore', title: 'PM at Startup', connections: 210, avatar: 'https://i.pravatar.cc/96?img=25', note: 'Let’s connect!' },
])

const recent = ref<Connection[]>([
  { id: 11, name: 'Audrey Alexander', title: 'Team lead at Google', avatar: 'https://i.pravatar.cc/96?img=5', when: 'Yesterday, 14:30' },
  { id: 12, name: 'Kyle Fisher', title: 'Product designer at Commandor Corp', avatar: 'https://i.pravatar.cc/96?img=15', when: 'Yesterday, 12:03' },
  { id: 13, name: 'Darlene Black', title: 'HR-manager, 10 000 connections', avatar: 'https://i.pravatar.cc/96?img=7', when: '26 Aug, Monday' },
  { id: 14, name: 'Eduardo Russell', title: 'Full stack developer at Yandex', avatar: 'https://i.pravatar.cc/96?img=66', when: '25 Aug, Sunday' },
])

const totalConnections = computed(() => 1038)

function accept(id: number) {
  let idx = -1
  for (let i = 0; i < receivedInvites.value.length; i++) {
    if (receivedInvites.value[i].id === id) { idx = i; break }
  }
  if (idx !== -1) {
    const picked = receivedInvites.value[idx]
    recent.value.unshift({ id: Date.now(), name: picked.name, title: picked.title, avatar: picked.avatar, when: 'Just now' })
    receivedInvites.value.splice(idx, 1)
  }
}
function decline(id: number) {
  let idx = -1
  for (let i = 0; i < receivedInvites.value.length; i++) {
    if (receivedInvites.value[i].id === id) { idx = i; break }
  }
  if (idx !== -1) receivedInvites.value.splice(idx, 1)
}
function withdraw(id: number) {
  let idx = -1
  for (let i = 0; i < sentInvites.value.length; i++) {
    if (sentInvites.value[i].id === id) { idx = i; break }
  }
  if (idx !== -1) sentInvites.value.splice(idx, 1)
}
</script>
