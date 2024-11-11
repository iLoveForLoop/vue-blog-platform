import { db } from '@/firebase/config'
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'

export const deleteComment = async id => {
  try {
    const commentRef = doc(db, 'comments', id)
    const likesRef = collection(db, 'likes')
    const likesQuery = query(likesRef, where('comment_id', '==', id))
    const likeSnaphot = await getDocs(likesQuery)

    const deleteLikes = likeSnaphot.docs.map(doc => deleteDoc(doc.ref))
    await deleteDoc(commentRef)
    await Promise.all(deleteLikes)
  } catch (error) {
    console.log(error.message)
  }
}
