import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const usersMap = ref({})
  const currentUser = ref(null)

  const showUserCard = computed(() => {
    return !!currentUser.value
  })

  const setCurrentUser = function (user) {
    currentUser.value = user
  }

  const unsetCurrentUser = function () {
    currentUser.value = null
  }

  return {
    usersMap,
    currentUser,
    showUserCard,
    setCurrentUser,
    unsetCurrentUser,
  }
})
