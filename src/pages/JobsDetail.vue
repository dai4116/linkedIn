<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6 max-w-4xl">
      <!-- 錯誤提示 -->
      <div v-if="error" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span class="block sm:inline">{{ error }}</span>
        <BaseButton size="sm" variant="outline" class="ml-4" @click="goBack">Go Back</BaseButton>
      </div>

      <main class="space-y-6">
        <!-- Loading Skeleton -->
        <template v-if="loading">
          <Card class="p-8 space-y-6 animate-pulse">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div class="flex-1 space-y-3">
                <div class="h-6 bg-gray-200 rounded w-1/3"></div>
                <div class="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
            <div class="space-y-4 pt-6 border-t">
              <div v-for="i in 5" :key="i" class="h-4 bg-gray-200 rounded" :style="{ width: `${100 - i * 5}%` }"></div>
            </div>
          </Card>
        </template>

        <!-- Job Content -->
        <template v-else-if="job && job.id !== 0">
          <Card class="p-8">
            <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div class="flex items-center space-x-4">
                <img :src="job.logo || 'https://picsum.photos/seed/job/64'" class="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                <div>
                  <h1 class="text-2xl font-bold text-gray-800">{{ job.title }}</h1>
                  <p class="text-gray-600 font-medium">{{ job.company }} · {{ job.location }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <BaseButton variant="primary">Apply Now</BaseButton>
                <BaseButton variant="outline">Save Job</BaseButton>
              </div>
            </header>

            <div class="prose max-w-none text-gray-700 leading-relaxed border-t pt-8">
              <h3 class="text-lg font-semibold mb-4 text-gray-800 uppercase tracking-wider text-xs">Job Description</h3>
              <p class="whitespace-pre-wrap">{{ job.description }}</p>
            </div>
          </Card>
          
          <Card class="p-6">
            <h3 class="text-sm font-semibold mb-4 text-gray-500 uppercase">About the Company</h3>
            <div class="flex items-center space-x-4">
              <img :src="job.logo" class="w-12 h-12 rounded shadow-sm" />
              <div>
                <p class="font-semibold text-gray-800">{{ job.company }}</p>
                <p class="text-sm text-gray-500">5,001-10,000 employees</p>
              </div>
            </div>
          </Card>
        </template>
        
        <!-- Not Found State -->
        <template v-else-if="!loading">
          <Card class="p-20 text-center space-y-4">
            <div class="text-5xl">🔍</div>
            <h2 class="text-xl font-semibold text-gray-800">Job not found</h2>
            <p class="text-gray-500">The job you are looking for might have been removed or the link is broken.</p>
            <BaseButton @click="goBack">Return to Jobs</BaseButton>
          </Card>
        </template>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { fetchNewJob } from "../services/fakeApi.ts"
  import { useRoute, useRouter } from "vue-router"
  import { useUserStore } from "../stores/user.ts"
  import { onMounted, ref, computed } from "vue"
  import { Job } from "../types/types.ts"
  import Card from "../components/common/Card.vue"
  import BaseButton from "../components/common/BaseButton.vue"

  const route = useRoute()
  const router = useRouter()
  const jobId = Number(route.params.jobId)
  const userStore = useUserStore()
  const currentUser = computed(() => userStore.user)
  
  const job = ref<Job | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  function goBack() {
    router.push('/jobs')
  }

  onMounted(async() => {
    loading.value = true
    error.value = null
    try {
      // 模擬 API 延遲
      await new Promise(res => setTimeout(res, 600))
      
      const userId = currentUser.value?.id || 0
      let result = await fetchNewJob(jobId, userId) 
      if(result) {
        job.value = result
      } else {
        job.value = null
      }
    } catch (e) {
      error.value = 'Failed to load job details.'
      console.error(e)
    } finally {
      loading.value = false
    }
  })

</script>