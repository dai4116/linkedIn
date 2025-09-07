<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-5 gap-6">
      <aside class="md:col-span-1 space-y-6">
        <div class="bg-white rounded-lg">
          <div class="divide-y divide-gray-200">
            <a href="#" class="block w-full flex items-center px-3 py-3
             border-l-4 border-blue-600 bg-blue-50
             text-gray-900 font-medium">
              Notifications
            </a>

            <a href="#" class="block w-full flex items-center px-3 py-3
             text-gray-600 hover:bg-gray-100">
              Notification Settings
            </a>
          </div>
        </div>

        <Card as="div" class="p-6">
          <h3 class="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Your Dashboard</h3>
          <div class="space-y-6">
            <div>
              <p class="text-4xl font-bold text-blue-600">367</p>
              <p class="text-sm text-gray-500">views today</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-blue-600">15</p>
              <p class="text-sm text-gray-500">post views</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-blue-600">9</p>
              <p class="text-sm text-gray-500">search appearances</p>
            </div>
          </div>
        </Card>
      </aside>

      <main class="md:col-span-4 space-y-8">
        <section>
          <h3 class="flex items-center justify-center text-gray-500 uppercase text-xs mb-4">Recent</h3>
          <ul class="space-y-4">
            <Card as="li" class="p-4 shadow-sm flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="icon" class="w-8 h-8 rounded-full" />
                <div>
                  <p class="text-sm">
                    <span class="font-medium">You appeared in 9 searches this week</span>
                  </p>
                  <p class="text-xs text-gray-400">3 hours</p>
                </div>
              </div>
              <button class="text-gray-400 hover:text-gray-600">⋯</button>
            </Card>
            <Card as="li" class="p-4 shadow-sm flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="avatar" class="w-8 h-8 rounded-full" />
                <div>
                  <p class="text-sm">
                    <span class="font-medium">Audrey Alexander and 10 others</span> viewed your profile
                  </p>
                  <p class="text-xs text-gray-400">9 hours</p>
                </div>
              </div>
              <button class="text-gray-400 hover:text-gray-600">⋯</button>
            </Card>
            <Card as="li" class="p-4 shadow-sm flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="avatar" class="w-8 h-8 rounded-full" />
                <div>
                  <p class="text-sm">
                    <span class="font-medium">Eduardo Russel and 4 others</span> liked your post
                  </p>
                  <p class="text-xs text-gray-400">12 hours</p>
                </div>
              </div>
              <button class="text-gray-400 hover:text-gray-600">⋯</button>
            </Card>
          </ul>
        </section>

        <section>
          <h3 class="flex items-center justify-center text-gray-500 uppercase text-xs mb-4">Earlier</h3>
          <ul class="space-y-4">
            <Card as="li" class="p-4 shadow-sm flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="icon" class="w-8 h-8 rounded-full" />
                <div>
                  <p class="text-sm">
                    <span class="font-medium">We found jobs that you may be interested</span>
                  </p>
                  <p class="text-xs text-gray-400">2 days ago</p>
                </div>
              </div>
              <button class="text-gray-400 hover:text-gray-600">⋯</button>
            </Card>
            <Card as="li" class="p-4 shadow-sm flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="avatar" class="w-8 h-8 rounded-full" />
                <div>
                  <p class="text-sm">
                    <span class="font-medium">Kyle Fisher and 17 others</span> viewed your profile
                  </p>
                  <p class="text-xs text-gray-400">9 hours</p>
                </div>
              </div>
              <button class="text-gray-400 hover:text-gray-600">⋯</button>
            </Card>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '../components/common/Card.vue'
</script>
