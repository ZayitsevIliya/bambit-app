<script setup>
import { TableHead, TableRow } from '@/components/ui/table'
import { usePostStore } from '@/stores/posts'
import { MoveDown } from 'lucide-vue-next'
import { MoveUp } from 'lucide-vue-next'
import { reactive, ref } from 'vue'

const postStore = usePostStore()

const headItem = reactive([
  {
    name: 'ID',
    field: 'id',
    hasShowIcon: true,
    isAscSort: false,
  },
  {
    name: 'Заголовок',
    field: 'title',
    hasShowIcon: false,
    isAscSort: false,
  },
  {
    name: 'Автор',
    field: 'email',
    hasShowIcon: false,
    isAscSort: false,
  },
  {
    name: 'Контент',
    field: 'body',
    hasShowIcon: false,
    isAscSort: false,
  },
])

const directFlag = ref(true)

function handleClick(column) {
  postStore.sortColumn(column.field, directFlag.value)

  headItem.forEach((item) => {
    if (item.field == postStore.sortKey) {
      item.hasShowIcon = true
    } else {
      item.hasShowIcon = false
    }
  })

  directFlag.value = !directFlag.value

  column.isAscSort = directFlag.value
}
</script>

<template>
  <TableRow>
    <TableHead v-for="item in headItem" :key="item.field" @click="handleClick(item)" class="p-0">
      <div class="flex justify-center items-center cursor-pointer hover:text-foreground">
        <div class="relative">
          <MoveDown
            v-show="item.hasShowIcon && !item.isAscSort"
            class="scale-65 absolute -top-0.5 -left-5"
          />
          <MoveUp
            v-show="item.hasShowIcon && item.isAscSort"
            class="scale-65 absolute -top-0.5 -left-5"
          />
          <span> {{ item.name }} </span>
        </div>
      </div>
    </TableHead>
  </TableRow>
</template>
