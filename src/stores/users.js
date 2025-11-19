import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { URL_USERS } from '@/data/constants'
import { useFetch } from '@/composables/useFetch'

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
    const data = await getData(URL_USERS, '', { isLoading, errors })
    if (data && !errors.value) {
      users.value = data
    }
  }

  const getUserById = function (id) {
    return users.value[id]
  }

  const setCurrentUser = function (id) {
    currentUser.value = getUserById(id)
  }

  return { users, currentUser, errors, isLoading, setCurrentUser, showUserCard, getUsers }
})
