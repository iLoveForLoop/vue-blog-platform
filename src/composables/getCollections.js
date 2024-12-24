import { db } from '@/firebase/config'
import {
  collection,
  getDocs,
  onSnapshot,
  getDoc,
  doc,
  query,
  where,
} from 'firebase/firestore'
import { computed, ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import store from '@/store'

export const getCollection = async () => {
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

//Get Single Post with user

export const getSinglePostWithUser = id => {
  let spost = ref(null)

  const postRef = doc(db, 'posts', id)
  onSnapshot(
    postRef,
    async snapshot => {
      if (snapshot.exists()) {
        const postData = { ...snapshot.data(), id: snapshot.id }

        if (postData.user_id) {
          try {
            const userRef = doc(db, 'users', postData.user_id)
            const userSnapshot = await getDoc(userRef)

            if (userSnapshot.exists()) {
              postData.user = userSnapshot.data()
            } else {
              console.log('No user exists')
              postData.user = null // Or set a placeholder value
            }
          } catch (error) {
            console.error('Error fetching user:', error)
            postData.user = 'Error fetching user'
          }
        }

        spost.value = postData
      } else {
        console.log('Post does not exist')
        spost.value = null
      }
    },
    err => {
      console.error('Snapshot error:', err.message)
    },
  )

  return { spost }
}

//end of Get single post with user

export const getCurrentUserInfo = async id => {
  const user = ref(null)

  try {
    const userRef = doc(db, 'users', id)
    onSnapshot(userRef, snapshot => {
      if (snapshot.exists()) {
        user.value = snapshot.data()
      } else {
        throw new Error('User does not exist')
      }
    })
  } catch (err) {
    // console.log(err.message)
  }

  return { user }
}

export const userPosts = id => {
  let userpost = ref([])
  const postsRef = collection(db, 'posts')

  const qpost = query(postsRef, where('user_id', '==', id))

  onSnapshot(
    qpost,
    snapshot => {
      userpost.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    },
    err => {
      console.log(err.message)
    },
  )

  return { userpost }
}

export const getSinglePost = async id => {
  const singlePost = ref(null)

  try {
    const postRef = doc(db, 'posts', id)
    const post = await getDoc(postRef)
    singlePost.value = { ...post.data(), id: post.id }
  } catch (error) {
    console.log(error.message)
  }

  return { singlePost }
}

export const getCommentInPost = id => {
  const comments = ref(null)
  const commentsRef = collection(db, 'comments')
  const postComments = query(commentsRef, where('post_id', '==', id))

  onSnapshot(
    postComments,
    snapshot => {
      comments.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    },
    err => {
      console.log(err.message)
    },
  )

  return { comments }
}

//get random users
export const getRandomUsers = async () => {
  let randomUsers = []

  try {
    const allUser = []
    const usersRef = collection(db, 'users')
    const users = await getDocs(usersRef)

    users.forEach(doc => {
      if (doc.id !== store.state.user.uid) {
        allUser.push({ ...doc.data(), id: doc.id })
      }
    })

    randomUsers = allUser.sort(() => 0.5 - Math.random())

    return randomUsers.slice(0, 5)
  } catch (error) {
    console.log('error ni yawa ka')
    console.log(error.message)
  }
}

//gets all the post of a singe user
export const getSnapPostWithUser = () => {
  let posts = ref([])
  const postsRef = collection(db, 'posts')
  const q = query(postsRef, where('user_id', '==', store.state.user.uid))

  onSnapshot(
    q,
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
