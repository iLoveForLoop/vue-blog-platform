import { db } from '@/firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

export const deleteComment = async id => {
  try {
    const commentRef = doc(db, 'comments', id)
    await deleteDoc(commentRef)
  } catch (error) {
    console.log(error.message)
  }
}
