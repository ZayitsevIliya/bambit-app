import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch'
import { useUsers } from '@/composables/useUser'

export const usePostStore = defineStore('posts', () => {
  const currentPage = ref(0)
  const posts = ref([])
  const errors = ref(null)
  const isLoading = ref(false)
  const sortKey = ref(null)
  const isPostsListEmpty = ref(false)

  const filterWord = ref('')

  function generateGetPostsUrl(searchKey = '', startIndex = 0, limit = 100) {
    return `https://jsonplaceholder.typicode.com/posts?title_like=${searchKey}&_start=${startIndex}&_limit=${limit}`
  }

  const ELEMENT_ON_PAGE = 30

  const pagenation = function (page) {
    const startIndex = page * ELEMENT_ON_PAGE
    const limit = ELEMENT_ON_PAGE

    return {
      startIndex,
      limit,
    }
  }

  function sortColumn(key, isAscDirection) {
    sortKey.value = key
    if (key == 'id') {
      return isAscDirection
        ? posts.value.sort((a, b) => a.id - b.id)
        : posts.value.sort((a, b) => b.id - a.id)
    }

    return isAscDirection
      ? posts.value.sort((a, b) => a[key].localeCompare(b[key]))
      : posts.value.sort((a, b) => b[key].localeCompare(a[key]))
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

      const userIdCache = new Map()

      data.forEach((post) => {
        if (!userIdCache.has(post.userId)) {
          useUsers(post.userId)
          userIdCache.set(post.userId, true)
          return
        }
      })

      userIdCache.clear()

      data = null
    }

    return newPosts
  }

  return {
    posts,
    currentPage,
    sortKey,
    errors,
    isLoading,
    filterWord,
    isPostsListEmpty,
    getPosts,
    sortColumn,
  }
})
