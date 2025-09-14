<template>
  <select :class="classes">
    <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
  </select>
  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LANGUAGES } from '../../constants/footer'

const props = withDefaults(defineProps<{ size?: 'sm' | 'md'; modelValue?: string }>(), {
  size: 'md',
})

const languages = LANGUAGES

const classes = computed(() =>
  props.size === 'sm'
    ? 'border border-gray-300 rounded px-2 py-1 text-xs'
    : 'w-full border border-gray-300 rounded px-3 py-2 text-sm'
)
</script>

