import { computed, ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('posts', () => {
  const posts = shallowRef([])
  const errors = ref(null)
  const isLoading = ref(false)
  const cache = ref(new Map())

  const isPostsListEmpty = computed(() => posts.value == 0)

  return { posts, errors, isLoading, cache, isPostsListEmpty }
})
