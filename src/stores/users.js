import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = shallowRef([])
  const errors = ref(null)
  const isLoading = ref(false)

  const currentUser = ref(null)

  const showUserCard = computed(() => {
    return !!currentUser.value
  })

  const getUsers = async function () {
    const response = await fetch('src/data/users.json')
    const data = await response.json()

    users.value = data
  }

  const getUserById = function (id) {
    return users.value[id]
  }

  const setCurrentUser = function (id) {
    currentUser.value = getUserById(id)
  }

  const unsetCurrentUser = function () {
    currentUser.value = null
  }

  return {
    users,
    currentUser,
    errors,
    isLoading,
    setCurrentUser,
    unsetCurrentUser,
    showUserCard,
    getUsers,
  }
})
