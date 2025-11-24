import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFetch } from '@/composables/useFetch'

export const usePostStore = defineStore('posts', () => {
  const currentPage = ref(0)
  const posts = ref([])
  const errors = ref(null)
  const isLoading = ref(false)

  const filterWord = ref('')

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
    const { page = 0, isNewSearch = false } = options

    if (isNewSearch) {
      posts.value = []
      currentPage.value = 0
    }

    const { startIndex, limit } = pagenation(page)

    console.log('filter: ', filterWord.value)

    const url = generateGetPostsUrl(filterWord.value, startIndex, limit)

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
    currentPage,
    errors,
    isLoading,
    filterWord,
    isPostsListEmpty,
    getPosts,
  }
})
