<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

defineProps(['posts'])
</script>

<template>
  <Table>
    <TableHeader class="sticky top-0 bg-[white]">
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Заголовок</TableHead>
        <TableHead>Автор</TableHead>
        <TableHead>Контент</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="post in posts" :key="post?.id">
        <TableCell>
          {{ post?.id }}
        </TableCell>
        <TableCell>
          {{ post?.title }}
        </TableCell>
        <TableCell>
          {{ post?.userId }}
        </TableCell>
        <TableCell>
          {{ post?.body }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
