// import { useFetch } from '@/composables/useFetch'
// import { usePostStore } from '@/stores/postsStore'
// import { URL_POSTS, URL_FILTERED_POSTS } from '@/data/constants'
// import { useFetchStore } from '@/stores/fetchStore'

// export function usePost() {
//   const postStore = usePostStore()
//   const fetchStore = useFetchStore()
//   const { getData, data } = useFetch()

//   const getPosts = async function (startIndex = 0, endIndex = 100) {
//     if (postStore.postCache.has('')) {
//       postStore.posts = postStore.postCache.get('')
//     } else {
//       await getData(`${URL_POSTS}?_start=${startIndex}&_limit=${endIndex}`)
//       // await getData(URL_POSTS)

//       if (!fetchStore.errors) {
//         postStore.posts = data.value
//         postStore.postCache.set('', postStore.posts)
//       }
//     }
//   }

//   const findPosts = async function (filterWord) {
//     if (postStore.postCache.has(filterWord)) {
//       postStore.posts = postStore.postCache.get(filterWord)
//     } else {
//       await getData(URL_FILTERED_POSTS, filterWord)

//       if (!fetchStore.errors) {
//         postStore.posts = data.value
//         postStore.postCache.set(filterWord, postStore.posts)
//       }
//     }
//   }

//   return { getPosts, findPosts }
// }
