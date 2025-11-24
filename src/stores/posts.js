import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch'

export const usePostStore = defineStore('posts', () => {
  const currentPage = ref(0)
  const posts = ref([])
  const errors = ref(null)
  const isLoading = ref(false)
  const sortKey = ref(null)
  const isPostsListEmpty = ref(false)

  const filterWord = ref('')

  const ELEMENT_ON_PAGE = 30

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

  function sortColumn(key) {
    if (key) {
      sortKey.value = key
      return posts.value.sort((a, b) => a[key].localeCompare(b[key]))
    }
    sortKey.value = null
    return posts.value.sort((a, b) => a.id - b.id)
  }

  const { getData } = useFetch()

  const getPosts = async function (options = {}) {
    const { page = 0, isNewSearch = false } = options

    isPostsListEmpty.value = false

    if (isNewSearch) {
      posts.value = []
      currentPage.value = 0
    }

    const { startIndex, limit } = pagenation(page)

    const url = generateGetPostsUrl(filterWord.value, startIndex, limit)

    let data = await getData(url, { isLoading, errors })

    if (data.length == 0 && posts.value.length == 0) {
      isPostsListEmpty.value = true
    }

    const newPosts = data

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
    sortColumn,
  }
})
