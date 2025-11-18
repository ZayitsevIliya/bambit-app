<script setup>
import TheHeader from '@/components/TheHeader.vue'
import ModalUser from '@/components/ModalUser.vue'
import TheTable from '@/components/TheTable/TheTable.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'
import { Button } from './components/ui/button'

import { onBeforeMount } from 'vue'
import { usePostStore } from './stores/postsStore'
import { usePost } from './composables/usePosts'
import { useUsers } from './composables/useUsers'
import { useUsersStore } from './stores/usersStore'

const postStore = usePostStore()
const usersStore = useUsersStore()

const { getUsers } = useUsers()
const { getAllPosts, findPosts } = usePost()

onBeforeMount(async () => {
  await getUsers()
  await getAllPosts()
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
  <ModalUser v-if="usersStore.showUserCard" :user="usersStore.currentUser" />
</template>
