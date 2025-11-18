import { usePostStore } from '@/stores/postsStore'
import { ref, shallowRef } from 'vue'

export function useFetch() {
  const postStore = usePostStore()
  const data = shallowRef([])
  const errors = ref(null)

  const controller = new AbortController()

  const getData = async (URL, filterWord = '') => {
    try {
      postStore.isLoading = true
      const response = await fetch(URL + filterWord, { signal: controller.signal })
      data.value = await response.json()
    } catch (err) {
      console.log(err)
      errors.value = err
    } finally {
      postStore.isLoading = false
    }
  }

  return { data, errors, getData }
}
