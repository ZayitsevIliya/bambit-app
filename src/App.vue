<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheTable from '@/components/TheTable.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'
import { Button } from './components/ui/button'

import { onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { usePostStore } from './stores/postsStore'
import { usePost } from './composables/usePosts'
import { useStorage } from './composables/useStorage'

const postStore = usePostStore()

const { getAllPosts, findPosts } = usePost()
const { getCacheToLS, setCacheToLS } = useStorage()

onBeforeMount(() => getCacheToLS())
onBeforeUnmount(() => setCacheToLS())

onMounted(() => {
  getAllPosts()
})

function checking() {
  // alert('check')
  // console.log('check log')
}
</script>

<template>
  <Button @click="checking" class="absolute top-4 left-4">Check button</Button>
  <div class="w-full h-screen flex justify-center items-center bg-blue-100">
    <div
      class="flex flex-col gap-4 max-w-[600px] w-full max-h-[600px] h-full rounded-lg overflow-hidden bg-[white] p-1"
    >
      <TheHeader @filter="findPosts" :loader="postStore.isLoading" />
      <div
        v-if="postStore.isLoading || postStore.isPostsListEmpty"
        class="w-full h-full flex justify-center items-center"
      >
        <Spinner v-if="postStore.isLoading" />
        <span v-if="!postStore.isLoading && postStore.isPostsListEmpty">
          Нет подходящих записей.
        </span>
      </div>
      <TheTable v-else :posts="postStore.posts" />
    </div>
  </div>
</template>
