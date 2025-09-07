<template>
  <footer class="w-full bg-gray-50 border-t">
    <!-- Mobile, compact -->
    <div class="md:hidden">
      <Container class="py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="logo" class="w-6 h-6" />
          <span class="text-sm font-semibold">LinkedIn</span>
        </div>
        <div class="flex items-center gap-2">
          <select class="border border-gray-300 rounded px-2 py-1 text-xs">
            <option>English</option>
            <option>简体中文</option>
            <option>Español</option>
            <option>日本語</option>
          </select>
          <button class="p-2 rounded hover:bg-gray-100" @click="mobileOpen = !mobileOpen" aria-label="Toggle footer links">
            <ChevronDownIcon class="w-4 h-4 text-gray-600" :class="{ 'transform rotate-180': mobileOpen }" />
          </button>
        </div>
      </div>
      <div v-show="mobileOpen" class="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-gray-600">
        <a href="#" class="hover:underline">About</a>
        <a href="#" class="hover:underline">Careers</a>
        <a href="#" class="hover:underline">Advertising</a>
        <a href="#" class="hover:underline">Small Business</a>
        <a href="#" class="hover:underline">Talent Solutions</a>
        <a href="#" class="hover:underline">Marketing Solutions</a>
        <a href="#" class="hover:underline">Sales Solutions</a>
        <a href="#" class="hover:underline">Safety Center</a>
        <a href="#" class="hover:underline">Community Guidelines</a>
        <a href="#" class="hover:underline">Privacy &amp; Terms</a>
        <a href="#" class="hover:underline">Mobile App</a>
        <div class="col-span-2 flex gap-2 mt-2">
          <button class="flex-1 flex items-center justify-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded text-xs font-medium">
            <HelpCircleIcon class="w-4 h-4 mr-2" />
            Questions?
          </button>
          <button class="flex-1 flex items-center justify-center px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium">
            <SettingsIcon class="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>
      </Container>
    </div>

    <!-- Desktop, full -->
    <div class="hidden md:block">
      <Container class="py-6 md:py-8">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
        <div class="flex flex-col items-center md:items-start space-y-2">
        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="logo" class="w-8 h-8" />
        <span class="text-sm font-bold">LinkedIn</span>
      </div>

      <!-- Navigation -->
      <div class="md:col-span-2">
        <h3 class="text-sm font-semibold text-gray-500 uppercase mb-4">Navigation</h3>
        <div class="grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div class="space-y-2">
            <a href="#" class="block hover:underline">About</a>
            <a href="#" class="block hover:underline">Careers</a>
            <a href="#" class="block hover:underline">Advertising</a>
            <a href="#" class="block hover:underline">Small Business</a>
          </div>
          <div class="space-y-2">
            <a href="#" class="block hover:underline">Talent Solutions</a>
            <a href="#" class="block hover:underline">Marketing Solutions</a>
            <a href="#" class="block hover:underline">Sales Solutions</a>
            <a href="#" class="block hover:underline">Safety Center</a>
          </div>
          <div class="space-y-2">
            <a href="#" class="block hover:underline">Community Guidelines</a>
            <a href="#" class="block hover:underline">Privacy &amp; Terms</a>
            <a href="#" class="block hover:underline">Mobile App</a>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-gray-500 uppercase mb-4">Fast access</h3>
        <div class="flex flex-col gap-3">
          <button
            class="flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded text-sm font-medium">
            <HelpCircleIcon class="w-4 h-4 mr-2" />
            Questions?
          </button>
          <button
            class="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium">
            <SettingsIcon class="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      <!-- Language -->
      <div>
        <h3 class="text-sm font-semibold text-gray-500 uppercase mb-4">Language</h3>
        <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
          <option>English</option>
          <option>简体中文</option>
          <option>Español</option>
          <option>日本語</option>
        </select>
      </div>
        </div>
      </Container>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { HelpCircle as HelpCircleIcon, Settings as SettingsIcon, ChevronDown as ChevronDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import Container from './common/Container.vue'

const mobileOpen = ref(false)
</script>

<style scoped>
</style>
