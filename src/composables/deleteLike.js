import { db } from '@/firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

export const deleteLike = async id => {
  try {
    const likeRef = doc(db, 'likes', id)
    await deleteDoc(likeRef)
  } catch (error) {
    console.log(error.message)
  }
}
