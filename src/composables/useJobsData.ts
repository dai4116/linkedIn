import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchJobArticles, fetchMySearches, fetchNewJob, fetchTrackedArr } from '../services/fakeApi'
import type { Article, Job, Search } from '../types/types'



export function useJobsData() {
  const tracked = ref<Job[]>([])
  const newJobs = ref<Job[]>([])
  const mySearches = ref<Search[]>([])
  const articles = ref<Article[]>([])
  
  const loading = ref(false)
  const error = ref<string | null>(null)

  const trackedJobs = computed(() => tracked.value.slice(0, 2))
  const route = useRoute()
  const jobId = Number(route.params.jobId)
  const userId = Number(route.params.userId)

  async function load() {
    loading.value = true
    error.value = null
    try {
      const [jf, nj, ms, arts] = await Promise.all([
        fetchTrackedArr(jobId,userId),
        fetchNewJob(jobId,userId),
        fetchMySearches(),
        fetchJobArticles(),
      ])
      tracked.value = jf
      // Handle the case where fetchNewJob might return a single Job or undefined
      // Based on the code in Jobs.vue, it's treated as an array
      newJobs.value = Array.isArray(nj) ? nj : (nj ? [nj] : [])
      mySearches.value = ms
      articles.value = arts
    } catch (e) {
      error.value = 'Failed to load jobs data.'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return { 
    tracked, 
    newJobs, 
    mySearches, 
    articles, 
    trackedJobs, 
    loading, 
    error, 
    load 
  }
}

