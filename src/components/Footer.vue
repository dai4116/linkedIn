<template>
  <footer class="w-full bg-gray-50 border-t">
    <!-- Mobile, compact -->
    <div class="md:hidden">
      <Container class="py-3">
      <div class="flex items-center justify-between">
        <LogoMark size="sm" :showText="true" />
        <div class="flex items-center gap-2">
          <LanguageSelect size="sm" />
          <button class="p-2 rounded hover:bg-gray-100" @click="mobileOpen = !mobileOpen" aria-label="Toggle footer links">
            <ChevronDownIcon class="w-4 h-4 text-gray-600" :class="{ 'transform rotate-180': mobileOpen }" />
          </button>
        </div>
      </div>
      <div v-show="mobileOpen" class="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-gray-600">
        <a v-for="l in FOOTER_LINKS" :key="l.label" :href="l.href" class="hover:underline">{{ l.label }}</a>
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
          <LogoMark size="md" :showText="true" />
        </div>

      <!-- Navigation -->
      <div class="md:col-span-2">
        <h3 class="text-sm font-semibold text-gray-500 uppercase mb-4">Navigation</h3>
        <div class="grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div v-for="(col, idx) in FOOTER_NAV_COLUMNS" :key="idx" class="space-y-2">
            <a v-for="l in col" :key="l.label" :href="l.href" class="block hover:underline">{{ l.label }}</a>
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
        <LanguageSelect size="md" />
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
import LogoMark from './common/LogoMark.vue'
import LanguageSelect from './common/LanguageSelect.vue'
import { FOOTER_LINKS, FOOTER_NAV_COLUMNS } from '../constants/footer'

const mobileOpen = ref(false)
</script>

<style scoped>
</style>
