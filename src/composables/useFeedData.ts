import { ref } from 'vue'
import { fetchFeedPosts, fetchMorePosts, createPost, togglePostLike as apiToggleLike } from '../services/fakeApi'
import type { Post, Comment } from '../types/types'

export function useFeedData() {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<string | null>(null)
  const hasMore = ref(true)

  async function load() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchFeedPosts()
      posts.value = data
      hasMore.value = data.length > 0
    } catch (e) {
      error.value = 'Failed to load posts. Please try again later.'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function loadMore() {
    if (loadingMore.value || !hasMore.value) return
    loadingMore.value = true
    try {
      const morePosts = await fetchMorePosts()
      posts.value = [...posts.value, ...morePosts]
      
      // Stop after total 15 posts to simulate end of feed
      if (posts.value.length > 15) {
        hasMore.value = false
      }
    } catch (e) {
      console.error('Failed to load more posts', e)
    } finally {
      loadingMore.value = false
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

  async function addComment(postId: number, comment: Comment) {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      if (!post.commentList) post.commentList = []
      post.commentList.push(comment)
      post.comments = post.commentList.length
    }
  }

  return { posts, loading, loadingMore, error, hasMore, load, loadMore, addPost, toggleLike, addComment }
}

