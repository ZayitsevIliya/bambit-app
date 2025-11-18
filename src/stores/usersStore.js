import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = shallowRef([])
  const currentUser = ref(null)

  const showUserCard = computed(() => {
    return !!currentUser.value
  })

  const getUserById = function (id) {
    return users.value[id]
  }

  const setCurrentUser = function (id) {
    currentUser.value = getUserById(id)
  }

  return { users, currentUser, setCurrentUser, showUserCard }
})
