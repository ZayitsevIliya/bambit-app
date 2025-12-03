import { useUsersStore } from '@/stores/users'
import { usePostStore } from '@/stores/posts'
import { ref } from 'vue'

export function useUsers(userId) {
  const usersStore = useUsersStore()
  const postsStore = usePostStore()
  const user = ref(null)

  async function loadUserById() {
    if (!userId) return

    if (usersStore.usersMap[userId]) {
      user.value = usersStore.usersMap[userId]

      postsStore.posts.forEach((post) => {
        if (post.userId == userId) {
          post.email = user.value.email
        }
      })

      return
    }

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      user.value = await response.json()
      usersStore.usersMap[userId] = user.value

      postsStore.posts.forEach((post) => {
        if (post.userId == userId) {
          post.email = user.value.email
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  loadUserById()

  return { user }
}
