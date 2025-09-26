<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6 grid gap-6">
      <main class="space-y-6">
        <div v-if="job" class="bg-white shadow rounded-lg p-6 p-4 flex flex-col lg:flex-row items-stretch lg:items-center">
          {{ job.title }}
        </div>
        <div v-if="job" class="bg-white shadow rounded-lg p-6 p-4 flex flex-col lg:flex-row items-stretch lg:items-center">
          {{ job.description }}
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { fetchNewJob, newJobsArr } from "../services/fakeApi.ts"
  import { useRoute } from "vue-router"
  import { useUserStore } from "../stores/user.ts"
  import { onMounted, ref } from "vue"
  import { Job } from "../types/types.ts"

  const route = useRoute()
  const jobId = Number(route.params.jobId)
  const {user} = useUserStore()
  const job = ref<Job>(new Job())

  onMounted(async() => {
    let result = await fetchNewJob(jobId, user.id) 
    if(result) {
      job.value = result
    } else {
      job.value.title = 'not found'
      job.value.description = 'not found'
    }
  })

</script>


<style scoped>
</style>