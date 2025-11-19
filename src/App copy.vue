<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TablePlaceholder from '@/components/errors/TablePlaceholder.vue'
import ModalUser from '@/components/ModalUser.vue'
import TheTable from '@/components/TheTable/TheTable.vue'
import CustomTableRow from '@/components/TheTable/CustomTableRow.vue'
import { TableBody, TableRow, TableCell } from './components/ui/table'
import { Button } from './components/ui/button'

import { onBeforeMount } from 'vue'
import { usePostStore } from './stores/postsStore'
import { usePost } from './composables/usePosts'
import { useUsers } from './composables/useUsers'
import { useUsersStore } from './stores/usersStore'
import { useFetchStore } from './stores/fetchStore'

const postStore = usePostStore()
const usersStore = useUsersStore()
const fetchStore = useFetchStore()

const { getUsers } = useUsers()
const { getPosts, findPosts } = usePost()

// onBeforeMount(async () => {
//   await getUsers()
//   await getPosts(0, 30)
// })

async function checking() {
  // alert('check')
  // console.log('check log')
  // fetchStore.isLoading = true
  // setTimeout(() => {
  //   fetchStore.isLoading = false
  // }, 2000)
  // await getPosts()
}
</script>

<template>
  <Button @click="checking" class="absolute top-4 left-4">Check button</Button>
  <div class="w-full h-screen flex justify-center items-center bg-blue-100">
    <div
      class="flex flex-col gap-4 max-w-[600px] w-full max-h-[600px] h-full rounded-lg overflow-hidden bg-[white] p-1"
    >
      <TheHeader @filter="findPosts" />
      <div
        v-if="isLoadingPosts || isPostsListEmpty"
        class="w-full h-full flex justify-center items-center"
      >
        <Spinner v-if="isLoadingPosts" />
        <span v-if="!isLoadingPosts && isPostsListEmpty"> Нет подходящих записей. </span>
      </div>
      <TheTable v-else />
    </div>
  </div>
  <ModalUser v-if="usersStore.showUserCard" :user="usersStore.currentUser" />
</template>
