import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase/config'

export const addNotification = data => {
  try {
    const notRef = collection(db, 'notifications')
    addDoc(notRef, data)
  } catch (err) {
    console.log(err.message)
  }
}
