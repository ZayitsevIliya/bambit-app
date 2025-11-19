// import { URL_USERS } from '@/data/constants'
// import { useUsersStore } from '@/stores/users'
// import { useFetch } from './useFetch'
// import { useFetchStore } from '@/stores/fetchStore'

// export function useUsers() {
//   const usersStore = useUsersStore()
//   const fetchStore = useFetchStore()
//   const { getData, data } = useFetch()

//   const getUsers = async function () {
//     await getData(URL_USERS)
//     if (!fetchStore.errors) {
//       usersStore.users = data.value
//     }
//   }
//   return { getUsers }
// }
