<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- <div class="flex flex-col lg:flex-row gap-6"> -->
        <main class="lg:col-span-2 space-y-6">
          <!-- 新貼文區 -->
          <Card>
            <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">NEW POST</h2>
            <textarea
              v-model="newPostText"
              placeholder="What's on your mind?"
              class="w-full h-24 p-3 border rounded resize-none focus:outline-none"
            ></textarea>
            <div class="flex justify-end mt-2">
              <BaseButton variant="primary" size="sm" @click="submitPost">Post</BaseButton>
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

          <!-- 動態渲染貼文列表 -->
          <Card
            v-for="post in sortedPosts"
            :key="post.id"
            as="article"
            class="p-6 space-y-3"
          >
            <header class="flex items-center space-x-3">
              <img
                :src="post.author.avatar"
                class="w-10 h-10 rounded-full"
              />
              <div>
                <p class="font-semibold">{{ post.author.name }}</p>
                <p class="text-xs text-gray-500">{{ post.author.title }}</p>
              </div>
            </header>

            <p class="text-sm text-gray-700">{{ post.content }}</p>

            <img
              v-if="post.image"
              :src="post.image"
              class="w-full rounded"
            />

            <footer class="flex items-center text-sm text-gray-600 space-x-6">
              <span>👍 {{ post.likes }}</span>
              <span>💬 {{ post.comments }}</span>
              <button class="ml-auto text-blue-600 font-semibold">Share</button>
            </footer>
          </Card>
        </main>

        <aside class="w-full flex-shrink-0 space-y-6">
        <Card class="text-center space-y-2">
          <img src="https://randomuser.me/api/portraits/men/47.jpg" class="w-20 h-20 rounded-full mx-auto"/>
          <p class="font-bold">Dmitry Kargaev</p>
          <p class="text-xs text-gray-500">
            Freelance UX/UI designer, 800+ projects in web & mobile. Open to offers.
          </p>
          <BaseButton class="w-full" size="sm">Write New Article</BaseButton>
        </Card>

        <Card>
          <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">My Groups</h2>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center space-x-2">
              <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="" class="w-8 h-8 rounded-full object-cover" />
              <span>Moscow State Linguistical University</span>
            </li>
            <li class="flex items-center space-x-2">
              <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="" class="w-8 h-8 rounded-full object-cover" />
              <span>Digital freelancers group</span>
            </li>
            <li class="flex items-center space-x-2">
              <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="" class="w-8 h-8 rounded-full object-cover" />
              <span>Interaction design association</span>
            </li>
          </ul>
          <button class="text-blue-600 mt-2 text-xs">Show All (8)</button>
        </Card>

        <Card>
          <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Followed Hashtags</h2>
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="bg-gray-100 px-2 py-1 rounded">#work</span>
            <span class="bg-gray-100 px-2 py-1 rounded">#business</span>
            <span class="bg-gray-100 px-2 py-1 rounded">#hr</span>
            <span class="bg-gray-100 px-2 py-1 rounded">#ux</span>
            <span class="bg-gray-100 px-2 py-1 rounded">#ui</span>
            <span class="bg-gray-100 px-2 py-1 rounded">#freelance</span>
          </div>
        </Card>

        <Card>
          <h2 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Trending Articles</h2>
          <ul class="space-y-1 text-sm">
            <li>• How I make cool designs?</li>
            <li>• Advices for young HR-managers</li>
            <li>• A little about usability testing</li>
          </ul>
        </Card>
        </aside>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Card from '../components/common/Card.vue'
import BaseButton from '../components/common/BaseButton.vue'
import { useFeedData } from '../composables/useFeedData'

interface Author {
  id: number
  name: string
  title: string
  avatar: string
}
interface Post {
  id: number
  author: Author
  time: string
  content: string
  image?: string
  likes: number
  comments: number
}

const currentUser: Author = {
  id: 0,
  name: 'You',
  title: 'Frontend Engineer',
  avatar: 'https://i.pravatar.cc/40?img=32'
}

const newPostText = ref('')

const sortBy = ref<'trending' | 'recent'>('recent')

const { posts, load } = useFeedData()

onMounted(() => { void load() })

// 計算排序後的貼文
const sortedPosts = computed(() => {
  if (sortBy.value === 'recent') {
    return posts.value.sort((a, b) => b.id - a.id)
  }
  // 先照 id 排
  return posts.value.sort((a, b) => b.likes - a.likes)
})

function submitPost() {
  const txt = newPostText.value.trim()
  if (!txt) return

  const newPost: Post = {
    id: Date.now(),
    author: currentUser,
    time: 'Just now',
    content: txt,
    likes: 0,
    comments: 0
  }

  posts.value.unshift(newPost)

  newPostText.value = ''
}
</script>
