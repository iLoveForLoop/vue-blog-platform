import { db } from '@/firebase/config'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
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

  const load = () => {
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
  }

  load()

  return { posts }
}
