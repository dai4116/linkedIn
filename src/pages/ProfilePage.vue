<template>
  <div class="max-w-5xl mx-auto p-6 text-gray-800">
    <!-- 兩欄佈局：左 主要內容，右 側欄 -->
    <div class="flex flex-col lg:flex-row gap-6">

      <!-- 左：主內容 -->
      <div class="flex-1 space-y-6">
        <!-- Header -->
        <div class="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <img class="w-24 h-24 rounded-full object-cover" src="https://i.pravatar.cc/150?img=32" alt="avatar" />
          <div class="flex-1">
            <h1 class="text-2xl font-bold">Dmitry Kargaev</h1>
            <p class="text-gray-500">Freelance UX/UI Designer · 80+ projects</p>
            <p class="text-sm text-gray-400">Saint Petersburg, Russia</p>
            <div class="mt-2 space-x-2">
              <button class="bg-blue-600 text-white px-4 py-1 rounded">Contact Info</button>
              <button class="border border-blue-600 text-blue-600 px-4 py-1 rounded">1,043 Connections</button>
            </div>
          </div>
        </div>

        <!-- About -->
        <section class="bg-white shadow mt-6 rounded-lg">
          <!-- Tabs -->
          <div class="flex border-b">
            <button v-for="tab in tabs" :key="tab.key" class="flex-1 py-3 text-center font-medium" :class="[
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800',
              tab.key === 'profile' ? 'rounded-tl-lg' : '',
              tab.key === 'articles' ? 'rounded-tr-lg' : ''
            ]" @click="activeTab = tab.key">
              {{ tab.label }}
            </button>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- PROFILE -->
            <div v-if="activeTab === 'profile'">
              <h2 class="font-semibold text-lg mb-2">About</h2>
              <p class="text-gray-700">
                I'm more experienced in eCommerce web projects and mobile banking apps,
                but also like to work with creative projects, such as landing pages or unusual corporate websites.
              </p>
              <a href="#" class="text-blue-600 text-sm font-medium uppercase mt-4 inline-block">
                SEE MORE
              </a>
            </div>

            <!-- ACTIVITY & INTERESTS -->
            <div v-else-if="activeTab === 'activity'">
              <h2 class="font-semibold text-lg mb-2">Activity &amp; Interests</h2>
              <p class="text-gray-700">
                Message..
              </p>
            </div>

            <!-- ARTICLES -->
            <div v-else-if="activeTab === 'articles'">
              <h2 class="font-semibold text-lg mb-2">Articles (3)</h2>
              <ul class="list-disc list-inside text-gray-700 space-y-1">
                <li><a href="#" class="text-blue-600 hover:underline">Article Title 1</a></li>
                <li><a href="#" class="text-blue-600 hover:underline">Article Title 2</a></li>
                <li><a href="#" class="text-blue-600 hover:underline">Article Title 3</a></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Projects -->
        <section class="bg-white shadow rounded-lg p-6">
          <h2 class="font-semibold text-lg mb-4">Projects</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="project in projects" :key="project.title" class="rounded overflow-hidden border">
              <img :src="project.image" alt="" class="w-full h-32 object-cover" />
              <div class="p-2">
                <p class="font-semibold">{{ project.title }}</p>
                <p class="text-sm text-gray-500">{{ project.category }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills & Endorsements -->
        <section class="bg-white shadow rounded-lg p-6">
          <h2 class="font-semibold text-lg mb-2">Skills & Endorsements</h2>
          <div class="flex gap-4">
            <div v-for="skill in skills" :key="skill.name" class="bg-gray-100 rounded px-3 py-1 text-sm">
              {{ skill.name }} ({{ skill.count }})
            </div>
          </div>
        </section>

        <!-- Experience -->
        <section class="bg-white shadow rounded-lg p-6">
          <h2 class="font-semibold text-lg mb-2">Experience</h2>
          <div v-for="exp in experience" :key="exp.title" class="mb-4">
            <p class="font-bold">{{ exp.title }}</p>
            <p class="text-sm text-gray-500">{{ exp.company }} · {{ exp.time }}</p>
            <p class="text-sm mt-1">{{ exp.desc }}</p>
          </div>
        </section>
      </div>

      <!-- 右：側欄 -->
      <aside class="w-full lg:w-64 flex-shrink-0 space-y-6">
        <!-- Your Dashboard -->
        <section class="bg-white shadow rounded-lg p-6">
          <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Your Dashboard</h2>
          <div class="space-y-4">
            <div>
              <p class="text-3xl font-bold text-blue-600">367</p>
              <p class="text-sm text-gray-500">views today</p>
            </div>
            <div>
              <p class="text-3xl font-bold text-blue-600">15</p>
              <p class="text-sm text-gray-500">posts views</p>
            </div>
            <div>
              <p class="text-3xl font-bold text-blue-600">9</p>
              <p class="text-sm text-gray-500">search appearances</p>
            </div>
          </div>
        </section>

        <!-- Visitors -->
        <section class="bg-white shadow rounded-lg p-6">
          <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Visitors</h2>
          <ul class="space-y-4">
            <li v-for="v in visitors" :key="v.name" class="flex items-center gap-3">
              <img :src="v.avatar" alt="" class="w-8 h-8 rounded-full object-cover" />
              <div class="text-sm">
                <p class="font-medium">{{ v.name }}</p>
                <p class="text-gray-500">{{ v.role }}</p>
              </div>
            </li>
          </ul>
          <button class="mt-4 text-blue-600 text-sm font-medium">View All</button>
        </section>

        <!-- You May Like These Courses -->
        <section class="bg-white shadow rounded-lg p-6">
          <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">You May Like These Courses</h2>
          <ul class="space-y-4">
            <li v-for="c in courses" :key="c.title" class="flex gap-3">
              <img :src="c.image" alt="" class="w-12 h-8 object-cover rounded" />
              <div class="text-sm">
                <p class="font-medium">{{ c.title }}</p>
                <p class="text-gray-500">{{ c.views }} viewers</p>
              </div>
            </li>
          </ul>
          <button class="mt-4 text-blue-600 text-sm font-medium">See All Recommendations</button>
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const projects = [
  {
    title: 'Zara redesign concept',
    category: 'UX/UI design',
    image: 'https://picsum.photos/seed/zara/300/200',
  },
  {
    title: 'SCHTØN event brand identity',
    category: 'Graphic design',
    image: 'https://picsum.photos/seed/event-poster/300/200',
  },
  {
    title: 'Drozd brand identity',
    category: 'Graphic design',
    image: 'https://picsum.photos/seed/line-art/300/200',
  },
]

const skills = [
  { name: 'User Experience (UX)', count: 6 },
  { name: 'User Interface (UI)', count: 7 },
  { name: 'Brand Identity', count: 5 },
]

const experience = [
  {
    title: 'Freelance UX/UI Designer',
    company: 'Self-employed',
    time: 'Jan 2016 – Present · 8 yrs',
    desc: 'Worked with clients and studios as freelancer. Specialized in eCommerce and mobile banking apps.',
  },
  {
    title: 'UX/UI Designer',
    company: 'Upwork · Freelancer',
    time: 'Jun 2019 – Present',
    desc: 'Now experienced with Upwork system. Work includes UX/UI design, branding, research.',
  },
]

const visitors = [
  { name: 'Darlene Black', role: 'HR-manager, 10 000 connections', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Theresa Steward', role: 'iOS developer', avatar: 'https://randomuser.me/api/portraits/women/47.jpg' },
  { name: 'Brandon Wilson', role: 'Senior UX designer', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { name: 'Kyle Fisher', role: 'Product designer at Com…', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
  { name: 'Audrey Alexander', role: 'Team lead at Google', avatar: 'https://randomuser.me/api/portraits/women/21.jpg' },
]

const courses = [
  { title: 'UX Foundations: Prototyping', views: '27,959', image: 'https://picsum.photos/seed/portfolio-showcase/300/200' },
  { title: 'Designing with Adobe XD and pro', views: '9,122', image: 'https://picsum.photos/seed/corporate-website/300/200' },
  { title: 'UX Foundations: Styles and GUIs', views: '13,458', image: 'https://picsum.photos/seed/mobile-banking-app/300/200' },
]

const tabs = [
  { key: 'profile', label: 'PROFILE' },
  { key: 'activity', label: 'ACTIVITY & INTERESTS' },
  { key: 'articles', label: 'ARTICLES (3)' },
] as const

const activeTab = ref<'profile' | 'activity' | 'articles'>('profile')
</script>

<style scoped></style>