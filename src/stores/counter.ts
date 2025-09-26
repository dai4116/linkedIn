import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Job } from '../types/types';
export const useCounterStore = defineStore ('counter', () => {
  const job = ref<Job>(new Job());

  return {
    job: job,
  }
})