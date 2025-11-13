<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheTable from '@/components/TheTable.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'
import { ref, onMounted } from 'vue'

// const URL_USERS = 'https://jsonplaceholder.typicode.com/users'
const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts'
const URL_FILTERED_POSTS = 'https://jsonplaceholder.typicode.com/posts?title_like='

const posts = ref([])
const loader = ref(false)
const isPostsListEmpty = ref(false)

async function getPosts(URL, filter = '') {
  loader.value = true
  let response = await fetch(URL + filter).catch((error) =>
    console.log('Что то пошло не так...', error),
  )
  let data = await response.json()
  loader.value = false
  return data
}

async function findPosts(filterWord) {
  posts.value = await getPosts(URL_FILTERED_POSTS, filterWord)
  isPostsListEmpty.value = posts.value == ''
}

onMounted(async () => (posts.value = await getPosts(URL_POSTS)))
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center bg-blue-100">
    <div
      class="flex flex-col gap-4 max-w-[600px] w-full max-h-[600px] h-full rounded-lg overflow-hidden bg-[white] p-1"
    >
      <TheHeader @filter="findPosts" :loader />
      <div v-if="loader || isPostsListEmpty" class="w-full h-full flex justify-center items-center">
        <Spinner v-if="loader" />
        <span v-if="isPostsListEmpty"> Нет подходящих записей. </span>
      </div>
      <TheTable v-else :posts />
    </div>
  </div>
</template>
