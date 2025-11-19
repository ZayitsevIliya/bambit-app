<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useUsersStore } from '@/stores/users'

defineProps(['user'])

const usersStore = useUsersStore()

function close() {
  usersStore.currentUser = null
}

const defaultUser = {
  name: 'John',
  username: 'JohnDoe',
  website: 'google.com',
  company: 'Microsoft',
  address: 'New York',
  email: 'mail@mail.com',
  phone: '123456789',
}
</script>

<template>
  <div
    @click="close"
    class="absolute top-0 left-0 flex justify-center items-center w-full h-screen bg-[#6d6ebe63]"
  >
    <Card @click.stop class="w-[min(500px,80%)] p-10">
      <CardHeader>
        <CardTitle>{{ user.name || defaultUser.name }}</CardTitle>
        <CardDescription>{{ user.username || defaultUser.username }}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li>
            <p>
              Website:
              <a href="http://" target="_blank" rel="noopener noreferrer">
                {{ user.website || defaultUser.website }}
              </a>
            </p>
          </li>
          <li>
            <p>Company: {{ user.company?.name || defaultUser.company }}</p>
          </li>
          <li>
            <p>
              Address:
              <!-- {{ `${user.address?.street}, ${user.address.suite}, ${user.address?.city}` }} -->
            </p>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <ul>
          <li>
            Email:
            <a href="mailto:">{{ user.email || defaultUser.email }}</a>
          </li>
          <li>
            Phone:
            <a href="tel:+" class=""> {{ user.phone || defaultUser.phone }} </a>
          </li>
        </ul>
      </CardFooter>
    </Card>
  </div>
</template>
