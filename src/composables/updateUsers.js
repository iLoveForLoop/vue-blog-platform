import { getAuth } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

export const updateUsers = () => {
  const auth = getAuth()

  auth.onAuthStateChanged(async user => {
    if (user) {
      const userRef = doc(db, 'users', user.uid)

      await setDoc(
        userRef,
        {
          id: user.uid,
          email: user.email,
          displayName: user.displayName || 'Anonymous',
          photoURL: user.photoURL || null,
        },
        { merge: true },
      )
    }
  })
}
