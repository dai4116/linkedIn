<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Card from './common/Card.vue'
import { fetchGroups } from '../services/fakeApi'
import type { Group } from '../types/types'

const allGroups = ref<Group[]>([])
const isExpanded = ref(false)

onMounted(async () => {
  allGroups.value = await fetchGroups()
})

const displayedGroups = computed(() => {
  return isExpanded.value ? allGroups.value : allGroups.value.slice(0, 3)
})

const toggleShowAll = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <Card>
    <div class="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
      <h2 class="font-semibold text-lg">My Groups</h2>
    </div>
    <ul class="space-y-2 text-sm">
      <li v-for="group in displayedGroups" :key="group.name" class="flex items-center space-x-2 transition-all duration-300">
        <img :src="group.avatar" alt="" class="w-8 h-8 rounded-full object-cover" />
        <span class="truncate">{{ group.name }}</span>
      </li>
    </ul>
    <button
      v-if="allGroups.length > 3"
      @click="toggleShowAll"
      class="text-blue-600 mt-4 text-xs font-semibold hover:underline decoration-2"
    >
      {{ isExpanded ? 'Show Less' : `Show All (${allGroups.length})` }}
    </button>
  </Card>
</template>
