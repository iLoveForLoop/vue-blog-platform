import { db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'

export const addLike = async data => {
  console.log('Add like')
  try {
    const likesRef = collection(db, 'likes')
    addDoc(likesRef, data)
  } catch (error) {
    console.log(error.message)
  }
}
