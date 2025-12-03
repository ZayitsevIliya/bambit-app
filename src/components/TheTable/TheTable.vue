<script setup>
import { Table, TableBody, TableHeader } from '@/components/ui/table'
import CustomTableRow from './CustomTableRow.vue'
import CustomHeaderRow from './CustomHeaderRow.vue'
import { usePostStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'

const { posts } = storeToRefs(usePostStore())
</script>

<template>
  <Table id="scrollCustom">
    <TableHeader class="sticky top-0 z-10 shadow bg-card">
      <CustomHeaderRow />
    </TableHeader>
    <TableBody>
      <CustomTableRow v-for="(post, index) in posts" :index :post :key="index" />
    </TableBody>
  </Table>
</template>
