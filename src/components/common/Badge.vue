<template>
  <span :class="classes"><slot /></span>
  
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
}>(), {
  variant: 'neutral',
  size: 'sm',
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-blue-100 text-blue-700'
    case 'success':
      return 'bg-green-100 text-green-700'
    case 'warning':
      return 'bg-orange-500 text-white'
    case 'danger':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-200 text-gray-800'
  }
})

const sizeClass = computed(() => (props.size === 'sm'
  ? 'text-[10px] leading-none px-1.5 py-0.5'
  : 'text-xs leading-none px-2 py-0.5'))

const classes = computed(() => [
  // Keep component-layer classes for global consistency
  'c-badge',
  `c-badge--${props.variant}`,
  // Inline utility fallbacks to avoid missing styles
  'inline-flex items-center rounded-full font-semibold',
  variantClass.value,
  sizeClass.value,
])
</script>
