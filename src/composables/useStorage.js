import { usePostStore } from '@/stores/postsStore'

export function useStorage() {
  const postStore = usePostStore()

  const setCacheToLS = () => {
    const cached = Array.from(postStore.cache.entries())
    const stringifyCache = JSON.stringify(cached)
    window.localStorage.setItem('cache', stringifyCache)
  }

  const getCacheToLS = () => {
    const cacheFromLS = window.localStorage.getItem('cache')
    postStore.cache = new Map(JSON.parse(cacheFromLS))
  }

  return {
    setCacheToLS,
    getCacheToLS,
  }
}
