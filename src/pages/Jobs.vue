<template>
  <div v-if="isLoggedIn" class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <main class="lg:col-span-2 space-y-6">
        <!-- 錯誤提示 -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span class="block sm:inline">{{ error }}</span>
          <button @click="load" class="ml-4 underline font-bold">Retry</button>
        </div>

        <Card as="div" class="p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4">
          <div class="uppercase text-xs font-semibold text-gray-500">YOUR DREAM JOB IS HERE</div>
          <div class="relative w-full lg:flex-1">
            <input type="text" placeholder="Search jobs"
              class="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none" />
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </Card>

        <!-- Jobs For You -->
        <section>
          <div class="flex items-center justify-center text-gray-500 uppercase text-xs mb-4">JOBS FOR YOU</div>
          <div class="space-y-4">
            <template v-if="loading && tracked.length === 0">
              <Card v-for="i in 2" :key="i" class="p-4 grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-8 items-center gap-4 animate-pulse">
                <div class="w-10 h-10 bg-gray-200 rounded-lg sm:col-span-1"></div>
                <div class="sm:col-span-4 lg:col-span-6 space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </Card>
            </template>
            <template v-else>
              <Card v-for="job in tracked" :key="job.id" as="div"
                class="p-4 grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-8 items-center gap-4">
                <img :src="job.logo" alt="" class="w-10 h-10 object-cover rounded-lg sm:col-span-1 lg:col-span-1" />
                <div class="sm:col-span-4 lg:col-span-6 space-y-1">
                  <h5 class="font-semibold text-gray-800">{{ job.title }}</h5>
                  <p class="text-sm text-gray-500">{{ job.company }} · {{ job.location }}</p>
                  <p class="text-xs text-gray-500 truncate">{{ job.description }}</p>
                </div>
                <BaseButton class="sm:col-span-1 lg:col-span-1 w-full sm:w-auto mt-2 sm:mt-0 sm:justify-self-end"
                  size="sm">MORE</BaseButton>
              </Card>
              <div v-if="tracked.length === 0 && !loading" class="text-center py-4 text-gray-500 text-sm">
                No jobs found for you.
              </div>
            </template>
          </div>
        </section>

        <!-- New Jobs -->
        <section>
          <div class="flex items-center justify-center text-gray-500 uppercase text-xs mb-4">NEW JOBS</div>
          <div class="space-y-4">
            <template v-if="loading && newJobs.length === 0">
              <Card v-for="i in 2" :key="i" class="p-4 grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-8 items-center gap-4 animate-pulse">
                <div class="w-10 h-10 bg-gray-200 rounded-lg sm:col-span-1"></div>
                <div class="sm:col-span-4 lg:col-span-6 space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </Card>
            </template>
            <template v-else>
              <Card v-for="job in newJobs" :key="job.id" as="div"
                class="p-4 grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-8 items-center gap-4">
                <img :src="job.logo" alt="" class="w-10 h-10 object-cover rounded-lg sm:col-span-1 lg:col-span-1" />
                <div class="sm:col-span-4 lg:col-span-6 space-y-1">
                  <h5 class="font-semibold text-gray-800">{{ job.title }}</h5>
                  <p class="text-sm text-gray-500">{{ job.company }} · {{ job.location }}</p>
                  <p class="text-xs text-gray-500 truncate">{{ job.description }}</p>
                </div>
                <BaseButton class="sm:col-span-1 lg:col-span-1 w-full sm:w-auto mt-2 sm:mt-0 sm:justify-self-end"
                  size="sm">MORE</BaseButton>
              </Card>
              <div v-if="newJobs.length === 0 && !loading" class="text-center py-4 text-gray-500 text-sm">
                No new jobs found.
              </div>
            </template>
          </div>
        </section>
      </main>

      <aside class="space-y-6">
        <BaseButton block>POST A JOB</BaseButton>

        <Card as="div" class="p-4">
          <div class="flex justify-between items-center mb-2">
            <h6 class="font-semibold text-gray-800">MY SEARCHES</h6>
            <button class="text-blue-600 text-sm">EDIT LIST</button>
          </div>
          <div v-if="loading && mySearches.length === 0" class="space-y-2 animate-pulse">
            <div v-for="i in 3" :key="i" class="h-10 bg-gray-100 rounded-lg"></div>
          </div>
          <ul v-else class="space-y-2">
            <li v-for="search in mySearches" :key="search.id"
              class="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
              <div>
                <div class="font-medium text-gray-800 text-sm">
                  {{ search.title }}<span v-if="search.count" class="ml-1 text-blue-600">+{{ search.count }}</span>
                </div>
                <div class="text-xs text-gray-500">{{ search.location }}</div>
              </div>
              <component :is="search.alertOn ? BellIcon : BellSlashIcon" class="w-4 h-4 text-gray-500" />
            </li>
          </ul>
        </Card>

        <Card as="div" class="p-4">
          <h6 class="font-semibold text-gray-800 mb-2 uppercase text-xs">TRACKED JOBS</h6>
          <div v-if="loading && trackedJobs.length === 0" class="space-y-2 animate-pulse">
            <div v-for="i in 2" :key="i" class="h-8 bg-gray-100 rounded-lg"></div>
          </div>
          <ul v-else class="space-y-2">
            <li v-for="job in trackedJobs" :key="job.id" class="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg">
              <img :src="job.logo" alt="" class="w-6 h-6 object-cover rounded-lg" />
              <span class="text-sm text-gray-800 truncate">{{ job.title }}</span>
            </li>
          </ul>
        </Card>

        <Card as="div" class="p-4">
          <h6 class="font-semibold text-gray-800 mb-2 uppercase text-xs">ARTICLES FOR YOU</h6>
          <div v-if="loading && articles.length === 0" class="space-y-4 animate-pulse">
            <div v-for="i in 3" :key="i" class="flex items-center">
              <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div class="ml-3 flex-1 space-y-2">
                <div class="h-3 bg-gray-200 rounded w-full"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
          <ul v-else class="space-y-4">
            <li v-for="article in articles" :key="article.id" class="flex items-start">
              <img :src="article.image" alt="" class="w-12 h-12 object-cover rounded-lg" />
              <div class="ml-3">
                <h6 class="text-sm font-medium text-gray-800 leading-snug">{{ article.title }}</h6>
                <p class="text-xs text-gray-500 mt-1">{{ article.views }} viewers</p>
              </div>
            </li>
          </ul>
        </Card>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import BaseButton from '../components/common/BaseButton.vue'
import Card from '../components/common/Card.vue'
import { useUserStore } from '../stores/user';
import {
  MagnifyingGlassIcon,
  BellIcon,
  BellSlashIcon
} from '@heroicons/vue/24/outline'
import { useJobsData } from '../composables/useJobsData'
import router from '../router';

const { tracked, newJobs, mySearches, articles, trackedJobs, loading, error, load } = useJobsData()

const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)

onMounted(async () => {
  if (!isLoggedIn.value) {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      router.push('/login')
      return
    }
  }
  await load()
})
</script>

<style scoped></style>
