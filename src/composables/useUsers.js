import { URL_USERS } from '@/constants'
import { useUsersStore } from '@/stores/usersStore'
import { useFetch } from './useFetch'

export function useUsers() {
  const usersStore = useUsersStore()
  const { getData, data, errors } = useFetch()

  const getUsers = async function () {
    await getData(URL_USERS)
    if (!errors.value) {
      usersStore.users = data.value
    }
  }
  return { getUsers }
}
