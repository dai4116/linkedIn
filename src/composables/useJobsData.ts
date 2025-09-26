import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchJobArticles, fetchMySearches, fetchNewJob, fetchTrackedArr } from '../services/fakeApi'
import type { Article, Job, Search } from '../types/types'



export function useJobsData() {
  const tracked = ref<Job[]>([])
  const newJobs = ref<Job[]>([])
  const mySearches = ref<Search[]>([])
  const articles = ref<Article[]>([])

  const trackedJobs = computed(() => tracked.value.slice(0, 2))
  const route = useRoute()
  const jobId = Number(route.params.jobId)
  const userId = Number(route.params.userId)

  async function load() {

    const [jf, nj, ms, arts] = await Promise.all([
      fetchTrackedArr(jobId,userId),
      fetchNewJob(jobId,userId),
      fetchMySearches(),
      fetchJobArticles(),
    ])
    tracked.value = jf
    newJobs.value = nj
    mySearches.value = ms
    articles.value = arts
  }

  return { tracked: tracked, newJobs, mySearches, articles, trackedJobs, load }
}

