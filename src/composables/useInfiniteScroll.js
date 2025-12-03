import { nextTick, ref } from 'vue'
import { usePostStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'

export function useInfiniteScroll() {
  const { currentPage } = storeToRefs(usePostStore())
  const { getPosts } = usePostStore()

  const observer = ref(null)

  const uploadPosts = async function () {
    currentPage.value++

    const data = await getPosts({
      page: currentPage.value,
    })

    if (data.length == 0) {
      return
    }
  }

  const observeLastRow = function () {
    const lastRow = ref(document.querySelector('#lastRow'))

    if (lastRow.value && observer.value) {
      observer.value.observe(lastRow.value)
    }
  }

  const observerInit = async function () {
    observer.value = new IntersectionObserver(async ([entry]) => {
      if (entry && entry.isIntersecting) {
        await observer.value.unobserve(entry.target)
        await nextTick()
        await uploadPosts()
      }
    })

    observeLastRow()
  }

  const observerDisconnect = function () {
    if (observer.value) {
      observer.value.disconnect()
    }
  }

  return {
    observerInit,
    observerDisconnect,
    observeLastRow,
  }
}
