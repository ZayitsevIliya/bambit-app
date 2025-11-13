<script setup>
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'

const inputFilter = ref()
const result = ref()
function search() {
  result.value = inputFilter.value
}
</script>

<template>
  <header class="flex gap-2 justify-center m-10">
    <Input class="w-[50%]" v-model="inputFilter"></Input>
    <Button @click="search">Search</Button>
  </header>
</template>
