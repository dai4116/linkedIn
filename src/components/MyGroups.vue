<script setup lang="ts">
import Card from './common/Card.vue'

const groups = [
  { name: 'Moscow State Linguistical University', avatar: 'https://randomuser.me/api/portraits/women/47.jpg' },
  { name: 'Digital freelancers group', avatar: 'https://randomuser.me/api/portraits/women/48.jpg' },
  { name: 'Interaction design association', avatar: 'https://randomuser.me/api/portraits/women/49.jpg' },
]
</script>

<template>
  <Card>
    <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">My Groups</h2>
    <ul class="space-y-2 text-sm">
      <li v-for="group in groups" :key="group.name" class="flex items-center space-x-2">
        <img :src="group.avatar" alt="" class="w-8 h-8 rounded-full object-cover" />
        <span>{{ group.name }}</span>
      </li>
    </ul>
    <button class="text-blue-600 mt-2 text-xs">Show All (8)</button>
  </Card>
</template>
