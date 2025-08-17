<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6 grid grid-cols-3 gap-6">
      <aside class="bg-white p-4 rounded-lg shadow">
        <h6 class="font-semibold text-gray-800 mb-4 uppercase text-xs">Chats</h6>
        <ul class="space-y-2">
          <li
            v-for="chat in chats"
            :key="chat.id"
            @click="selectChat(chat)"
            :class="{
              'bg-gray-100': selectedChat?.id === chat.id
            }"
            class="flex items-center space-x-3 p-2 rounded-lg cursor-pointer"
          >
            <img
              :src="chat.avatar"
              alt=""
              class="w-10 h-10 rounded-full object-cover"
            />
            <div class="flex-1">
              <div class="font-medium text-gray-800">{{ chat.name }}</div>
              <div class="text-xs text-gray-500 truncate">{{ chat.lastMessage }}</div>
            </div>
            <span
              v-if="chat.unread"
              class="w-2 h-2 bg-blue-600 rounded-full"
            ></span>
          </li>
        </ul>
        <button class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
          Start new chat
        </button>
      </aside>

      <main class="col-span-2 flex flex-col bg-white p-4 rounded-lg shadow">
        <header class="flex items-center justify-between mb-4">
          <div class="font-semibold text-gray-800">
            Chat with <span class="text-blue-600">{{ selectedChat?.name }}</span>
          </div>
          <div class="text-xs text-gray-500">
            Last online: {{ selectedChat?.lastOnline }}
          </div>
          <PaperClipIcon class="w-5 h-5 text-gray-600 cursor-pointer" />
        </header>

        <div class="flex-1 overflow-y-auto space-y-4 px-2">
          <div
            v-for="msg in selectedChat?.messages"
            :key="msg.id"
            class="flex items-end"
            :class="{ 'justify-end': msg.fromSelf, 'justify-start': !msg.fromSelf }"
          >
            <template v-if="!msg.fromSelf">
              <img
                :src="selectedChat.avatar"
                alt=""
                class="w-8 h-8 rounded-full object-cover mr-2"
              />
              <div class="bg-gray-100 p-2 rounded-tl-lg rounded-tr-lg rounded-br-lg text-sm text-gray-800 max-w-xs">
                {{ msg.text }}
              </div>
            </template>
            <template v-else>
              <div class="bg-blue-600 text-white p-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg text-sm max-w-xs">
                {{ msg.text }}
              </div>
              <img
                :src="user.avatar"
                alt=""
                class="w-8 h-8 rounded-full object-cover ml-2"
              />
            </template>
          </div>
        </div>

        <div class="mt-4 flex items-center space-x-2">
          <input
            type="text"
            v-model="newMessage"
            placeholder="Write your message"
            class="flex-1 border rounded-lg px-4 py-2 focus:outline-none"
          />
          <PaperClipIcon class="w-6 h-6 text-gray-600 cursor-pointer" />
          <button
            @click="sendMessage"
            class="bg-blue-600 p-2 rounded-lg"
          >
            <ArrowUpTrayIcon class="w-5 h-5 text-white" />
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

const chats = ref<Chat[]>([
  {
    id: 1,
    name: 'Darlene Black',
    avatar: 'https://picsum.photos/seed/d1/40',
    lastMessage: 'Hey, how is your project?',
    lastOnline: '1 hour ago',
    unread: false,
    messages: []
  },
  {
    id: 2,
    name: 'Theresa Steward',
    avatar: 'https://picsum.photos/seed/d2/40',
    lastMessage: 'Hi, Dmitry! I have a work for you.',
    lastOnline: 'online',
    unread: true,
    messages: []
  },
  {
    id: 3,
    name: 'Brandon Wilson',
    avatar: 'https://picsum.photos/seed/d3/40',
    lastMessage: 'I am Russian and I am learning English.',
    lastOnline: '2 hours ago',
    unread: false,
    messages: []
  }
])

const selectedChat = ref<Chat>(chats.value[0])
const user = ref({ avatar: 'https://picsum.photos/seed/user/64' })
const newMessage = ref('')

function selectChat(chat: Chat) {
  selectedChat.value = chat
}

function sendMessage() {
  if (!newMessage.value.trim()) return
  selectedChat.value.messages.push({
    id: Date.now(),
    text: newMessage.value,
    fromSelf: true
  })
  newMessage.value = ''
}
</script>

<style scoped>
</style>