import store from '@/store'
import { db } from '@/firebase/config'
import { updateDoc, doc } from 'firebase/firestore'

export const updateDisplayName = async newDisplayName => {
  try {
    const profileRef = doc(db, 'users', store.state.user.uid)
    await updateDoc(profileRef, {
      displayName: newDisplayName,
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const updateBio = async newBio => {
  try {
    const profileRef = doc(db, 'users', store.state.user.uid)
    await updateDoc(profileRef, {
      bio: newBio,
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const updateProfilePic = async newPhotoURL => {
  try {
    const profileRef = doc(db, 'users', store.state.user.uid)
    await updateDoc(profileRef, {
      photoURL: newPhotoURL,
    })
  } catch (err) {
    console.log(err.message)
  }
}
