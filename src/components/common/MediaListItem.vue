<template>
  <RouterLink :to="to" class="c-media-item">
    <div class="c-media-body">
      <img :src="imgSrc" :alt="imgAlt" :class="imgClass" />
      <div class="leading-tight">
        <div class="c-media-title">{{ title }}</div>
        <div v-if="subtitle" class="c-media-subtitle">{{ subtitle }}</div>
      </div>
    </div>
    <div class="pr-3 text-gray-300" v-if="chevron">›</div>
    <slot name="right" v-else />
  </RouterLink>
  
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(defineProps<{
  to: string
  imgSrc: string
  imgAlt?: string
  imgClass?: string
  title: string
  subtitle?: string
  chevron?: boolean
}>(), {
  imgAlt: '',
  imgClass: 'w-8 h-8 rounded',
  chevron: true,
})
</script>

