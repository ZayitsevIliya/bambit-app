import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'

export const usePostStore = defineStore('posts', () => {
  const posts = shallowRef([])
  const errors = ref(null)
  const isLoading = ref(false)
  const postCache = ref(new Map())

  const isPostsListEmpty = computed(() => posts.value == 0)

  return { posts, errors, isLoading, postCache, isPostsListEmpty }
})
