<template>
  <div v-show="show" class="fixed inset-0 bg-black/30" :class="zIndex" @click="$emit('click')"></div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ show: boolean; zIndex?: string }>(), {
  zIndex: 'z-40',
})
defineEmits<{ (e: 'click'): void }>()
</script>

