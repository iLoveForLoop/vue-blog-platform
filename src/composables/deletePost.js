import { db } from '@/firebase/config'
import {
  deleteDoc,
  collection,
  doc,
  where,
  query,
  getDocs,
} from 'firebase/firestore'

export const deletePost = async id => {
  try {
    const likesRef = collection(db, 'likes')
    const postRef = doc(db, 'posts', id)
    const likesquery = query(likesRef, where('post_id', '==', id))

    const snapshot = await getDocs(likesquery)

    const deleteLikes = snapshot.docs.map(doc => deleteDoc(doc.ref))

    await Promise.all(deleteLikes)
    await deleteDoc(postRef)
  } catch (err) {
    console.log(err.message)
  }
}
