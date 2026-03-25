<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../stores/user'
import Card from './common/Card.vue'
import BaseButton from './common/BaseButton.vue'

const userStore = useUserStore()
const currentUser = computed(() => userStore.user)
</script>

<template>
  <Card class="text-center space-y-2">
    <img 
      :src="currentUser?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'" 
      class="w-20 h-20 rounded-full mx-auto object-cover"
      :alt="currentUser?.name"
    />
    <p class="font-bold">{{ currentUser?.name || 'Guest' }}</p>
    <p class="text-xs text-gray-500">
      {{ currentUser?.title || 'Freelance UX/UI designer, 800+ projects in web & mobile. Open to offers.' }}
    </p>
    <BaseButton class="w-full" size="sm">Write New Article</BaseButton>
  </Card>
</template>
