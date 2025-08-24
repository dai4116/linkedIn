<template>
  <nav class="flex items-center justify-between bg-white px-6 py-3 shadow">
    <!-- Logo -->
    <RouterLink to="/" class="flex items-center gap-2">
      <img
        src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
        alt="logo"
        class="w-8 h-8"
      />
    </RouterLink>

    <!-- Icon Nav -->
    <div class="flex gap-6 text-sm text-gray-700 items-center">
      <NavItem icon="rss" label="FEED" to="/feed" />
      <NavItem icon="users" label="NETWORK" to="/network" />
      <NavItem icon="briefcase" label="JOBS" to="/jobs" />
      <NavItem icon="message-square" label="CHAT" to="/chat" :badge="1" />
      <NavItem icon="bell" label="NOTICES" to="/notices" />
    </div>

    <!-- 搜尋 -->
    <div class="relative w-64">
      <input
        type="text"
        placeholder="Search"
        class="w-full pl-8 pr-3 py-1 rounded border text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <Search class="absolute left-2 top-1.5 w-4 h-4 text-gray-400" />
    </div>

    <!-- 頭像 + 數據 + more -->
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2">
        <img src="https://i.pravatar.cc/40?img=32" class="w-9 h-9 rounded-full" />
        <div class="text-xs text-gray-600 leading-snug">
          <div class="font-semibold">D. KARGAEV <span class="text-gray-400">YOU</span></div>
          <div>
            <span class="text-gray-400">367 views today </span>
            <span class="text-green-500 font-semibold">+32 ↗</span>
          </div>
        </div>
      </div>
      <button
      class="text-xs text-gray-500 font-semibold hover:text-gray-700"
      @click="emit('open-other')"
    >
      OTHER
    </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import NavItem from './NavItem.vue'

const emit = defineEmits<{
  (e: 'open-other'): void
}>()
</script>