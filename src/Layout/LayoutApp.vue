<script setup>
import TheHeader from '@/components/TheHeader.vue'
import ModalUser from '@/components/ModalUser.vue'
import TheTable from '@/components/TheTable/TheTable.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'
import { Button } from '@/components/ui/button'

import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/posts'
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()
const postStore = usePostStore()

const { isLoading: isPostsLoading, isPostsListEmpty, currentPage } = storeToRefs(postStore)
const { isLoading: isUsersLoading, showUserCard, currentUser } = storeToRefs(usersStore)

const isLoading = computed(() => isPostsLoading.value || isUsersLoading.value)

onMounted(async () => {
  await usersStore.getUsers()
  await postStore.getPosts(currentPage.value)
})

function handleScrolling(event) {
  let value = event.target.scrollTop

  if (currentPage.value < 1 && value > 8500) {
    currentPage.value = 1

    postStore.getPosts(currentPage.value)
  }

  if (currentPage.value < 2 && value > 18500) {
    currentPage.value = 2

    postStore.getPosts(currentPage.value)
  }

  if (currentPage.value < 3 && value > 28000) {
    currentPage.value = 3

    postStore.getPosts(currentPage.value)
  }
}
function checking() {
  isPostsLoading.value = true

  setTimeout(() => {
    isPostsLoading.value = false
  }, 2000)
}
</script>

<template>
  <Button @click="checking" class="absolute top-4 left-4">Check button</Button>
  <div class="w-full h-screen flex justify-center items-center bg-blue-100">
    <div
      class="relative flex flex-col gap-4 max-w-[600px] w-full max-h-[600px] h-full rounded-lg overflow-hidden bg-[white] p-1"
    >
      <TheHeader @filter="postStore.findPosts" :loader="isLoading" />
      <TheTable @scroll="handleScrolling" />
      <div
        v-if="isLoading || isPostsListEmpty"
        class="absolute top-16 w-full h-full flex justify-center items-center bg-[#ffffffd3]"
      >
        <Spinner v-if="isLoading" />
        <div v-else>
          <span v-if="isPostsListEmpty"> Нет подходящих записей. </span>
        </div>
      </div>
    </div>
  </div>
  <ModalUser v-if="showUserCard" :user="currentUser" />
</template>
