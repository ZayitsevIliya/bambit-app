// import { useFetchStore } from '@/stores/fetchStore'
// import { shallowRef } from 'vue'

// export function useFetch() {
//   const fetchStore = useFetchStore()
//   const data = shallowRef([])

//   const timer = 100

//   const controller = new AbortController()

//   const getData = async (URL, filterWord = '') => {
//     try {
//       setTimeout(() => controller.abort(), timer)

//       fetchStore.isLoading = true
//       const response = await fetch(URL + filterWord, { signal: controller.signal })
//       data.value = await response.json()
//     } catch (err) {
//       fetchStore.errors = err
//     } finally {
//       fetchStore.isLoading = false
//     }
//   }

//   return { data, getData }
// }
