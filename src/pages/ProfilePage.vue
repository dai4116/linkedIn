<template>
  <div class="max-w-5xl mx-auto p-6 text-gray-800">
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
    <section class="bg-white shadow mt-6 rounded-lg p-6">
      <h2 class="font-semibold text-lg mb-2">About</h2>
      <p>
        I'm more experienced in eCommerce web projects and mobile banking apps,
        but also like to work with creative projects, such as landing pages or unusual corporate websites.
      </p>
    </section>

    <!-- Projects -->
    <section class="bg-white shadow mt-6 rounded-lg p-6">
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

    <!-- Skills -->
    <section class="bg-white shadow mt-6 rounded-lg p-6">
      <h2 class="font-semibold text-lg mb-2">Skills & Endorsements</h2>
      <div class="flex gap-4">
        <div v-for="skill in skills" :key="skill.name" class="bg-gray-100 rounded px-3 py-1 text-sm">
          {{ skill.name }} ({{ skill.count }})
        </div>
      </div>
    </section>

    <!-- Experience -->
    <section class="bg-white shadow mt-6 rounded-lg p-6">
      <h2 class="font-semibold text-lg mb-2">Experience</h2>
      <div v-for="exp in experience" :key="exp.title" class="mb-4">
        <p class="font-bold">{{ exp.title }}</p>
        <p class="text-sm text-gray-500">{{ exp.company }} · {{ exp.time }}</p>
        <p class="text-sm mt-1">{{ exp.desc }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const projects = [
  {
    title: 'Zara redesign concept',
    category: 'UX/UI design',
    image: 'https://via.placeholder.com/300x200?text=Zara',
  },
  {
    title: 'SCHTØN event brand identity',
    category: 'Graphic design',
    image: 'https://via.placeholder.com/300x200?text=Safe+Place',
  },
  {
    title: 'Drozd brand identity',
    category: 'Graphic design',
    image: 'https://via.placeholder.com/300x200?text=Drozd',
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
</script>

<style scoped>
</style>