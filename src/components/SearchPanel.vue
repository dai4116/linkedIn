<template>
  <!-- 固定在視窗，top 由外部傳入，置中 -->
  <div
    v-show="open"
    class="fixed z-50 bg-white rounded-xl shadow-2xl border max-w-[95vw]"
    :style="{ top: top + 'px', left: left + 'px', width: width + 'px' }"
    ref="panelEl"
    role="dialog"
    aria-modal="false"
  >
    <!-- Header -->

    <div class="px-6 py-4 space-y-8 max-h-[70vh] overflow-auto">
      <!-- JOBS -->
      <section>
        <h3 class="text-[11px] tracking-wide text-gray-400 font-semibold">JOBS</h3>
        <div class="mt-2 space-y-2">
          <RouterLink
            v-for="job in jobs"
            :key="job.id"
            :to="job.to"
            class="flex items-center justify-between rounded-lg border hover:bg-gray-50"
          >
            <div class="flex items-center gap-3 p-3">
              <img :src="job.logo" alt="" class="w-7 h-7 rounded" />
              <div class="leading-tight">
                <div class="text-sm font-semibold text-gray-800">{{ job.title }}</div>
                <div class="text-xs text-gray-500">{{ job.company }}</div>
              </div>
            </div>
            <div class="pr-3 text-gray-300">›</div>
          </RouterLink>
        </div>
        <RouterLink :to="`/search/jobs?q=${encodeURIComponent(query)}`" class="block mt-2 text-xs text-blue-600 font-semibold">
          ALL JOBS ({{ jobsCount }})
        </RouterLink>
      </section>

      <!-- USERS -->
      <section>
        <h3 class="text-[11px] tracking-wide text-gray-400 font-semibold">USERS</h3>
        <div class="mt-2 space-y-2">
          <RouterLink
            v-for="u in users"
            :key="u.id"
            :to="u.to"
            class="flex items-center justify-between rounded-lg border hover:bg-gray-50"
          >
            <div class="flex items-center gap-3 p-3">
              <img :src="u.avatar" alt="" class="w-9 h-9 rounded-full" />
              <div class="leading-tight">
                <div class="text-sm font-semibold text-gray-800">{{ u.name }}</div>
                <div class="text-xs text-gray-500">{{ u.subtitle }}</div>
              </div>
            </div>
            <div class="pr-3 text-gray-300">›</div>
          </RouterLink>
        </div>
        <RouterLink :to="`/search/users?q=${encodeURIComponent(query)}`" class="block mt-2 text-xs text-blue-600 font-semibold">
          ALL USERS ({{ usersCount }})
        </RouterLink>
      </section>

      <!-- ARTICLES -->
      <section>
        <h3 class="text-[11px] tracking-wide text-gray-400 font-semibold">ARTICLES</h3>
        <div class="mt-2">
          <RouterLink
            v-for="a in articles"
            :key="a.id"
            :to="a.to"
            class="flex items-center justify-between rounded-lg border hover:bg-gray-50"
          >
            <div class="flex items-center gap-3 p-3">
              <img :src="a.thumb" alt="" class="w-16 h-12 rounded object-cover" />
              <div class="leading-tight">
                <div class="text-sm font-semibold text-gray-800">{{ a.title }}</div>
                <div class="text-xs text-gray-500">{{ a.views }} viewers</div>
              </div>
            </div>
            <div class="pr-3 text-gray-300">›</div>
          </RouterLink>
        </div>
        <RouterLink :to="`/search/articles?q=${encodeURIComponent(query)}`" class="block mt-2 text-xs text-blue-600 font-semibold">
          ALL ARTICLES ({{ articlesCount }})
        </RouterLink>
      </section>
    </div>

    <!-- Footer -->
    <div class="px-6 py-4 border-t">
      <RouterLink
        :to="`/search/all?q=${encodeURIComponent(query)}`"
        class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md py-3"
      >
        ALL RESULTS ({{ totalCount }})
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted, onBeforeUnmount, ref } from 'vue'

type Job = { id: string; title: string; company: string; logo: string; to: string }
type User = { id: string; name: string; subtitle: string; avatar: string; to: string }
type Article = { id: string; title: string; views: string; thumb: string; to: string }

const props = defineProps<{
  open: boolean
  top: number 
  left: number
  width: number
  query: string
  jobs: Job[]
  users: User[]
  articles: Article[]
  jobsCount: number
  usersCount: number
  articlesCount: number
  totalCount: number
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const panelEl = ref<HTMLElement | null>(null)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

const onDocClick = (e: MouseEvent) => {
  const el = panelEl.value
  if (el && !el.contains(e.target as Node)) emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('mousedown', onDocClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('mousedown', onDocClick)
})
</script>
