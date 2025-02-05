import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase/config'

export const addNotification = data => {
  if (data.from_user_id === data.to_user_id) {
    return
  } else {
    try {
      const notRef = collection(db, 'notifications')
      addDoc(notRef, data)
    } catch (err) {
      console.log(err.message)
    }
  }
}
