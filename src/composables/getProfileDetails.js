import { ref } from 'vue'
import { db } from '@/firebase/config'
import store from '@/store'
import { onSnapshot, doc, getDoc } from 'firebase/firestore'

export const getCurrentProfileInfo = () => {
  const userRef = doc(db, 'users', store.state.user.uid)
  const user = ref(null)
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

export const getCurrentProfileInfoDocAndSnap = async () => {
  const userRef = doc(db, 'users', store.state.user.uid)
  const user = ref(null)

  try {
    const snapshot = await getDoc(userRef)
    if (snapshot.exists()) {
      user.value = { ...snapshot.data(), id: snapshot.id }
    } else {
      user.value = null
    }
  } catch (error) {
    console.log('Error showing the searchbar profile: ', error.message)
  }

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
