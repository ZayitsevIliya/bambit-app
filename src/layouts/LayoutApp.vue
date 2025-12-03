<script setup>
import TheHeader from '@/components/TheHeader.vue'
import ModalUser from '@/components/ModalUser.vue'
import ToggleMode from '@/components/ToggleMode.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'
import TheTable from '@/components/TheTable/TheTable.vue'

import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/posts'
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()
const postStore = usePostStore()

const { isLoading, isPostsListEmpty } = storeToRefs(postStore)
const { currentUser } = storeToRefs(usersStore)

onMounted(async () => {
  await postStore.getPosts()
})
</script>

<template>
  <ToggleMode />
  <div class="w-full h-screen flex justify-center items-center">
    <div
      class="relative flex flex-col gap-4 max-w-[600px] w-full max-h-[600px] h-full overflow-hidden rounded-lg bg-card p-1"
    >
      <TheHeader @filter="postStore.getPosts" :loader="isLoading" />
      <TheTable />
      <div
        v-if="isLoading || isPostsListEmpty"
        class="absolute top-16 w-full h-full flex justify-center items-center bg-muted"
      >
        <Spinner v-if="isLoading" />
        <div v-else>
          <span v-if="isPostsListEmpty"> Нет подходящих записей. </span>
        </div>
      </div>
    </div>
  </div>
  <ModalUser :user="currentUser" />
</template>
