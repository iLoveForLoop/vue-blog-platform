import { db } from '@/firebase/config'
import {
  collection,
  getDocs,
  onSnapshot,
  getDoc,
  doc,
} from 'firebase/firestore'
import { ref } from 'vue'

export const getCollection = () => {
  let posts = ref([])

  const load = async () => {
    try {
      const postRef = collection(db, 'posts')
      const snapshot = await getDocs(postRef)
      posts.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    } catch (err) {
      console.log(err.message)
    }
  }

  load()

  return { posts }
}

export const getSnapCollection = () => {
  let posts = ref([])

  const postRef = collection(db, 'posts')
  onSnapshot(
    postRef,
    snapshot => {
      posts.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    },
    err => {
      console.log(err.message)
    },
  )

  return { posts }
}

export const getSnapCollectionWithUser = () => {
  let posts = ref([])
  const postRef = collection(db, 'posts')

  onSnapshot(
    postRef,
    async snapshot => {
      const postData = snapshot.docs.map(async data => {
        const post = { ...data.data(), id: data.id }

        if (post.user_id) {
          const userRef = doc(db, 'users', post.user_id)
          const userSnapshot = await getDoc(userRef)

          if (userSnapshot.exists()) {
            post.user = userSnapshot.data()
          } else {
            post.user = 'Dont have any'
          }
        }

        return post
      })

      posts.value = await Promise.all(postData)
    },
    err => {
      console.log(err.message)
    },
  )

  return { posts }
}
