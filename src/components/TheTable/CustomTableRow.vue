<script setup>
import { useUsersStore } from '@/stores/users'
import { TableRow, TableCell } from '../ui/table'
import { computed } from 'vue'

const usersStore = useUsersStore()
const props = defineProps(['post'])

const userEmail = computed(() => usersStore.users?.[props.post?.userId - 1]['email'])

function handleClick() {
  usersStore.setCurrentUser(props.post?.userId - 1)
}
</script>

<template>
  <TableRow>
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
