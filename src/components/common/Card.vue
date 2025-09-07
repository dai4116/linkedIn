<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  as?: string
  hover?: boolean
  class?: any
}>(), {
  as: 'section',
  hover: false,
})

const classes = computed(() => [
  'bg-white shadow rounded-lg p-6',
  props.hover ? 'transition-shadow hover:shadow-md' : '',
  props.class,
])
</script>

