import { db } from '@/firebase/config'
import { getDocs, where, query, collection } from 'firebase/firestore'

export const checkIfNotifExist = async data => {
  const notifRef = collection(db, 'notifications')
  const q = query(
    notifRef,
    where('from_user', '==', data.from_user),
    where('post_id', '==', data.type_id),
  )

  const notifSnapshot = await getDocs(q)
  return !notifSnapshot.empty
}
