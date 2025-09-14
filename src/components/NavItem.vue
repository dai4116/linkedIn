<template>
  <RouterLink
    :to="to"
    class="flex flex-col items-center justify-center relative group"
  >
    <component :is="iconMap[icon]" class="w-5 h-5 group-hover:text-blue-600" />
    <span class="hidden sm:block text-[10px] md:text-xs mt-1 group-hover:text-blue-600">{{ label }}</span>

    <Badge v-if="badge" variant="warning" size="sm" class="absolute top-0 right-0">{{ badge }}</Badge>
  </RouterLink>
</template>

<script setup lang="ts">
import { Rss, Users, Briefcase, MessageSquare, Bell } from 'lucide-vue-next'
import { defineProps } from 'vue'
import Badge from './common/Badge.vue'

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
