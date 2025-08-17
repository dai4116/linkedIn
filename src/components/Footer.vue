<template>
  <footer class="fixed bottom-0 left-0 w-full bg-gray-50 border-t z-10">
    <div class="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-5 gap-8">
      <div class="flex flex-col items-center space-y-2">
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
  </footer>
</template>

<script setup lang="ts">
import { Linkedin as LinkedinIcon, HelpCircle as HelpCircleIcon, Settings as SettingsIcon } from 'lucide-vue-next'
</script>

<style scoped>
/* 全部用 Tailwind，就不另外寫這裡 */
</style>