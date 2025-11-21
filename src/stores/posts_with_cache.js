import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFetch } from '@/composables/useFetch'

export const usePostStore = defineStore('posts', () => {
  const currentPage = ref(0)
  const posts = ref([])
  const errors = ref(null)
  const isLoading = ref(false)

  const tempFilterWord = ref('')

  const ALL_POSTS_KEY = ''
  const ELEMENT_ON_PAGE = 30

  const postCache = ref(new Map())

  const isPostsListEmpty = computed(() => false)

  function generateGetPostsUrl(filterWord = '', startIndex = 0, limit = 100) {
    return `https://jsonplaceholder.typicode.com/posts?title_like=${filterWord}&_start=${startIndex}&_limit=${limit}`
  }

  const pagenation = function (page) {
    const startIndex = page * ELEMENT_ON_PAGE
    const limit = ELEMENT_ON_PAGE

    return {
      startIndex,
      limit,
    }
  }

  const { getData } = useFetch()

  const getPosts = async function (options = {}) {
    const {
      filterWord = ALL_POSTS_KEY || tempFilterWord.value,
      page = 0,
      isNewSearch = false,
    } = options

    const { startIndex, limit } = pagenation(page)

    const url = generateGetPostsUrl(filterWord, startIndex, limit)

    const cached = ref(postCache.value.get(filterWord) ?? false)

    const isActualCache = cached.value && cached.value.length >= startIndex + limit

    if (isActualCache) {
      console.log('From cache: ', cached.value)
      posts.value = cached.value
      return
    }

    const data = await getData(url, { isLoading, errors })

    console.log('data: ', data)

    if (isNewSearch) {
      posts.value = []
    }

    if (data && !errors.value) {
      posts.value.push(...data)
      postCache.value.set(filterWord, posts.value)
    }
  }

  return {
    posts,
    tempFilterWord,
    currentPage,
    errors,
    isLoading,
    postCache,
    isPostsListEmpty,
    getPosts,
  }
})
