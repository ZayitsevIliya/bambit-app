import { useFetch } from '@/composables/useFetch'
import { usePostStore } from '@/stores/postsStore'
import { URL_POSTS, URL_FILTERED_POSTS } from '@/constants'

export function usePost() {
  const postStore = usePostStore()
  const { getData, data, errors } = useFetch()

  const getAllPosts = async function () {
    if (postStore.postCache.has('')) {
      postStore.posts = postStore.postCache.get('')
    } else {
      await getData(URL_POSTS)

      if (!errors.value) {
        postStore.posts = data.value
        postStore.postCache.set('', postStore.posts)
      }
    }
  }

  const findPosts = async function (filterWord) {
    if (postStore.postCache.has(filterWord)) {
      postStore.posts = postStore.postCache.get(filterWord)
    } else {
      await getData(URL_FILTERED_POSTS, filterWord)

      if (!errors.value) {
        postStore.posts = data.value
        postStore.postCache.set(filterWord, postStore.posts)
      }
    }
  }

  return { getAllPosts, findPosts }
}
