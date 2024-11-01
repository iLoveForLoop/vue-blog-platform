import { db } from '@/firebase/config'
import { updateDoc, doc } from 'firebase/firestore'

export const updatePost = async (id, newData) => {
  console.log(newData)
  try {
    const postRef = doc(db, 'posts', id)
    await updateDoc(postRef, {
      content: newData,
    })
    console.log('Updated Successfully')
  } catch (error) {
    console.log(error.message)
  }
}
