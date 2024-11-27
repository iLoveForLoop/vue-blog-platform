import { cloudinaryConfig } from '@/cloudinary/cloudinaryConfig'
import axios from 'axios'
import { db } from '@/firebase/config'
import { doc, setDoc } from 'firebase/firestore'

export const uploadPicture = (id, formData) => {
  let url = null

  try {
    const res = axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      formData,
    )
    url = res.data.secure_url
    const userRef = doc(db, 'users', id)
    setDoc(userRef, {
      photoURL: url,
    })

    console.log('upload pic success!')
  } catch (e) {
    console.error(e.message)
  }
}
