<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
    <div class="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6">
      <div class="space-y-4">
        <input
          v-model="account" type="text" placeholder="請輸入帳號"
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
import { auth } from '../services/fakeApi';
import router from '../router';
import BaseButton from '../components/common/BaseButton.vue';


const account = ref("")
const message = ref("")
const {setUser} = useUserStore()


async function handleLogin() {
  const accountValue = account.value.trim()
  if(!accountValue) {
    message.value = "請輸入帳號"
    return
  }

  const { user, token } = await auth(accountValue)

  if(user) {
    setUser(user)
    localStorage.setItem('userId', user.id.toString())
    if (token?.token) {
      localStorage.setItem('token', token.token)
    }
    message.value = "登入成功"

     setTimeout(() => {
      router.push('/');
    }, 500);
  } else {
     message.value = "登入失敗"
  }
}

// 產生 token 的輔助函式
// function generateRandomString(length: number = 20): string {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return result;
// }
</script>
