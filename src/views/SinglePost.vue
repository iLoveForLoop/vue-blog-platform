<script setup>
import Post from '@/components/Post.vue'
import { usePostStore } from '@/store/piniaStore'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Comment from '@/components/Comment.vue'
import { addComment } from '@/composables/addComment'
import { useRoute } from 'vue-router'

//route params
const route = useRoute()
const id = route.params.id

//stores
const store = useStore()
const router = useRouter()
const piniaStore = usePostStore()

//post
// const post = piniaStore.post
const post = ref([])

//comments
const comments = ref([])

//placeholder
const tmp = ref(`Reply as ${store.state.user?.email}`)

//fetch comments
import { db } from '@/firebase/config'
import {
  collection,
  where,
  query,
  onSnapshot,
  Timestamp,
  getDoc,
  doc,
} from 'firebase/firestore'

//kill switch
let killComments

onMounted(async () => {
  const commentsRef = collection(db, 'comments')
  const postComments = query(commentsRef, where('post_id', '==', id))
  try {
    const postRef = doc(db, 'posts', id)
    const postSnapshot = await getDoc(postRef)

    if (postSnapshot.exists()) {
      post.value = { ...postSnapshot.data(), id: postSnapshot.id }

      const userId = post.value.user_id

      const userRef = doc(db, 'users', userId)
      const userSnapshot = await getDoc(userRef)

      if (userSnapshot.exists()) {
        post.value.user = { ...userSnapshot.data(), id: userSnapshot.id }
      } else {
        console.log('no such user exists')
      }
    } else {
      console.log("Post document doesn't exist")
    }
  } catch (error) {
    console.log('Error fetching post or user:', error.message)
  }

  killComments = onSnapshot(
    postComments,
    snapshot => {
      comments.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    },
    err => {
      console.log(err.message)
    }
  )
})

onUnmounted(() => {
  killComments()
})

watch(post, newVal => {
  post.value = newVal
})

//add comment
const comment = ref('')
const saveComment = () => {
  if (comment.value != '') {
    try {
      const data = {
        user_id: store.state.user.uid,
        post_id: id,
        content: comment.value,
        user_email: store.state.user.email,
        created_at: Timestamp.now(),
      }
      addComment(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  comment.value = ''
}
</script>

<template>
  <div
    class="container bg-dark px-5 hidebar poppins-regular b-pad parent"
    style="height: 100vh"
  >
    <div class="d-flex justify-content-start align-items-center gap-2 mt-3">
      <h2>
        <i
          class="bi bi-arrow-left text-light"
          @click="router.push('/home')"
        ></i>
      </h2>

      <!-- <h1 class="text-light">Post</h1> -->
    </div>

    <div class="container overflow-scroll hidebar" style="height: 70vh">
      <Post :post="post" />
      <div v-for="comment in comments" :key="comment.id">
        <Comment
          :comment="comment"
          :isMyComment="comment.user_id == store.state.user.uid"
        />
      </div>
    </div>
    <div class="pos d-flex align-items-center gap-3">
      <div class="d-flex bg-light py-3 px-3 w-75 rounded-pill gap-3">
        <i class="bi bi-person-circle p-size fs-3 text-dark"></i>
        <form class="d-flex w-100" @submit.prevent="saveComment">
          <input
            class="form-control me-2 rounded-pill border border-2 border-dark custom-input"
            type="text"
            :placeholder="tmp"
            v-model="comment"
          />
          <button class="border-0 bg-transparent fs-5" type="submit">
            <i class="bi bi-send fs-4"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hidebar {
  scrollbar-width: none;
}

.b-pad {
  padding-bottom: 10%;
}

.parent {
  position: relative;
}

.pos {
  position: absolute;
  width: 100%;
  top: 79vh;
  left: 0;
  height: 13vh;
  align-items: center;
  justify-content: center;
}

.custom-input:focus {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-color: #f9fdf9;
  outline: none;
}
</style>
