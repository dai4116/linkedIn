// Simple mock APIs to simulate async server calls

import { Token, User, type Article, type Job, type Post, type Search, type Group, Comment } from "../types/types"


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

const randomUsers: User[] = [
  { id: 10, account: 'alex_dev', name: 'Alex Johnson', title: 'Fullstack Engineer', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: 11, account: 'sarah_m', name: 'Sarah Miller', title: 'Marketing Lead', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { id: 12, account: 'mike_t', name: 'Mike Thompson', title: 'Data Scientist', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { id: 13, account: 'linda_w', name: 'Linda White', title: 'HR Manager', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 14, account: 'james_k', name: 'James Knight', title: 'DevOps Specialist', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
]

const commentPool = [
  "Great post! Totally agree with your point.",
  "Thanks for sharing this, very helpful.",
  "I have a slightly different view, but this is interesting.",
  "Could you elaborate more on the second point?",
  "This is exactly what I needed to read today!",
  "Amazing insights, keep it up!",
  "Interesting perspective, thanks for the update."
]

function generateRandomComments(count: number): any[] {
  return Array.from({ length: count }).map((_, i) => {
    const user = randomUsers[Math.floor(Math.random() * randomUsers.length)]
    return {
      id: Date.now() + Math.random(),
      author: { ...user },
      time: `${Math.floor(Math.random() * 23) + 1}h ago`,
      content: commentPool[Math.floor(Math.random() * commentPool.length)]
    }
  })
}

export const postsArr: Post[] = [
  {
    id: 1,
    author: {
      id: 2,
      account: 'banana02',
      name: 'Theresa Steward',
      title: 'iOS developer',
      avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    time: '2h ago',
    content:
      "What did the Dursleys care if Harry lost his place on the House Quidditch team because he hadn’t practiced all summer? …",
    likes: 42,
    comments: 2,
    liked: false,
    commentList: generateRandomComments(2)
  },
  {
    id: 2,
    author: {
      id: 1,
      account: 'apple01',
      name: 'apple',
      title: 'Senior Web Developer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    time: '5h ago',
    content: "Just finished a major project using Vue 3 and Tailwind. The developer experience is just amazing! #vuejs #webdev",
    likes: 128,
    comments: 3,
    liked: true,
    commentList: generateRandomComments(3)
  },
  {
    id: 3,
    author: {
      id: 3,
      account: 'cherry03',
      name: 'Cherry Blossom',
      title: 'Product Manager',
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
    },
    time: '1d ago',
    content: "We are looking for a talented UX Designer to join our team in Moscow. DM me if you're interested!",
    likes: 15,
    comments: 1,
    liked: false,
    commentList: generateRandomComments(1)
  }
]

export async function fetchFeedPosts(): Promise<Post[]> {
  await delay(350)
  return JSON.parse(JSON.stringify(postsArr))
}

const randomContents = [
  "Networking is not just about connecting people. It's about connecting people with people, people with ideas, and people with opportunities.",
  "Excited to share that I've started a new position as a Lead Architect! Looking forward to this new journey.",
  "Does anyone have recommendations for a good UI/UX online course? Looking to level up my skills this summer.",
  "Remote work is not a trend, it's a shift in how we think about productivity and work-life balance.",
  "Had an amazing time speaking at the Tech Conference today. Thanks to everyone who attended my session on scalability!"
]

export async function fetchMorePosts(): Promise<Post[]> {
  await delay(600)
  // Generate 3 completely unique posts
  return Array.from({ length: 3 }).map((_, i) => {
    const user = randomUsers[Math.floor(Math.random() * randomUsers.length)]
    const commentCount = Math.floor(Math.random() * 4) + 1
    return {
      id: Date.now() + Math.random(),
      author: { ...user },
      time: `${Math.floor(Math.random() * 5) + 2}d ago`,
      content: randomContents[Math.floor(Math.random() * randomContents.length)],
      likes: Math.floor(Math.random() * 200),
      comments: commentCount,
      liked: false,
      commentList: generateRandomComments(commentCount)
    }
  })
}

export async function createPost(post: Post): Promise<Post> {
  await delay(500)
  // Deep clone to prevent frontend modifications from mutating the mock DB directly
  postsArr.unshift(JSON.parse(JSON.stringify(post)))
  return post
}

export async function togglePostLike(postId: number): Promise<void> {
  await delay(200)
  // In a mock environment with optimistic UI updates and Hot-Module-Reloading,
  // mutating the backend array based on its current state can cause sync issues 
  // if the frontend object reference was preserved.
  // Since the frontend handles the optimistic update correctly, we simply resolve.
  return Promise.resolve()
}


export const userList: User[] = [
  {
    id: 1,
    account: 'apple01',
    name: 'apple',
    title: 'apple title',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    account: 'banana02',
    name: 'banana',
    title: 'banana title',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
]

export async function getUserAccount(account: string):Promise<User | undefined> {
  await delay(350)
  return userList.find(item => item.account === account)
}

export async function getUserById(id: number): Promise<User | undefined> {
  await delay(200)
  return userList.find(item => item.id === id)
}

export const tokenList: Token[] = [
  {
    userId: 1,
    token: 'abc123',
    time: 10,
  },
]

export function getToken(tokenStr: string): Token | undefined {
  return tokenList.find(item => item.token === tokenStr)
}

export async function auth(account: string) {
  let user = await getUserAccount(account)
  if(user) {
    let token = tokenList.find(item => item.userId === user.id)
    return {user,token}
  }
  return {user:undefined,token:undefined}

}

export async function fetchGroups(): Promise<Group[]> {
  await delay(300)
  return [
    { name: 'Moscow State Linguistical University', avatar: 'https://randomuser.me/api/portraits/women/47.jpg' },
    { name: 'Digital freelancers group', avatar: 'https://randomuser.me/api/portraits/women/48.jpg' },
    { name: 'Interaction design association', avatar: 'https://randomuser.me/api/portraits/women/49.jpg' },
    { name: 'Vue.js Developers', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'UI/UX Research', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Creative Coders', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Tech Startup Network', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { name: 'Design Systems Collective', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  ]
}

export async function fetchHashtags(): Promise<string[]> {
  await delay(200)
  return ['work', 'business', 'hr', 'ux', 'ui', 'freelance']
}
