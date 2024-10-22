import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

export const addPost = async addPostData => {
  try {
    const postRef = collection(db, 'posts')
    addDoc(postRef, addPostData)
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
