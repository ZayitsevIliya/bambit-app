import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { URL_POSTS, URL_FILTERED_POSTS } from '@/data/constants'
import { useFetch } from '@/composables/useFetch'

export const usePostStore = defineStore('posts', () => {
  const currentPage = ref(0)
  const posts = ref([])
  const errors = ref(null)
  const isLoading = ref(false)

  const postCache = ref(new Map())

  const isPostsListEmpty = computed(() => false)

  const pagenation = function (page) {
    const ELEMENT_ON_PAGE = 30
    const startIndex = page * ELEMENT_ON_PAGE
    const limit = ELEMENT_ON_PAGE

    return {
      startIndex,
      limit,
    }
  }

  const { getData } = useFetch()

  // const getPosts = async function (page) {
  //   const { startIndex, limit } = pagenation(page)

  //   if (postCache.value.has('')) {
  //     const cached = postCache.value.get('')
  //     posts.value = cached

  //     console.log('cache: ', cached)
  //   } else {
  //     const data = await getData(`${URL_POSTS}?_start=${startIndex}&_limit=${limit}`, '', {
  //       isLoading,
  //       errors,
  //     })

  //     if (data && !errors.value) {
  //       console.log('data: ', data)

  //       posts.value.push(...data)
  //       postCache.value.set('', posts.value)
  //     }
  //   }
  // }

  const getPosts = async function (page) {
    const { startIndex, limit } = pagenation(page)

    const cached = ref(postCache.value.get('') ?? null)

    if (cached.value) {
      if (cached.value.length < startIndex + limit) {
        const data = await getData(`${URL_POSTS}?_start=${startIndex}&_limit=${limit}`, '', {
          isLoading,
          errors,
        })

        if (data && !errors.value) {
          // console.log('data: ', data)

          posts.value.push(...data)
          postCache.value.set('', posts.value)
        }
      } else {
        posts.value = cached.value
        // console.log('data from cache')
      }
    } else {
      const data = await getData(`${URL_POSTS}?_start=${startIndex}&_limit=${limit}`, '', {
        isLoading,
        errors,
      })

      if (data && !errors.value) {
        // console.log('data: ', data)

        posts.value.push(...data)
        postCache.value.set('', posts.value)
      }

      // console.log('posts after fetch', posts.value)
    }
  }

  const findPosts = async function (filterWord) {
    if (postCache.value.has(filterWord)) {
      posts.value = postCache.value.get(filterWord)
      // console.log('cache: ', postCache.value.get(filterWord))
    } else {
      const data = await getData(URL_FILTERED_POSTS, filterWord, { isLoading, errors })

      if (data && !errors.value) {
        posts.value = data
        postCache.value.set(filterWord, posts.value)
      }
    }
  }

  return { posts, currentPage, errors, isLoading, postCache, isPostsListEmpty, getPosts, findPosts }
})
