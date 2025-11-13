import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('posts', () => {
  const posts = ref([])

  return { posts }
})
