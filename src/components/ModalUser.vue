<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useUsersStore } from '@/stores/usersStore'

const usersStore = useUsersStore()

function close() {
  usersStore.currentUser = null
}
</script>

<template>
  <div
    @click="close"
    class="absolute top-0 left-0 flex justify-center items-center w-full h-screen bg-[#6d6ebe63]"
  >
    <Card @click.stop class="w-[min(500px,80%)] p-10">
      <CardHeader>
        <CardTitle>Leanne Graham</CardTitle>
        <CardDescription>Bret</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li>
            <p>
              Website:
              <a href="http://" target="_blank" rel="noopener noreferrer"> hildegard.org </a>
            </p>
          </li>
          <li>
            <p>Company: Romaguera-Crona</p>
          </li>
          <li>
            <p>Address: Contry, City, Street, Suite</p>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <ul>
          <li>
            Email:
            <a href="mailto:">Sincere@april.biz </a>
          </li>
          <li>
            Phone:
            <a href="tel:+" class=""> 1-770-736-8031 </a>
          </li>
        </ul>
      </CardFooter>
    </Card>
  </div>
</template>
