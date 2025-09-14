<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Search, Menu } from 'lucide-vue-next'
import NavItem from './NavItem.vue'
import SearchDropdown from './SearchPanel.vue'
import Overlay from './common/Overlay.vue'
import LogoMark from './common/LogoMark.vue'
import { NAV_ITEMS } from '../constants/nav'
import type { Job, User, Article } from '../types/search'

const emit = defineEmits<{ (e: 'open-other'): void }>()

const q = ref('')
const openSearch = ref(false)
const navRef = ref<HTMLElement | null>(null)
const dropdownTop = ref(80)
const dropdownLeft = ref(0)
const dropdownWidth = ref(256) // 與 w-64 對應的預設寬度
const searchRef = ref<HTMLElement | null>(null)
const showMobileNav = ref(false)

// 量測 navbar 底緣與搜尋框位置/寬度
const measure = () => {
  const r = navRef.value?.getBoundingClientRect()
  if (r) dropdownTop.value = Math.round(r.bottom)
  const s = searchRef.value?.getBoundingClientRect()
  if (s) {
    dropdownLeft.value = Math.round(s.left)
    const vw = window.innerWidth || document.documentElement.clientWidth
    // 限制最大寬避免超出視窗
    dropdownWidth.value = Math.min(Math.round(s.width), vw - 24)
  }
}
onMounted(() => {
  measure()
  window.addEventListener('resize', measure)
  window.addEventListener('scroll', measure, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', measure)
  window.removeEventListener('scroll', measure)
})

const JOBS: Job[] = [
  { id: 'j1', title: 'UX/UI Designer', company: 'Upwork', logo: 'https://seeklogo.com/images/U/upwork-logo-2D2C1E3B42-seeklogo.com.png', to: '/jobs/uxui-designer' },
  { id: 'j2', title: 'Part-time UX designer', company: 'Google', logo: 'https://www.gstatic.com/images/branding/product/1x/googleg_lodp.png', to: '/jobs/parttime-ux' },
]
const USERS: User[] = [
  { id: 'u1', name: 'Brandon Wilson', subtitle: 'Senior UX designer', avatar: 'https://i.pravatar.cc/80?img=15', to: '/u/brandon-wilson' },
  { id: 'u2', name: 'Kyle Fisher', subtitle: 'Product designer at Commander Corp.', avatar: 'https://i.pravatar.cc/80?img=5', to: '/u/kyle-fisher' },
]
const ARTICLES: Article[] = [
  { id: 'a1', title: 'A little about usability testing', views: '3,912', thumb: 'https://picsum.photos/seed/ux/160/120', to: '/articles/usability-testing' },
]

const filtered = computed(() => {
  const kw = q.value.trim().toLowerCase()
  if (!kw) return { jobs: JOBS, users: USERS, articles: ARTICLES }
  const f = (s: string) => s.toLowerCase().indexOf(kw) !== -1
  return {
    jobs: JOBS.filter(j => f(j.title) || f(j.company)),
    users: USERS.filter(u => f(u.name) || f(u.subtitle)),
    articles: ARTICLES.filter(a => f(a.title)),
  }
})
</script>

<template>
  <nav ref="navRef" class="flex flex-wrap items-center justify-between bg-white px-4 md:px-6 py-3 shadow gap-3">
    <!-- Logo -->
    <RouterLink to="/" class="flex items-center gap-2">
      <LogoMark size="md" />
    </RouterLink>

    <!-- Icon Nav -->
    <div class="hidden lg:flex gap-6 text-sm text-gray-700 items-center">
      <NavItem v-for="n in NAV_ITEMS" :key="n.to" :icon="n.icon" :label="n.label" :to="n.to" :badge="n.badge" />
    </div>

    <!-- 搜尋 -->
    <div class="relative w-full md:w-64 order-3 md:order-none mt-2 md:mt-0" ref="searchRef">
      <input
        type="text"
        v-model="q"
        placeholder="Search"
        @focus="openSearch = true"
        class="w-full pl-8 pr-3 py-1 rounded border text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <Search class="absolute left-2 top-1.5 w-4 h-4 text-gray-400" />
    </div>

    <!-- 頭像 + 數據 + more -->
    <div class="flex items-center gap-4 md:gap-6">
      <div class="flex items-center gap-2">
        <img src="https://i.pravatar.cc/40?img=32" class="w-9 h-9 rounded-full" />
        <div class="hidden md:block text-xs text-gray-600 leading-snug">
          <div class="font-semibold">D. KARGAEV <span class="text-gray-400">YOU</span></div>
          <div>
            <span class="text-gray-400">367 views today </span>
            <span class="text-green-500 font-semibold">+32 ↗</span>
          </div>
        </div>
  </div>
      <button class="hidden md:block text-xs text-gray-500 font-semibold hover:text-gray-700" @click="emit('open-other')">
        OTHER
      </button>
      <!-- 漢堡選單（小螢幕） -->
      <button
        class="lg:hidden p-2 rounded hover:bg-gray-100"
        aria-label="Toggle navigation"
        @click="showMobileNav = !showMobileNav; measure()"
      >
        <Menu class="w-6 h-6 text-gray-700" />
      </button>
    </div>
  </nav>

  <!-- Mobile 功能選單 -->
  <div v-show="showMobileNav" class="lg:hidden bg-white border-t">
    <div class="px-4 py-2 grid grid-cols-5 gap-3">
      <NavItem v-for="n in NAV_ITEMS" :key="n.to" :icon="n.icon" :label="n.label" :to="n.to" :badge="n.badge" />
    </div>
  </div>

  <!-- 背景遮罩 -->
  <Overlay :show="openSearch && q.trim().length > 0" @click="openSearch = false" />

  <!-- 下拉搜尋結果：貼齊 navbar 下緣 -->
  <SearchDropdown
    :open="openSearch && q.trim().length > 0"
    :top="dropdownTop"
    :left="dropdownLeft"
    :width="dropdownWidth"
    :query="q"
    :jobs="filtered.jobs"
    :users="filtered.users"
    :articles="filtered.articles"
    :jobsCount="84"
    :usersCount="1530"
    :articlesCount="30"
    :totalCount="2000"
    @close="openSearch = false"
  />
</template>
