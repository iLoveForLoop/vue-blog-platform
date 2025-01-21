import { db } from '@/firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import store from '@/store'
import { ref } from 'vue'
import { isEqual } from 'lodash'

export const getNotifications = () => {
  const notifications = ref([])
  try {
    const notifRef = collection(db, 'notifications')

    onSnapshot(
      notifRef,
      snapshot => {
        const unordereNotifs = snapshot.docs
          .map(doc => {
            const data = doc.data()

            if (
              data.from_user.id !== store.state.user.uid &&
              data.to_user_id === store.state.user.uid
            ) {
              return { ...doc.data(), id: doc.id }
            }

            return null
          })
          .filter(item => item !== null)

        const sortedNotifs = unordereNotifs.sort(
          (a, b) => b.created_at.toMillis() - a.created_at.toMillis(),
        )

        if (!isEqual(sortedNotifs, notifications.value)) {
          notifications.value = sortedNotifs
        }
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
