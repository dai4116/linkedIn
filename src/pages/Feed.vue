<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import Card from '../components/common/Card.vue'
import BaseButton from '../components/common/BaseButton.vue'
import SidebarProfile from '../components/SidebarProfile.vue'
import MyGroups from '../components/MyGroups.vue'
import Hashtags from '../components/Hashtags.vue'
import { useFeedData } from '../composables/useFeedData'
import { useUserStore } from '../stores/user'
import { useSearchStore } from '../stores/search'
import { fetchJobArticles } from '../services/fakeApi'
import type { Post, Article, Comment } from '../types/types'

const userStore = useUserStore()
const { user: currentUser } = storeToRefs(userStore)

const searchStore = useSearchStore()
const { searchQuery } = storeToRefs(searchStore)

const newPostText = ref('')
const sortBy = ref<'trending' | 'recent'>('recent')
const isPostSuccess = ref(false)
const trendingArticles = ref<Article[]>([])

// 留言狀態管理
const openComments = reactive<Record<number, boolean>>({})
const commentTexts = reactive<Record<number, string>>({})

const { posts, loading, loadingMore, error, hasMore, load, loadMore, addPost, toggleLike, addComment } = useFeedData()

onMounted(async () => {
  void load()
  trendingArticles.value = await fetchJobArticles()
})

// 計算過濾與排序後的貼文
const filteredAndSortedPosts = computed(() => {
  let result = [...posts.value]
  
  // 搜尋過濾
  const kw = searchQuery.value.trim().toLowerCase()
  if (kw) {
    result = result.filter(p => 
      p.content.toLowerCase().includes(kw) || 
      p.author.name.toLowerCase().includes(kw)
    )
  }

  // 排序
  if (sortBy.value === 'recent') {
    return result.sort((a, b) => b.id - a.id)
  }
  return result.sort((a, b) => b.likes - a.likes)
})

async function submitPost() {
  const txt = newPostText.value.trim()
  if (!txt || !currentUser.value) return

  const newPost: Post = {
    id: Date.now(),
    author: currentUser.value,
    time: 'Just now',
    content: txt,
    likes: 0,
    comments: 0,
    liked: false,
    commentList: []
  }

  // 1. 執行加入貼文
  await addPost(newPost)
  newPostText.value = ''

  // 2. 顯示按鈕成功狀態
  isPostSuccess.value = true
  
  // 3. 2秒後恢復原狀
  setTimeout(() => {
    isPostSuccess.value = false
  }, 2000)
}

const toggleCommentSection = (postId: number) => {
  openComments[postId] = !openComments[postId]
}

const submitComment = (postId: number) => {
  const txt = commentTexts[postId]?.trim()
  if (!txt || !currentUser.value) return

  const newComment: Comment = {
    id: Date.now(),
    author: currentUser.value,
    time: 'Just now',
    content: txt
  }

  addComment(postId, newComment)
  commentTexts[postId] = ''
}

const handleShare = (post: Post) => {
  const shareText = `Check out this post by ${post.author.name}: ${post.content.substring(0, 50)}...`
  if (navigator.share) {
    navigator.share({
      title: 'LinkedIn Post',
      text: shareText,
      url: window.location.href,
    }).catch(console.error)
  } else {
    // Fallback: Copy to clipboard or alert
    navigator.clipboard.writeText(`${shareText} \n ${window.location.href}`)
    alert('Link copied to clipboard!')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <main class="lg:col-span-2 space-y-6">
          <!-- 錯誤提示 -->
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span class="block sm:inline">{{ error }}</span>
            <button @click="load" class="ml-4 underline font-bold">Retry</button>
          </div>

          <!-- 新貼文區 -->
          <Card>
            <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">NEW POST</h2>
            <textarea
              id="main-post-input"
              v-model="newPostText"
              placeholder="What's on your mind?"
              class="w-full h-24 p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              :disabled="loading && posts.length === 0"
            ></textarea>
            <div class="flex justify-end mt-2">
              <BaseButton 
                variant="primary" 
                size="sm" 
                @click="submitPost" 
                :disabled="!currentUser || loading || isPostSuccess"
                :class="[
                  'transition-all duration-300 min-w-[80px]',
                  isPostSuccess ? '!bg-green-600 !border-green-600 !text-white' : ''
                ]"
              >
                <template v-if="loading">Posting...</template>
                <template v-else-if="isPostSuccess">
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Posted!
                  </span>
                </template>
                <template v-else>Post</template>
              </BaseButton>
            </div>
          </Card>

          <!-- 排序功能 -->
          <div class="flex justify-between items-center text-sm text-gray-500">
            <div v-if="searchQuery" class="font-medium text-blue-600">
              Showing results for: "{{ searchQuery }}"
            </div>
            <div class="ml-auto flex items-center">
              <span>SORT BY:</span>
              <select v-model="sortBy" class="ml-2 border rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="trending">Trending</option>
                <option value="recent">Recent</option>
              </select>
            </div>
          </div>

          <!-- Loading Skeletons -->
          <template v-if="loading && posts.length === 0">
            <Card v-for="i in 3" :key="i" class="p-6 space-y-4 animate-pulse">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/6"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div class="h-40 bg-gray-200 rounded w-full"></div>
            </Card>
          </template>

          <!-- 動態渲染貼文列表 -->
          <template v-else>
            <transition-group name="list" tag="div" class="space-y-6">
              <Card
                v-for="post in filteredAndSortedPosts"
                :key="post.id"
                as="article"
                class="p-6 space-y-3 hover:shadow-md transition-shadow overflow-hidden"
              >
                <header class="flex items-center space-x-3">
                  <img
                    :src="post.author.avatar"
                    class="w-10 h-10 rounded-full bg-gray-100"
                  />
                  <div>
                    <p class="font-semibold">{{ post.author.name }}</p>
                    <p class="text-xs text-gray-500">{{ post.author.title }}</p>
                  </div>
                </header>

                <p class="text-sm text-gray-700 leading-relaxed">{{ post.content }}</p>

                <img
                  v-if="post.image"
                  :src="post.image"
                  class="w-full rounded mt-2"
                />

                <footer class="flex items-center text-sm text-gray-600 space-x-6 border-t pt-3 mt-4">
                  <button 
                    class="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                    :class="{'text-blue-600 font-bold': post.liked}"
                    @click="toggleLike(post.id)"
                  >
                    <span>👍</span>
                    <span>{{ post.likes }}</span>
                    <span>{{ post.liked ? 'Liked' : 'Like' }}</span>
                  </button>
                  <button 
                    @click="toggleCommentSection(post.id)"
                    class="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                    :class="{'text-blue-600 font-bold': openComments[post.id]}"
                  >
                    <span>💬</span>
                    <span>{{ post.comments }}</span>
                    <span>Comment</span>
                  </button>
                  <button 
                    @click="handleShare(post)"
                    class="ml-auto text-blue-600 font-semibold hover:underline"
                  >
                    Share
                  </button>
                </footer>

                <!-- 留言區塊 -->
                <div v-if="openComments[post.id]" class="mt-4 pt-4 border-t space-y-4 bg-gray-50 -mx-6 px-6 pb-4">
                  <!-- 留言列表 -->
                  <div v-if="post.commentList && post.commentList.length > 0" class="space-y-4">
                    <div v-for="comment in post.commentList" :key="comment.id" class="flex space-x-2">
                      <img :src="comment.author.avatar" class="w-8 h-8 rounded-full" />
                      <div class="flex-1 bg-white p-2 rounded-lg text-sm shadow-sm">
                        <div class="flex justify-between">
                          <span class="font-semibold">{{ comment.author.name }}</span>
                          <span class="text-xs text-gray-500">{{ comment.time }}</span>
                        </div>
                        <p class="text-gray-700 mt-1">{{ comment.content }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- 寫新留言 -->
                  <div class="flex items-center space-x-2">
                    <img :src="currentUser?.avatar" class="w-8 h-8 rounded-full" />
                    <div class="flex-1 relative">
                      <input 
                        v-model="commentTexts[post.id]"
                        @keyup.enter="submitComment(post.id)"
                        placeholder="Add a comment..."
                        class="w-full pl-3 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                      />
                      <button 
                        @click="submitComment(post.id)"
                        class="absolute right-3 top-2 text-blue-600 font-semibold text-xs"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </transition-group>

            <!-- 載入更多 -->
            <div v-if="hasMore" class="flex justify-center pt-4">
              <BaseButton 
                variant="outline" 
                @click="loadMore" 
                :disabled="loadingMore"
                class="w-full max-w-xs"
              >
                {{ loadingMore ? 'Loading more...' : 'Load More' }}
              </BaseButton>
            </div>

            <!-- 沒貼文時的狀態 -->
            <div v-if="filteredAndSortedPosts.length === 0 && !loading" class="text-center py-10 text-gray-500 bg-white rounded-lg border border-dashed">
              No posts found matching your criteria.
            </div>
          </template>
        </main>

        <aside class="w-full flex-shrink-0 space-y-6">
          <SidebarProfile />
          <MyGroups />
          <Hashtags />
          
          <Card>
            <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Trending Articles</h2>
            <ul v-if="trendingArticles.length > 0" class="space-y-3">
              <li v-for="article in trendingArticles" :key="article.id" class="flex items-center space-x-3 group cursor-pointer">
                <img :src="article.image" class="w-12 h-12 rounded object-cover" />
                <div class="flex-1">
                  <p class="text-sm font-medium group-hover:text-blue-600 transition-colors line-clamp-2">{{ article.title }}</p>
                  <p class="text-xs text-gray-500">{{ article.views.toLocaleString() }} viewers</p>
                </div>
              </li>
            </ul>
            <p v-else class="text-sm text-gray-400">Loading articles...</p>
          </Card>
        </aside>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
