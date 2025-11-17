<script setup>
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'

const emits = defineEmits(['filter'])
defineProps(['loader'])

const inputFilter = ref('')

function search() {
  emits('filter', inputFilter.value)
  inputFilter.value = ''
}
</script>

<template>
  <form class="flex justify-around p-1">
    <Input class="w-[70%]" v-model="inputFilter"></Input>
    <Button :disabled="loader" @click.prevent="search">Поиск</Button>
  </form>
</template>
