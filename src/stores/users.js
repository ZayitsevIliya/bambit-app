import { useFetch } from '@/composables/useFetch'
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

  const { getData } = useFetch()

  const getUsers = async function () {
    const data = await getData('https://jsonplaceholder.typicode.com/users')

    users.value = data
  }

  const getUsersEmail = function (id) {
    const user = getUserById(id)
    return user?.email
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
    getUsersEmail,
  }
})
