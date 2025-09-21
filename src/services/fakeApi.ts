// Simple mock APIs to simulate async server calls

type Job = {
  id: number
  logo: string
  title: string
  company: string
  location: string
  description: string
}

type JobSearch = {
  id: number
  title: string
  count?: number
  location: string
  alertOn: boolean
}

type JobArticle = {
  id: number
  title: string
  image: string
  views: number
}

type Author = {
  id: number
  name: string
  title: string
  avatar: string
}

type Post = {
  id: number
  author: Author
  time: string
  content: string
  image?: string
  likes: number
  comments: number
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export async function fetchJobsForYou(): Promise<Job[]> {
  await delay(400)
  return [
    {
      id: 1,
      logo: 'https://picsum.photos/seed/upwork/40',
      title: 'UX/UI designer',
      company: 'Upwork',
      location: 'Remote only',
      description: "On Upwork you'll find a range of top freelancers and agencies...",
    },
    {
      id: 2,
      logo: 'https://picsum.photos/seed/facebook/40',
      title: 'Product designer',
      company: 'Facebook',
      location: 'CA, USA',
      description: "Founded in 2004, Facebook's mission is to give people the power...",
    },
    {
      id: 3,
      logo: 'https://picsum.photos/seed/google/40',
      title: 'Part-time UX designer',
      company: 'Google',
      location: 'International',
      description: "Search the world's information, including webpages, images...",
    },
    {
      id: 4,
      logo: 'https://picsum.photos/seed/linkedin/40',
      title: 'Web designer',
      company: 'LinkedIn',
      location: 'CA, USA',
      description: "LinkedIn, the world's largest professional network...",
    },
  ]
}

export async function fetchNewJobs(): Promise<Job[]> {
  await delay(300)
  return [
    {
      id: 1,
      logo: 'https://picsum.photos/seed/instagram/40',
      title: 'UI designer',
      company: 'Instagram',
      location: 'CA, USA',
      description: 'Instagram is a photo and video-sharing social networking...',
    },
    {
      id: 2,
      logo: 'https://picsum.photos/seed/periscope/40',
      title: 'Product designer',
      company: 'Periscope',
      location: 'Remote only',
      description: 'Periscope is a live video streaming app for Android and iOS...',
    },
  ]
}

export async function fetchMySearches(): Promise<JobSearch[]> {
  await delay(250)
  return [
    { id: 1, title: 'UX/UI designer', count: 240, location: 'Remote', alertOn: false },
    { id: 2, title: 'Web designer', location: 'Los-Angeles, CA', alertOn: true },
    { id: 3, title: 'Graphic designer', location: 'Malaysia, Kuala Lumpur', alertOn: true },
  ]
}

export async function fetchJobArticles(): Promise<JobArticle[]> {
  await delay(200)
  return [
    { id: 1, title: 'The guide. Apply for a job', image: 'https://picsum.photos/seed/a/48', views: 12932 },
    { id: 2, title: 'Your dream job and how you can get it', image: 'https://picsum.photos/seed/b/48', views: 9112 },
    { id: 3, title: 'Now you know it. 15 steps to find job', image: 'https://picsum.photos/seed/c/48', views: 7221 },
  ]
}

export async function fetchFeedPosts(): Promise<Post[]> {
  await delay(350)
  return [
    {
      id: 1,
      author: {
        id: 2,
        name: 'Theresa Steward',
        title: 'iOS developer',
        avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
      },
      time: '2h ago',
      content:
        "What did the Dursleys care if Harry lost his place on the House Quidditch team because he hadn’t practiced all summer? …",
      likes: 42,
      comments: 9,
    },
  ]
}

