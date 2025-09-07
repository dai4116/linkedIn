<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import OtherPanel from './components/OtherPanel.vue'
import { ref } from 'vue'


const showOther = ref(false)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar @open-other="showOther = true" />
    <main class="flex-1">
      <router-view />
      <OtherPanel v-if="showOther" @close="showOther = false" />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
