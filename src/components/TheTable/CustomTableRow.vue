<script setup>
import { useUsersStore } from '@/stores/users'
import { TableRow, TableCell } from '../ui/table'
import { usePostStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted } from 'vue'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'

const usersStore = useUsersStore()
const postStore = usePostStore()

const props = defineProps(['post', 'index'])

const { posts } = storeToRefs(postStore)

const userEmail = computed(() => usersStore.users?.[props.post?.userId - 1]['email'])

function handleClick() {
  usersStore.setCurrentUser(props.post?.userId - 1)
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
    <TableCell class="text-center">
      <a href="#" @click.prevent="handleClick" class="hover:text-[102%]">
        {{ userEmail }}
      </a>
    </TableCell>
    <TableCell>{{ post.body }}</TableCell>
  </TableRow>
</template>
