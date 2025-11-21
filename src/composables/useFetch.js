export function useFetch() {
  const controller = new AbortController()

  const getData = async (URL, store = null) => {
    const startTime = Date.now()

    try {
      if (store) {
        store.isLoading.value = true
        store.errors.value = null
      }

      console.log(`URL: ${URL}`, 'store:', store.value)

      const response = await fetch(URL, { signal: controller.signal })

      const endTime = Date.now()

      console.log('response: ', response)

      let data = await response.json()

      // console.log('data: ', data)

      console.log(`time: ${endTime - startTime}ms`)

      return data
    } catch (err) {
      console.log(err)

      if (store) {
        store.errors.value = err
      }

      // return null
    } finally {
      if (store) {
        store.isLoading.value = false
      }
    }
  }

  return { getData }
}
