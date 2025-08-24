<template>
  <!-- 半透明遮罩，點擊也會關閉 -->
  <div class="fixed inset-0 z-40">
    <div
      class="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300"
      :class="open ? 'opacity-100' : 'opacity-0'"
      @click="handleClose"
    ></div>

    <aside
      class="absolute inset-y-0 right-0 z-50 w-80 bg-white flex flex-col transform transition-transform duration-300 will-change-transform"
      :class="open ? 'translate-x-0' : 'translate-x-full'"
      @transitionend="onPanelTransitionEnd"
    >
      <!-- Header -->
      <header class="flex items-center justify-between px-4 py-3 border-b">
        <button @click="handleClose">
          <X class="w-5 h-5 text-gray-600" />
        </button>
        <span class="text-sm font-semibold text-gray-700">
          More from LinkedIn
        </span>
        <button class="flex items-center text-sm text-gray-500 hover:text-gray-700">
          <CircleQuestion class="w-4 h-4 mr-1" />
          Help
        </button>
      </header>

      <!-- Content -->
      <div class="p-4 flex-1 overflow-y-auto space-y-6">
        <button
          class="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg"
        >
          <BookOpen class="w-5 h-5" />
          <span class="text-sm font-medium">Learning with LinkedIn</span>
        </button>

        <div class="grid grid-cols-2 gap-2">
          <button class="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-100">
            <BarChart2 class="w-4 h-4" />
            <span>Insights</span>
          </button>
          <button class="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-100">
            <Megaphone class="w-4 h-4" />
            <span>Advertise</span>
          </button>
          <button class="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-100">
            <Users class="w-4 h-4" />
            <span>Groups</span>
          </button>
          <button class="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-100">
            <Search class="w-4 h-4" />
            <span>Profinder</span>
          </button>
          <button class="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-100">
            <DollarSign class="w-4 h-4" />
            <span>Salary</span>
          </button>
          <button class="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-100">
            <FileText class="w-4 h-4" />
            <span>Slideshare</span>
          </button>
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-semibold text-gray-500">Business services</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="block p-3 border border-gray-200 rounded-lg hover:bg-gray-100"
              >
                <span class="block font-medium">Talent Solutions</span>
                <span class="block text-xs text-gray-500">
                  Find, attract and recruit talent
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block p-3 border border-gray-200 rounded-lg hover:bg-gray-100"
              >
                <span class="block font-medium">Sales Solutions</span>
                <span class="block text-xs text-gray-500">
                  Unlock sales opportunities
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block p-3 border border-gray-200 rounded-lg hover:bg-gray-100"
              >
                <span class="block font-medium">Post a job</span>
                <span class="block text-xs text-gray-500">
                  Get your job in front of quality candidates
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block p-3 border border-gray-200 rounded-lg hover:bg-gray-100"
              >
                <span class="block font-medium">Marketing Solutions</span>
                <span class="block text-xs text-gray-500">
                  Acquire customers and grow your business
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block p-3 border border-gray-200 rounded-lg hover:bg-gray-100"
              >
                <span class="block font-medium">Learning Solutions</span>
                <span class="block text-xs text-gray-500">
                  Develop talent across your organisation
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div class="mt-auto">
          <div
            class="p-4 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
          >
            <span class="block font-semibold">LinkedIn Premium</span>
            <span class="block text-sm">Special features only for premium users</span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import {
  X,
  BookOpen,
  BarChart2,
  Megaphone,
  Users,
  Search,
  DollarSign,
  FileText,
} from 'lucide-vue-next'

import { onMounted, ref, nextTick } from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const open = ref(false)
const closing = ref(false)

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => {
    open.value = true
  })
})

function handleClose() {
  if (closing.value) return
  closing.value = true
  open.value = false
}

function onPanelTransitionEnd(e: TransitionEvent) {
  if (closing.value && e.propertyName === 'transform') {
    emit('close')
  }
}
</script>
