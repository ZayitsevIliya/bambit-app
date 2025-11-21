<script setup>
import { Table, TableHeader, TableHead, TableBody, TableRow } from '@/components/ui/table'
import CustomTableRow from './CustomTableRow.vue'
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/posts'

const postStore = usePostStore()
const { posts } = storeToRefs(postStore)
</script>

<template>
  <Table>
    <TableHeader class="sticky top-0 bg-[white]">
      <TableRow>
        <TableHead class="text-center">ID</TableHead>
        <TableHead class="text-center">Заголовок</TableHead>
        <TableHead class="text-center">Автор</TableHead>
        <TableHead class="text-center">Контент</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <CustomTableRow v-for="(post, index) in posts" :index :post :key="index" />
    </TableBody>
  </Table>
</template>
