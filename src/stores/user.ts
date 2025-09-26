import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { User } from '../types/types';
export const useUserStore = defineStore('user',()=> {
  const user = ref<User|undefined>();

  const isLoggedIn = computed(() => {
    console.log('user',user.value)
    return Boolean(user.value)
    }
  )
  const setUser = (u:User)=>{
    user.value = u
  }
  return {
    user: user,
    isLoggedIn: isLoggedIn,
    setUser
  }


  // state: () => ({
  //   currentUser: null as null | User,
  //   isLoggedIn: false,
  // }),
  // actions: {
  //   setUser(user: User) {
  //     this.currentUser = user
  //     this.isLoggedIn = true
  //   },
  //   logout() {
  //     this.currentUser = null
  //     this.isLoggedIn = false
  //   }
  // }
})