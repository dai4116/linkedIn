import { ref, computed } from 'vue'
import { fetchJobsForYou, fetchNewJobs, fetchMySearches, fetchJobArticles } from '../services/fakeApi'

type Job = {
  id: number
  logo: string
  title: string
  company: string
  location: string
  description: string
}

type Search = {
  id: number
  title: string
  count?: number
  location: string
  alertOn: boolean
}

type Article = {
  id: number
  title: string
  image: string
  views: number
}

export function useJobsData() {
  const jobsForYou = ref<Job[]>([])
  const newJobs = ref<Job[]>([])
  const mySearches = ref<Search[]>([])
  const articles = ref<Article[]>([])

  const trackedJobs = computed(() => jobsForYou.value.slice(0, 2))

  async function load() {
    const [jf, nj, ms, arts] = await Promise.all([
      fetchJobsForYou(),
      fetchNewJobs(),
      fetchMySearches(),
      fetchJobArticles(),
    ])
    jobsForYou.value = jf
    newJobs.value = nj
    mySearches.value = ms
    articles.value = arts
  }

  return { jobsForYou, newJobs, mySearches, articles, trackedJobs, load }
}

