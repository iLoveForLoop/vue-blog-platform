<script setup>
import Post from '@/components/Post.vue'
import { usePostStore } from '@/store/piniaStore'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Comment from '@/components/Comment.vue'
import { addComment } from '@/composables/addComment'
import { useRoute } from 'vue-router'
import { getSinglePostWithUser } from '@/composables/getCollections'

//route params
const route = useRoute()
const id = route.params.id

//post with user
const newUser = ref(null)
const { spost } = getSinglePostWithUser(id)

onMounted(() => {
  console.log('Single post', spost)
})

//stores
const store = useStore()
const router = useRouter()
const piniaStore = usePostStore()

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
  doc,
  getDoc,
} from 'firebase/firestore'

//kill switch
let killComments
let killCommentsWithUser

onMounted(async () => {
  const commentsRef = collection(db, 'comments')
  const postComments = query(commentsRef, where('post_id', '==', id))

  // killComments = onSnapshot(
  //   postComments,
  //   snapshot => {
  //     comments.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  //   },
  //   err => {
  //     console.log(err.message)
  //   }
  // )

  killCommentsWithUser = onSnapshot(
    postComments,
    async snapshot => {
      const commentData = snapshot.docs.map(async data => {
        const comment = { ...data.data(), id: data.id }

        if (comment.user_id) {
          const userRef = doc(db, 'users', comment.user_id)
          const userData = await getDoc(userRef)

          if (userData.exists()) {
            comment.user = userData.data()
          } else {
            comment.user = 'no user'
          }
        }

        return comment
      })

      comments.value = await Promise.all(commentData)
    },
    err => {
      console.log(err.message)
    }
  )

  ///
})

onUnmounted(() => {
  killCommentsWithUser()
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
    class="container main-bg hidebar poppins-regular d-flex flex-column p-0"
    style="height: 100vh"
  >
    <div
      class="d-flex justify-content-start align-items-center gap-2 mt-3 ps-5"
    >
      <h2>
        <i
          class="bi bi-arrow-left text-light"
          @click="router.push('/home')"
        ></i>
      </h2>

      <!-- <h1 class="text-light">Post</h1> -->
    </div>

    <div class="overflow-scroll hidebar flex-grow-1">
      <Post :post="spost" />
      <div v-for="comment in comments" :key="comment.id">
        <Comment
          :comment="comment"
          :isMyComment="comment.user_id == store.state.user.uid"
        />
      </div>
    </div>
    <div class="d-flex align-items-center gap-3">
      <div class="d-flex main-bg py-3 px-3 w-100 gap-3 top-bor">
        <i class="bi bi-person-circle p-size fs-3 text-light"></i>
        <form class="d-flex w-100" @submit.prevent="saveComment">
          <input
            class="w-100 me-2 custom-input main-bg text-light no-focus-effect rounded"
            type="text"
            :placeholder="tmp"
            v-model="comment"
          />
          <button class="border-0 bg-transparent text-light" type="submit">
            Post
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
  padding-bottom: 1%;
}

.parent {
  position: relative;
}

.pos {
  position: absolute;
  width: 100%;
  top: 88.3vh;
  left: 0;
  height: 13vh;
  align-items: center;
  justify-content: center;
}

.custom-input::placeholder {
  color: rgb(224, 224, 224);
}

.no-focus-effect {
  outline: none !important;
  box-shadow: none !important;
  border: none;
}

.no-focus-effect:focus {
  outline: none !important;
  box-shadow: none !important;
}

.top-bor {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
