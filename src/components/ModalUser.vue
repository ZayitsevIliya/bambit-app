<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from './ui/button'
import { X } from 'lucide-vue-next'

import { useUsersStore } from '@/stores/users'
import { onMounted, onUnmounted } from 'vue'

defineProps(['user'])

const usersStore = useUsersStore()

const defaultUser = {
  name: 'Unknown',
  username: 'Unknown',
  website: 'N/A',
  company: { name: 'N/A' },
  address: { street: '', suite: '', city: '' },
  email: 'N/A',
  phone: 'N/A',
}

function handleEscape(e) {
  if (e.key === 'Escape' && usersStore.showUserCard) {
    usersStore.unsetCurrentUser()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="usersStore.showUserCard"
        @click="usersStore.unsetCurrentUser"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <Card
          @click.stop
          class="w-full max-w-[500px] max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300"
        >
          <CardHeader class="relative">
            <Button
              @click="usersStore.unsetCurrentUser"
              variant="ghost"
              size="icon"
              class="absolute top-4 right-4"
              aria-label="Закрыть"
            >
              <X class="h-4 w-4" />
            </Button>
            <CardTitle>{{ user.name || defaultUser.name }}</CardTitle>
            <CardDescription>{{ user.username || defaultUser.username }}</CardDescription>
          </CardHeader>

          <CardContent class="space-y-4">
            <div>
              <p class="text-sm font-medium text-muted-foreground mb-1">Email</p>
              <a :href="`mailto:${user.email}`" class="text-primary hover:underline">
                {{ user.email || defaultUser.email }}
              </a>
            </div>

            <div>
              <p class="text-sm font-medium text-muted-foreground mb-1">Phone</p>
              <a :href="`tel:${user.phone}`" class="text-primary hover:underline">
                {{ user.phone || defaultUser.phone }}
              </a>
            </div>

            <div>
              <p class="text-sm font-medium text-muted-foreground mb-1">Website</p>
              <a
                :href="`https://${user.website}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary hover:underline"
              >
                {{ user.website || defaultUser.website }}
              </a>
            </div>

            <div>
              <p class="text-sm font-medium text-muted-foreground mb-1">Company</p>
              <p>{{ user.company?.name || defaultUser.company.name }}</p>
            </div>

            <div>
              <p class="text-sm font-medium text-muted-foreground mb-1">Address</p>
              <p>
                {{ user.address?.street || '' }}
                {{ user.address?.suite ? `, ${user.address.suite}` : '' }}
                {{ user.address?.city ? `, ${user.address.city}` : '' }}
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <Button @click="usersStore.unsetCurrentUser" class="w-full"> Закрыть </Button>
          </CardFooter>
        </Card>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div > div,
.modal-leave-active > div > div {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from > div > div,
.modal-leave-to > div > div {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}
</style>
