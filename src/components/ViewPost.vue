<script setup>
import Post from '@/components/Post.vue'
import { usePostStore } from '@/store/piniaStore'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Comment from '@/components/Comment.vue'
import { addComment } from '@/composables/addComment'
import { useRoute } from 'vue-router'
import {
  getSinglePostWithUser,
  getCurrentUserInfo,
} from '@/composables/getCollections'
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

const props = defineProps({
  id: String,
  isViewed: {},
})

const emit = defineEmits(['closePost', 'isViewed'])

const id = props.id

//post with user
const newUser = ref(null)
const { spost } = getSinglePostWithUser(id)

onMounted(() => {
  emit('isViewed')
  console.log('Single post', spost)
})

//stores
const store = useStore()
const router = useRouter()
// const piniaStore = usePostStore()

//comments
const comments = ref([])

//placeholder
const tmp = ref(`Reply as ${store.state.user?.email}`)

//fetch comments

//kill switch
let killCommentsWithUser

const currentUser = ref(null)
const loadUserData = async () => {
  if (store.state.user?.uid) {
    const { user: fetchedUser } = await getCurrentUserInfo(store.state.user.uid)
    currentUser.value = fetchedUser
  }
}

onMounted(async () => {
  await loadUserData()
  const commentsRef = collection(db, 'comments')
  const postComments = query(commentsRef, where('post_id', '==', id))

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
    class="back d-flex flex-column justify-content-center align-items-center poppins-regular"
    @click.self="emit('closePost')"
  >
    <div
      class="container w-75 main-bg hidebar poppins-regular d-flex flex-column p-0"
      style="height: 90vh; z-index: 10"
    >
      <div
        class="d-flex justify-content-end align-items-center gap-2 mt-3 pe-3"
      >
        <h2>
          <i class="bi bi-x text-light" @click="emit('closePost')"></i>
        </h2>
      </div>

      <div class="overflow-scroll hidebar flex-grow-1 pb-5">
        <Post :post="spost" :isFromView="true" />
        <div v-for="comment in comments" :key="comment.id">
          <Comment
            :comment="comment"
            :isMyComment="comment.user_id == store.state.user.uid"
          />
        </div>
      </div>
      <div class="d-flex align-items-center gap-3" v-if="currentUser">
        <div class="d-flex main-bg py-3 px-3 w-100 gap-3 top-bor">
          <img
            class="my-circle"
            :src="
              currentUser.value?.photoURL
                ? currentUser.value?.photoURL
                : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
            "
            alt="pic"
          />
          <form class="d-flex w-100" @submit.prevent="saveComment">
            <input
              class="w-100 me-2 custom-input main-bg text-light no-focus-effect rounded"
              type="text"
              :placeholder="tmp"
              v-model="comment"
            />
            <button
              class="border-0 bg-transparent text-secondary"
              type="submit"
              style=""
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 10;
  background: rgba(36, 35, 35, 0) !important;
}

.hidebar {
  scrollbar-width: none;
  overflow: scroll;
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
  font-weight: 150;
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

.my-circle {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  object-fit: cover;
  object-position: center;
}
</style>
