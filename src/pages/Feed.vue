<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Card from '../components/common/Card.vue'
import BaseButton from '../components/common/BaseButton.vue'
import SidebarProfile from '../components/SidebarProfile.vue'
import MyGroups from '../components/MyGroups.vue'
import Hashtags from '../components/Hashtags.vue'
import { useFeedData } from '../composables/useFeedData'
import { useUserStore } from '../stores/user'
import type { Post } from '../types/types'

const userStore = useUserStore()
const currentUser = computed(() => userStore.user)

const newPostText = ref('')
const sortBy = ref<'trending' | 'recent'>('recent')

const { posts, loading, error, load, addPost, toggleLike } = useFeedData()

onMounted(() => { void load() })

// 計算排序後的貼文
const sortedPosts = computed(() => {
  const postsCopy = [...posts.value]
  if (sortBy.value === 'recent') {
    return postsCopy.sort((a, b) => b.id - a.id)
  }
  return postsCopy.sort((a, b) => b.likes - a.likes)
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
    liked: false
  }

  await addPost(newPost)
  newPostText.value = ''
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
              v-model="newPostText"
              placeholder="What's on your mind?"
              class="w-full h-24 p-3 border rounded resize-none focus:outline-none"
              :disabled="loading && posts.length === 0"
            ></textarea>
            <div class="flex justify-end mt-2">
              <BaseButton variant="primary" size="sm" @click="submitPost" :disabled="!currentUser || loading">
                {{ loading ? 'Posting...' : 'Post' }}
              </BaseButton>
            </div>
          </Card>

          <!-- 排序功能 -->
          <div class="flex justify-end items-center text-sm text-gray-500">
            <span>SORT BY:</span>
            <select v-model="sortBy" class="ml-2 border rounded px-2 py-1">
              <option value="trending">Trending</option>
              <option value="recent">Recent</option>
            </select>
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
            <Card
              v-for="post in sortedPosts"
              :key="post.id"
              as="article"
              class="p-6 space-y-3"
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
                class="w-full rounded"
              />

              <footer class="flex items-center text-sm text-gray-600 space-x-6 border-t pt-3">
                <button 
                  class="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                  :class="{'text-blue-600 font-bold': post.liked}"
                  @click="toggleLike(post.id)"
                >
                  <span>👍</span>
                  <span>{{ post.likes }}</span>
                  <span>{{ post.liked ? 'Liked' : 'Like' }}</span>
                </button>
                <button class="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                  <span>💬</span>
                  <span>{{ post.comments }}</span>
                  <span>Comment</span>
                </button>
                <button class="ml-auto text-blue-600 font-semibold hover:underline">Share</button>
              </footer>
            </Card>

            <!-- 沒貼文時的狀態 -->
            <div v-if="posts.length === 0 && !loading" class="text-center py-10 text-gray-500">
              No posts found.
            </div>
          </template>
        </main>

        <aside class="w-full flex-shrink-0 space-y-6">
          <SidebarProfile />
          <MyGroups />
          <Hashtags />
          
          <Card>
            <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Trending Articles</h2>
            <ul class="space-y-1 text-sm">
              <li>• How I make cool designs?</li>
              <li>• Advices for young HR-managers</li>
              <li>• A little about usability testing</li>
            </ul>
          </Card>
        </aside>
    </div>
  </div>
</template>
