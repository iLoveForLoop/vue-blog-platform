import { db } from '@/firebase/config'
import {
  deleteDoc,
  collection,
  doc,
  where,
  query,
  getDocs,
} from 'firebase/firestore'
import { deleteComment } from './deleteComment'

export const deletePost = async id => {
  try {
    const likesRef = collection(db, 'likes')
    const commentsRef = collection(db, 'comments')
    const postRef = doc(db, 'posts', id)
    const commentsQuery = query(commentsRef, where('post_id', '==', id))
    const likesquery = query(likesRef, where('post_id', '==', id))

    const snapshot = await getDocs(likesquery)
    const commentsSnapshot = await getDocs(commentsQuery)

    await deleteDoc(postRef)
    const deleteComments = commentsSnapshot.docs.map(doc =>
      deleteComment(doc.id),
    )
    const deleteLikes = snapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deleteLikes)
    await Promise.all(deleteComments)
  } catch (err) {
    console.log(err.message)
  }
}
