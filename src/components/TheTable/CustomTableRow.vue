<script setup>
import { useUsersStore } from '@/stores/users'
import { TableRow, TableCell } from '../ui/table'
import { computed } from 'vue'
import { usePostStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'

const usersStore = useUsersStore()
const postStore = usePostStore()

const props = defineProps(['post', 'index'])

const { posts } = storeToRefs(postStore)

const userEmail = computed(() => usersStore.users?.[props.post?.userId - 1]['email'])

function handleClick() {
  usersStore.setCurrentUser(props.post?.userId - 1)
}

const lastEl = computed(() => {
  return posts.value.length
})

const lastRow = computed(() => {
  return lastEl.value - 1 == props.index ? 'lastRow' : null
})
</script>

<template>
  <TableRow :id="lastRow">
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
