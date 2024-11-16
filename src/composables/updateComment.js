import { db } from '@/firebase/config'
import { updateDoc, doc } from 'firebase/firestore'

export const updateComment = async (id, newComment) => {
  console.log(id, newComment)
  try {
    const commentRef = doc(db, 'comments', id)
    await updateDoc(commentRef, {
      content: newComment,
    })
  } catch (error) {
    console.log(error.message)
  }
}
