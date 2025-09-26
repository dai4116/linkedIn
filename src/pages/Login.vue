<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
    <div class="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6">
      <div class="space-y-4">
        <input
          v-model.number="userId" type="text" placeholder="請輸入帳號"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />

        <BaseButton @click="handleLogin" class="w-full py-2 rounded-lg ">
          登入
        </BaseButton>
      </div>

      <p v-if="message" class="text-center font-medium" :class="message.includes('成功') ? 'text-green-600' : 'text-red-600'">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { getUserId } from '../services/fakeApi';
import router from '../router';
import BaseButton from '../components/common/BaseButton.vue';


const userId = ref<number|null>(null)
const message = ref("")
const {setUser} = useUserStore()


async function handleLogin() {
  if(userId.value === null) {
    message.value = "請輸入帳號"
    return
  }

  const u = await getUserId(userId.value)

  if(u) {
    setUser(u)
    // userStore.setUser(u)
    message.value = "登入成功"

     setTimeout(() => {
      router.push('/');
    }, 500);
  } else {
     message.value = "登入失敗"
  }
}
</script>
