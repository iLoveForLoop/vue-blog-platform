import { ref } from 'vue'
import { db } from '@/firebase/config'
import store from '@/store'
import { onSnapshot, doc } from 'firebase/firestore'

export const getCurrentProfileInfo = () => {
  const user = ref(null)
  const userRef = doc(db, 'users', store.state.user.uid)

  onSnapshot(
    userRef,
    snapshot => {
      if (snapshot.exists()) {
        user.value = { ...snapshot.data(), id: snapshot.id }
      } else {
        user.value = null
      }
    },
    err => {
      console.error('Error fetching profile:', err.message)
    },
  )

  return { user }
}
