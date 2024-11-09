import { db } from '@/firebase/config'
import { addDoc, collection } from 'firebase/firestore'

export const addComment = async data => {
  try {
    const commentsRef = collection(db, 'comments')
    await addDoc(commentsRef, data)
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
