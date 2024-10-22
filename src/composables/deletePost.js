import { db } from '@/firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'

export const deletePost = async id => {
  try {
    const postRef = doc(db, 'posts', id)
    await deleteDoc(postRef)
  } catch (err) {
    console.log(err.message)
  }
}
