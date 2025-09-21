import { ref } from 'vue'
import { fetchFeedPosts } from '../services/fakeApi'

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

export function useFeedData() {
  const posts = ref<Post[]>([])

  async function load() {
    posts.value = await fetchFeedPosts()
  }

  return { posts, load }
}

