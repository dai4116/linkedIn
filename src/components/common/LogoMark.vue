<template>
  <div class="flex items-center gap-2">
    <img :src="logoUrl" alt="logo" :class="imgClass" />
    <span v-if="showText" class="text-sm font-semibold">LinkedIn</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ size?: 'sm' | 'md'; showText?: boolean }>(), {
  size: 'md',
  showText: false,
})

const logoUrl = 'https://cdn-icons-png.flaticon.com/512/174/174857.png'

const imgClass = props.size === 'sm' ? 'w-6 h-6' : 'w-8 h-8'
</script>

