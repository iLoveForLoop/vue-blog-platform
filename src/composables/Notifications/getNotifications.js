import { db } from '@/firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import store from '@/store'
import { ref } from 'vue'

export const getNotifications = () => {
  const notifications = ref([])
  try {
    const notifRef = collection(db, 'notifications')
    const q = query(notifRef, where('to_user', '!=', store.state.user.uid))
    onSnapshot(
      q,
      snapshot => {
        notifications.value = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }))
      },
      err => {
        console.log('Error getting notification: ', err.message)
      },
    )
  } catch (error) {
    console.log('Error getting notification: ', error.message)
  }

  return { notifications }
}
