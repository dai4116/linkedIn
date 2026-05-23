<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from './common/Card.vue'
import { fetchHashtags } from '../services/fakeApi'

const hashtags = ref<string[]>([])

onMounted(async () => {
  hashtags.value = await fetchHashtags()
})
</script>

<template>
  <Card>
    <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Followed Hashtags</h2>
    <div class="flex flex-wrap gap-2 text-xs">
      <span
        v-for="tag in hashtags"
        :key="tag"
        class="bg-blue-50 text-blue-700 px-2 py-1 rounded-sm font-medium hover:bg-blue-100 cursor-pointer"
      >
        #{{ tag }}
      </span>
    </div>
  </Card>
</template>
