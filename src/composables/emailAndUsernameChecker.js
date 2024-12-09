import { db } from '@/firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'

export const isUsernameTaken = async username => {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('displayName', '==', username))
    const usersnapshot = await getDocs(q)
    return !usersnapshot.empty
  } catch (error) {
    console.log(error.message)
  }
}

export const isEmailTaken = async email => {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('email', '==', email))
    const usersnapshot = await getDocs(q)
    return !usersnapshot.empty
  } catch (error) {
    console.log(error.message)
  }
}
