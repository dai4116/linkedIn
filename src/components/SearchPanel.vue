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
          <MediaListItem
            v-for="job in jobs"
            :key="job.id"
            :to="job.to"
            :img-src="job.logo"
            img-class="w-7 h-7 rounded"
            :title="job.title"
            :subtitle="job.company"
          />
        </div>
        <RouterLink :to="`/search/jobs?q=${encodeURIComponent(query)}`" class="block mt-2 text-xs text-blue-600 font-semibold">
          ALL JOBS ({{ jobsCount }})
        </RouterLink>
      </section>

      <!-- USERS -->
      <section>
        <h3 class="text-[11px] tracking-wide text-gray-400 font-semibold">USERS</h3>
        <div class="mt-2 space-y-2">
          <MediaListItem
            v-for="u in users"
            :key="u.id"
            :to="u.to"
            :img-src="u.avatar"
            img-class="w-9 h-9 rounded-full"
            :title="u.name"
            :subtitle="u.subtitle"
          />
        </div>
        <RouterLink :to="`/search/users?q=${encodeURIComponent(query)}`" class="block mt-2 text-xs text-blue-600 font-semibold">
          ALL USERS ({{ usersCount }})
        </RouterLink>
      </section>

      <!-- ARTICLES -->
      <section>
        <h3 class="text-[11px] tracking-wide text-gray-400 font-semibold">ARTICLES</h3>
        <div class="mt-2">
          <MediaListItem
            v-for="a in articles"
            :key="a.id"
            :to="a.to"
            :img-src="a.thumb"
            img-class="w-16 h-12 rounded object-cover"
            :title="a.title"
            :subtitle="`${a.views} viewers`"
          />
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
import { ref } from 'vue'
import { useEscapeKey } from '../composables/useEscapeKey'
import { useClickOutside } from '../composables/useClickOutside'
import type { Job, User, Article } from '../types/search'
import MediaListItem from './common/MediaListItem.vue'

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

useEscapeKey(() => emit('close'))
useClickOutside(panelEl, () => emit('close'))
</script>
