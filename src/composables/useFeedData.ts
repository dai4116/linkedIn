import { ref } from 'vue'
import { fetchFeedPosts, createPost, togglePostLike as apiToggleLike } from '../services/fakeApi'
import type { Post } from '../types/types'

export function useFeedData() {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      posts.value = await fetchFeedPosts()
    } catch (e) {
      error.value = 'Failed to load posts. Please try again later.'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function addPost(post: Post) {
    loading.value = true
    try {
      // Optimistic update
      posts.value.unshift(post)
      await createPost(post)
    } catch (e) {
      // Rollback on error
      posts.value = posts.value.filter(p => p.id !== post.id)
      error.value = 'Failed to publish post.'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function toggleLike(postId: number) {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      const originalLiked = post.liked
      const originalLikes = post.likes
      
      // UI Update
      if (post.liked) {
        post.likes--
        post.liked = false
      } else {
        post.likes++
        post.liked = true
      }

      try {
        await apiToggleLike(postId)
      } catch (e) {
        // Rollback on error
        post.liked = originalLiked
        post.likes = originalLikes
        console.error('Failed to toggle like', e)
      }
    }
  }

  return { posts, loading, error, load, addPost, toggleLike }
}

