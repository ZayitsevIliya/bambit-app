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

    if (isNewSearch) {
      console.log('posts before: ', posts.value)

      posts.value = []
      console.log('posts after: ', posts.value)
      currentPage.value = 0
    }

    const { startIndex, limit } = pagenation(page)

    const url = generateGetPostsUrl(filterWord, startIndex, limit)

    let data = await getData(url, { isLoading, errors })

    const newPosts = data

    console.log('data: ', data)

    if (data && !errors.value) {
      posts.value.push(...data)
      data = null
    }

    return newPosts
  }

  return {
    posts,
    tempFilterWord,
    currentPage,
    errors,
    isLoading,

    isPostsListEmpty,
    getPosts,
  }
})
