import { usePostStore } from '@/stores/postsStore'

export function useFetch() {
  const postStore = usePostStore()

  const controller = new AbortController()

  const getPosts = async (URL, filterWord = '') => {
    try {
      postStore.isLoading = true

      const response = await fetch(URL + filterWord, { signal: controller.signal })
      postStore.posts = await response.json()
    } catch (err) {
      postStore.errors = err
      console.log(postStore.errors)
    } finally {
      postStore.isLoading = false
    }
  }

  const abortFetch = () => {
    controller.abort()
    console.log('Сервер не отвечает')
  }

  return { getPosts, abortFetch }
}
