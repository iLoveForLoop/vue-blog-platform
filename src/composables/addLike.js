import { db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import store from '@/store'
import { addNotification } from './Notifications/addNotification'
import { checkIfNotifExist } from './Notifications/checkNotiIfExist'

export const addLike = async data => {
  console.log('Add like')

  const LikeData = {
    post_id: data.post_id,
    user_id: data.user_id,
    created_at: data.created_at,
  }

  const notifData = {
    from_user: data.user,
    to_user_id: data.to_user_id,
    from_user_id: store.state.user.uid,
    type: 'likepost',
    status: 'saved',
    post_id: data.post_id,
    created_at: data.created_at,
  }

  const notifCheckerData = {
    from_user: store.state.user.uid,
    type_id: data.post_id,
  }
  const isNotifExist = await checkIfNotifExist(notifCheckerData)
  console.log('Is Notif exist: ', isNotifExist)
  try {
    const likesRef = collection(db, 'likes')
    addDoc(likesRef, LikeData)
    console.log(
      'empty? so means the data notif not exist: ',
      await checkIfNotifExist(notifCheckerData),
    )
    if (await checkIfNotifExist(notifCheckerData)) {
      try {
        addNotification(notifData)
        console.log('adding notification success')
      } catch (err) {
        console.log('Error adding notification: ', err.value)
      }
    } else {
      console.log('Notification not added!')
    }
  } catch (error) {
    console.log(error.message)
  }
}
