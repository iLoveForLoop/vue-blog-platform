import { db } from '@/firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'

export const checkLike = async (user_id, post_id) => {
  try {
    const likesRef = collection(db, 'likes')
    const check = query(
      likesRef,
      where('user_id', '==', user_id),
      where('post_id', '==', post_id),
    )

    const snapshot = await getDocs(check)
    return !snapshot.empty
  } catch (error) {
    console.log('Error occured you son of a bitch', error.message)
    return false
  }
}
