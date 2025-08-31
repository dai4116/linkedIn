<template>
  <RouterLink
    :to="to"
    class="flex flex-col items-center justify-center relative group"
  >
    <component :is="iconMap[icon]" class="w-5 h-5 group-hover:text-blue-600" />
    <span class="hidden sm:block text-[10px] md:text-xs mt-1 group-hover:text-blue-600">{{ label }}</span>

    <span v-if="badge" class="absolute top-0 right-0 bg-orange-500 text-white text-[10px] px-1 rounded-full">
      {{ badge }}
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { Rss, Users, Briefcase, MessageSquare, Bell } from 'lucide-vue-next'
import { defineProps } from 'vue'

const props = defineProps<{
  icon: 'rss' | 'users' | 'briefcase' | 'message-square' | 'bell'
  label: string
  to: string
  badge?: number
}>()

const iconMap = {
  rss: Rss,
  users: Users,
  briefcase: Briefcase,
  'message-square': MessageSquare,
  bell: Bell,
}
</script>
