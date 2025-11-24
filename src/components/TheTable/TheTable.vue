<script setup>
import { Table, TableHeader, TableHead, TableBody, TableRow } from '@/components/ui/table'
import CustomTableRow from './CustomTableRow.vue'
import { usePostStore } from '@/stores/posts'

const postStore = usePostStore()
</script>

<template>
  <Table>
    <TableHeader class="sticky top-0 bg-[white] shadow">
      <TableRow>
        <TableHead @click="postStore.sortColumn(null)" class="text-center">ID</TableHead>
        <TableHead @click="postStore.sortColumn('title')" class="text-center">Заголовок</TableHead>
        <TableHead @click="postStore.sortColumn('email')" class="text-center">Автор</TableHead>
        <TableHead @click="postStore.sortColumn('body')" class="text-center">Контент</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <CustomTableRow v-for="(post, index) in postStore.posts" :index :post :key="index" />
    </TableBody>
  </Table>
</template>
