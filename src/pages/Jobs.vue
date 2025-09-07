<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <main class="lg:col-span-2 space-y-6">
        <Card as="div" class="p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4">
          <div class="uppercase text-xs font-semibold text-gray-500">YOUR DREAM JOB IS HERE</div>
          <div class="relative w-full lg:flex-1">
            <input
              type="text"
              placeholder="Search jobs"
              class="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none"
            />
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </Card>

        <section>
          <div class="flex items-center justify-center text-gray-500 uppercase text-xs mb-4">JOBS FOR YOU</div>
          <div class="space-y-4">
            <Card
              v-for="job in jobsForYou"
              :key="job.id"
              as="div"
              class="p-4 grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-8 items-center gap-4"
            >
              <img :src="job.logo" alt="" class="w-10 h-10 object-cover rounded-lg sm:col-span-1 lg:col-span-1" />
              <div class="sm:col-span-4 lg:col-span-6 space-y-1">
                <h5 class="font-semibold text-gray-800">{{ job.title }}</h5>
                <p class="text-sm text-gray-500">{{ job.company }} · {{ job.location }}</p>
                <p class="text-xs text-gray-500 truncate">{{ job.description }}</p>
              </div>
              <BaseButton class="sm:col-span-1 lg:col-span-1 w-full sm:w-auto mt-2 sm:mt-0 sm:justify-self-end" size="sm">MORE</BaseButton>
            </Card>
          </div>
        </section>

        <section>
          <div class="flex items-center justify-center text-gray-500 uppercase text-xs mb-4">NEW JOBS</div>
          <div class="space-y-4">
            <Card
              v-for="job in newJobs"
              :key="job.id"
              as="div"
              class="p-4 grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-8 items-center gap-4"
            >
              <img :src="job.logo" alt="" class="w-10 h-10 object-cover rounded-lg sm:col-span-1 lg:col-span-1" />
              <div class="sm:col-span-4 lg:col-span-6 space-y-1">
                <h5 class="font-semibold text-gray-800">{{ job.title }}</h5>
                <p class="text-sm text-gray-500">{{ job.company }} · {{ job.location }}</p>
                <p class="text-xs text-gray-500 truncate">{{ job.description }}</p>
              </div>
              <BaseButton class="sm:col-span-1 lg:col-span-1 w-full sm:w-auto mt-2 sm:mt-0 sm:justify-self-end" size="sm">MORE</BaseButton>
            </Card>
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
          <ul class="space-y-2">
            <li
              v-for="search in mySearches"
              :key="search.id"
              class="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
            >
              <div>
                <div class="font-medium text-gray-800">
                  {{ search.title }}<span v-if="search.count">+{{ search.count }}</span>
                </div>
                <div class="text-xs text-gray-500">{{ search.location }}</div>
              </div>
              <component
                :is="search.alertOn ? BellIcon : BellSlashIcon"
                class="w-5 h-5 text-gray-500"
              />
            </li>
          </ul>
        </Card>

        <Card as="div" class="p-4">
          <h6 class="font-semibold text-gray-800 mb-2">TRACKED JOBS</h6>
          <ul class="space-y-2">
            <li
              v-for="job in trackedJobs"
              :key="job.id"
              class="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg"
            >
              <img :src="job.logo" alt="" class="w-6 h-6 object-cover rounded-lg" />
              <span class="text-sm text-gray-800">{{ job.title }}</span>
            </li>
          </ul>
        </Card>

        <Card as="div" class="p-4">
          <h6 class="font-semibold text-gray-800 mb-2">ARTICLES FOR YOU</h6>
          <ul class="space-y-4">
            <li
              v-for="article in articles"
              :key="article.id"
              class="flex items-start"
            >
              <img
                :src="article.image"
                alt=""
                class="w-12 h-12 object-cover rounded-lg"
              />
              <div class="ml-3">
                <h6 class="text-sm font-medium text-gray-800">{{ article.title }}</h6>
                <p class="text-xs text-gray-500">{{ article.views }} viewers</p>
              </div>
            </li>
          </ul>
        </Card>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../components/common/BaseButton.vue'
import Card from '../components/common/Card.vue'
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  BellIcon,
  BellSlashIcon
} from '@heroicons/vue/24/outline'

interface Job {
  id: number
  logo: string
  title: string
  company: string
  location: string
  description: string
}
interface Search {
  id: number
  title: string
  count?: number
  location: string
  alertOn: boolean
}
interface Article {
  id: number
  title: string
  image: string
  views: number
}

const jobsForYou = ref<Job[]>([
  {
    id: 1,
    logo: 'https://picsum.photos/seed/upwork/40',
    title: 'UX/UI designer',
    company: 'Upwork',
    location: 'Remote only',
    description: "On Upwork you'll find a range of top freelancers and agencies..."
  },
  {
    id: 2,
    logo: 'https://picsum.photos/seed/facebook/40',
    title: 'Product designer',
    company: 'Facebook',
    location: 'CA, USA',
    description: "Founded in 2004, Facebook's mission is to give people the power..."
  },
  {
    id: 3,
    logo: 'https://picsum.photos/seed/google/40',
    title: 'Part-time UX designer',
    company: 'Google',
    location: 'International',
    description: "Search the world's information, including webpages, images..."
  },
  {
    id: 4,
    logo: 'https://picsum.photos/seed/linkedin/40',
    title: 'Web designer',
    company: 'LinkedIn',
    location: 'CA, USA',
    description: "LinkedIn, the world's largest professional network..."
  }
])

const newJobs = ref<Job[]>([
  {
    id: 1,
    logo: 'https://picsum.photos/seed/instagram/40',
    title: 'UI designer',
    company: 'Instagram',
    location: 'CA, USA',
    description: "Instagram is a photo and video-sharing social networking..."
  },
  {
    id: 2,
    logo: 'https://picsum.photos/seed/periscope/40',
    title: 'Product designer',
    company: 'Periscope',
    location: 'Remote only',
    description: "Periscope is a live video streaming app for Android and iOS..."
  }
])

const mySearches = ref<Search[]>([
  { id: 1, title: 'UX/UI designer', count: 240, location: 'Remote', alertOn: false },
  { id: 2, title: 'Web designer', location: 'Los-Angeles, CA', alertOn: true },
  { id: 3, title: 'Graphic designer', location: 'Malaysia, Kuala Lumpur', alertOn: true }
])

const trackedJobs = ref<Job[]>(jobsForYou.value.slice(0, 2))

const articles = ref<Article[]>([
  { id: 1, title: 'The guide. Apply for a job', image: 'https://picsum.photos/seed/a/48', views: 12932 },
  { id: 2, title: 'Your dream job and how you can get it', image: 'https://picsum.photos/seed/b/48', views: 9112 },
  { id: 3, title: 'Now you know it. 15 steps to find job', image: 'https://picsum.photos/seed/c/48', views: 7221 }
])
</script>

<style scoped>
</style>
