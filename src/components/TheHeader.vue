<script setup>
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { usePostStore } from '@/stores/posts'

const emits = defineEmits(['filter'])
const postsStore = usePostStore()

defineProps(['loader'])

const inputFilter = ref('')

function search() {
  postsStore.tempFilterWord = inputFilter.value
  emits('filter', { filterword: inputFilter.value, isNewSearch: true })
  inputFilter.value = ''
}
</script>

<template>
  <form class="flex justify-around p-1">
    <Input class="w-[70%]" v-model="inputFilter"></Input>
    <Button :disabled="loader" @click.prevent="search">Поиск</Button>
  </form>
</template>
