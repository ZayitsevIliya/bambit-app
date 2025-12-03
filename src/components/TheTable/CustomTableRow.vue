<script setup>
import { useUsersStore } from '@/stores/users'
import { TableRow, TableCell } from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import { usePostStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted } from 'vue'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'

const usersStore = useUsersStore()
const postStore = usePostStore()

const props = defineProps(['post', 'index'])

const { posts } = storeToRefs(postStore)
const user = computed(() => usersStore.usersMap[props.post?.userId])

function handleClick() {
  if (user.value) {
    usersStore.setCurrentUser(user.value)
  }
}

const postsLength = computed(() => {
  return posts.value.length
})

const isLastRow = computed(() => {
  return postsLength.value - 1 == props.index
})

if (isLastRow.value) {
  const { observerInit, observerDisconnect } = useInfiniteScroll()

  onMounted(() => {
    observerInit()
  })

  onUnmounted(() => {
    observerDisconnect()
  })
}
</script>

<template>
  <TableRow :id="isLastRow ? 'lastRow' : null">
    <TableCell>{{ post.id }}</TableCell>
    <TableCell>{{ post.title }}</TableCell>
    <TableCell class="text-center min-w-50">
      <span v-if="post.email">
        <a href="#" @click.prevent="handleClick" class="hover:text-[102%]">
          {{ post.email }}
        </a>
      </span>
      <div v-else>
        <Skeleton class="w-full h-4 rounded bg-[#f1f1f15e]" />
      </div>
    </TableCell>
    <TableCell>{{ post.body }}</TableCell>
  </TableRow>
</template>
