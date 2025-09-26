// Simple mock APIs to simulate async server calls

import type { Article, Job, Post, Search, User } from "../types/types"


const trackedArr: Job[] = [
  {
    id: 1,
    userId: 1,
    logo: 'https://picsum.photos/seed/upwork/40',
    title: 'UX/UI designer',
    company: 'Upwork',
    location: 'Remote only',
    description: "On Upwork you'll find a range of top freelancers and agencies...",
  },
  {
    id: 2,
    userId: 1,
    logo: 'https://picsum.photos/seed/facebook/40',
    title: 'Product designer',
    company: 'Facebook',
    location: 'CA, USA',
    description: "Founded in 2004, Facebook's mission is to give people the power...",
  },
  {
    id: 3,
    userId: 2,
    logo: 'https://picsum.photos/seed/google/40',
    title: 'Part-time UX designer',
    company: 'Google',
    location: 'International',
    description: "Search the world's information, including webpages, images...",
  },
  {
    id: 4,
    userId: 2,
    logo: 'https://picsum.photos/seed/linkedin/40',
    title: 'Web designer',
    company: 'LinkedIn',
    location: 'CA, USA',
    description: "LinkedIn, the world's largest professional network...",
  },
]

export const newJobsArr: Job[] = [
  {
    id: 1,
    userId: 1,
    logo: 'https://picsum.photos/seed/instagram/40',
    title: 'UI designer',
    company: 'Instagram',
    location: 'CA, USA',
    description: 'Instagram is a photo and video-sharing social networking...',
  },
  {
    id: 2,
    userId: 2,
    logo: 'https://picsum.photos/seed/periscope/40',
    title: 'Product designer',
    company: 'Periscope',
    location: 'Remote only',
    description: 'Periscope is a live video streaming app for Android and iOS...',
  },
]

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export async function fetchTrackedArr(jobId: number, userId: number): Promise<Job[]> {
  await delay(400)

  return trackedArr.filter(item => item.id === jobId && item.userId === userId)
}

export async function fetchNewJob(jobId: number, userId: number): Promise<Job | undefined> {
  await delay(300)
  return newJobsArr.find(item => item.id === jobId && item.userId === userId)
}

export async function fetchMySearches(): Promise<Search[]> {
  await delay(250)
  return [
    { id: 1, title: 'UX/UI designer', count: 240, location: 'Remote', alertOn: false },
    { id: 2, title: 'Web designer', count: 0, location: 'Los-Angeles, CA', alertOn: true },
    { id: 3, title: 'Graphic designer', count: 0, location: 'Malaysia, Kuala Lumpur', alertOn: true },
  ]
}

export async function fetchJobArticles(): Promise<Article[]> {
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


export const UserList: User[] = [
  {
    id: 1,
    name: 'apple',
    title: 'apple title',
    avatar: 'apple avatar'
  },
  {
    id: 2,
    name: 'banana',
    title: 'banana title',
    avatar: 'banana avatar'
  },
]

export async function getUserId(userId: number):Promise<User | undefined> {
  await delay(350)
  return UserList.find(item => item.id === userId)
}