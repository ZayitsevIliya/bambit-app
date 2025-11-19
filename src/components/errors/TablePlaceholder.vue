<script setup>
import EmptyList from './EmptyList.vue'
import ServerError from './ServerError.vue'
import Spinner from '../ui/spinner/Spinner.vue'
import { usePostStore } from '@/stores/posts'
// import { useFetchStore } from '@/stores/fetchStore'
import { computed } from 'vue'
import { TableBody, TableRow, TableCell } from '../ui/table'

// const postsStore = usePostStore()
// const fetchStore = useFetchStore()

// const error = computed(() => {
//   return fetchStore.errors
// })
</script>
<template>
  <TableBody class="h-full">
    <TableRow>
      <TableCell class="bg-[red]"></TableCell>
    </TableRow>
  </TableBody>
  <div class="w-full h-[70%] flex justify-center items-center">
    <Spinner v-if="fetchStore.isLoading" />
    <div v-else-if="fetchStore.errors">
      {{ error }}
    </div>
    <!-- <Component :is="EmptyList" /> -->

    <!-- <Component :is="ServerError" /> -->
  </div>
</template>
