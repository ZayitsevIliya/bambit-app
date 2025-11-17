import { useFetch } from '@/composables/useFetch'
import { URL_POSTS, URL_FILTERED_POSTS } from '@/constants'
import { usePostStore } from '@/stores/postsStore'

export function usePost() {
  const { getPosts } = useFetch()
  const postStore = usePostStore()

  const getAllPosts = async function () {
    if (postStore.cache.has('')) {
      postStore.posts = postStore.cache.get('')
    } else {
      await getPosts(URL_POSTS)
      postStore.cache.set('', postStore.posts)
    }
  }

  const findPosts = async function (filterWord) {
    if (postStore.cache.has(filterWord)) {
      postStore.posts = postStore.cache.get(filterWord)
    } else {
      await getPosts(URL_FILTERED_POSTS, filterWord)
      postStore.cache.set(filterWord, postStore.posts)
    }
  }

  return { getAllPosts, findPosts }
}
