<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 錯誤提示 -->
      <div v-if="error" class="lg:col-span-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span class="block sm:inline">{{ error }}</span>
        <button @click="loadChats" class="ml-4 underline font-bold">Retry</button>
      </div>

      <Card as="aside" class="p-4 flex flex-col h-[calc(100vh-12rem)]">
        <h6 class="font-semibold text-gray-800 mb-4 uppercase text-xs">Chats</h6>
        
        <div class="flex-1 overflow-y-auto space-y-2 mb-4">
          <template v-if="loading">
            <div v-for="i in 5" :key="i" class="flex items-center space-x-3 p-2 animate-pulse">
              <div class="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                <div class="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </template>
          <template v-else>
            <li
              v-for="chat in chats"
              :key="chat.id"
              @click="selectChat(chat)"
              :class="{
                'bg-blue-50 border-l-4 border-blue-600': selectedChat?.id === chat.id,
                'hover:bg-gray-50': selectedChat?.id !== chat.id
              }"
              class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors list-none"
            >
              <div class="relative flex-shrink-0">
                <img
                  :src="chat.avatar"
                  alt=""
                  class="w-10 h-10 rounded-full object-cover bg-gray-100"
                />
                <span v-if="chat.lastOnline === 'online'" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-baseline">
                  <div class="font-semibold text-sm text-gray-800 truncate">{{ chat.name }}</div>
                  <div v-if="chat.unread" class="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div class="text-xs text-gray-500 truncate">{{ chat.lastMessage }}</div>
              </div>
            </li>
            <div v-if="chats.length === 0" class="text-center py-10 text-gray-400 text-sm">
              No chats found.
            </div>
          </template>
        </div>
        
        <BaseButton variant="outline" block size="sm">Start new chat</BaseButton>
      </Card>

      <Card as="main" class="lg:col-span-2 p-4 flex flex-col h-[calc(100vh-12rem)] relative">
        <template v-if="selectedChat">
          <header class="flex items-center justify-between mb-4 pb-3 border-b">
            <div class="flex items-center space-x-3">
              <img :src="selectedChat.avatar" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <div class="font-semibold text-gray-800 text-sm">
                  {{ selectedChat.name }}
                </div>
                <div class="text-[10px] text-gray-500 uppercase">
                  {{ selectedChat.lastOnline === 'online' ? 'Active now' : `Last online: ${selectedChat.lastOnline}` }}
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-3 text-gray-400">
              <PaperClipIcon class="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
              <button class="text-gray-400 hover:text-gray-600">⋯</button>
            </div>
          </header>

          <div class="flex-1 overflow-y-auto space-y-4 px-2 py-4">
            <div
              v-for="msg in selectedChat.messages"
              :key="msg.id"
              class="flex items-end"
              :class="{ 'justify-end': msg.fromSelf, 'justify-start': !msg.fromSelf }"
            >
              <template v-if="!msg.fromSelf">
                <img
                  :src="selectedChat.avatar"
                  alt=""
                  class="w-8 h-8 rounded-full object-cover mr-2 mb-1"
                />
                <div class="bg-gray-100 p-3 rounded-2xl rounded-bl-none text-sm text-gray-800 max-w-xs shadow-sm">
                  {{ msg.text }}
                </div>
              </template>
              <template v-else>
                <div class="bg-blue-600 text-white p-3 rounded-2xl rounded-br-none text-sm max-w-xs shadow-sm">
                  {{ msg.text }}
                </div>
                <img
                  :src="currentUser?.avatar || 'https://picsum.photos/seed/user/64'"
                  alt=""
                  class="w-8 h-8 rounded-full object-cover ml-2 mb-1"
                />
              </template>
            </div>
            <div v-if="selectedChat.messages.length === 0" class="text-center py-20 text-gray-400 text-sm italic">
              No messages yet. Say hi!
            </div>
          </div>

          <div class="mt-4 flex items-center space-x-2 pt-4 border-t">
            <input
              type="text"
              v-model="newMessage"
              @keyup.enter="sendMessage"
              placeholder="Write your message..."
              class="flex-1 bg-gray-50 border-none rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              @click="sendMessage"
              :disabled="!newMessage.trim()"
              class="bg-blue-600 p-2.5 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ArrowUpTrayIcon class="w-5 h-5 text-white" />
            </button>
          </div>
        </template>
        <template v-else-if="!loading">
          <div class="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-4">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <ArrowUpTrayIcon class="w-8 h-8 transform rotate-90" />
            </div>
            <p>Select a chat to start messaging</p>
          </div>
        </template>
        <div v-else class="flex-1 flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseButton from '../components/common/BaseButton.vue'
import Card from '../components/common/Card.vue'
import { useUserStore } from '../stores/user'
import {
  PaperClipIcon,
  ArrowUpTrayIcon
} from '@heroicons/vue/24/outline'

interface Message {
  id: number
  text: string
  fromSelf: boolean
}
interface Chat {
  id: number
  name: string
  avatar: string
  lastMessage: string
  lastOnline: string
  unread: boolean
  messages: Message[]
}

const userStore = useUserStore()
const currentUser = computed(() => userStore.user)

const loading = ref(false)
const error = ref<string | null>(null)
const chats = ref<Chat[]>([])
const selectedChat = ref<Chat | null>(null)
const newMessage = ref('')

async function loadChats() {
  loading.value = true
  error.value = null
  try {
    await new Promise(res => setTimeout(res, 900))
    
    chats.value = [
      {
        id: 1,
        name: 'Darlene Black',
        avatar: 'https://i.pravatar.cc/96?img=7',
        lastMessage: 'Hey, how is your project?',
        lastOnline: '1 hour ago',
        unread: false,
        messages: [
          { id: 101, text: 'Hi! Are you available for a quick call?', fromSelf: false },
          { id: 102, text: 'Sure, what is it about?', fromSelf: true },
          { id: 103, text: 'Hey, how is your project?', fromSelf: false }
        ]
      },
      {
        id: 2,
        name: 'Theresa Steward',
        avatar: 'https://i.pravatar.cc/96?img=32',
        lastMessage: 'Hi, Dmitry! I have a work for you.',
        lastOnline: 'online',
        unread: true,
        messages: [
          { id: 201, text: 'Hi, Dmitry! I have a work for you.', fromSelf: false }
        ]
      },
      {
        id: 3,
        name: 'Brandon Wilson',
        avatar: 'https://i.pravatar.cc/96?img=12',
        lastMessage: 'I am learning English.',
        lastOnline: '2 hours ago',
        unread: false,
        messages: []
      }
    ]
    
    if (chats.value.length > 0) {
      selectedChat.value = chats.value[0]
    }
  } catch (e) {
    error.value = 'Failed to load chats.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadChats()
})

function selectChat(chat: Chat) {
  selectedChat.value = chat
}

function sendMessage() {
  if (!newMessage.value.trim() || !selectedChat.value) return
  selectedChat.value.messages.push({
    id: Date.now(),
    text: newMessage.value,
    fromSelf: true
  })
  selectedChat.value.lastMessage = newMessage.value
  newMessage.value = ''
}
</script>
