<template>
  <button :type="type" :class="classes" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
  class?: any
}>(), {
  variant: 'primary',
  size: 'md',
  block: false,
  type: 'button',
})

defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const variantClass = computed(() => {
  switch (props.variant) {
    case 'outline':
      return 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
    case 'ghost':
      return 'text-gray-700 hover:bg-gray-100'
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700'
  }
})

const sizeClass = computed(() => props.size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm')

const classes = computed(() => [
  'rounded font-medium inline-flex items-center justify-center',
  props.block ? 'w-full' : '',
  sizeClass.value,
  variantClass.value,
  props.variant !== 'ghost' ? 'focus:outline-none focus:ring-2 focus:ring-blue-500/50' : '',
  props.class,
])
</script>

