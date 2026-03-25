<script setup lang="ts">
import Card from './common/Card.vue'

const hashtags = ['work', 'business', 'hr', 'ux', 'ui', 'freelance']
</script>

<template>
  <Card>
    <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Followed Hashtags</h2>
    <div class="flex flex-wrap gap-2 text-xs">
      <span v-for="tag in hashtags" :key="tag" class="bg-gray-100 px-2 py-1 rounded">#{{ tag }}</span>
    </div>
  </Card>
</template>
