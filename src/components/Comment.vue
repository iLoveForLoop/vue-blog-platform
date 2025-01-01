<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import EditComment from './EditComment.vue'
import CommentAction from './CommentAction.vue'
import Popover from './Popover.vue'
import { useStore } from 'vuex'
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from 'date-fns'

const isEditing = ref(false)
const store = useStore()

const props = defineProps({
  comment: [{}],
  isMyComment: { type: Boolean, default: false },
})

const showPopover = ref(false)

const togglePopover = () => {
  store.commit('setIsComponentOverLapping', true)
  console.log('toggled the comment popver')
  console.log('is over lapping?', store.state.isComponentOverLapping)
  showPopover.value = !showPopover.value
}

const closePopover = () => {
  showPopover.value = false
}

const closeEdit = data => {
  isEditing.value = data
}

const openEdit = data => {
  console.log(data)
  isEditing.value = data
  showPopover.value = false
}

// trimming post content
const commentContent = ref(props.comment.content)

watch(
  () => props.comment,
  newComment => {
    commentContent.value = newComment?.content || ''
  },
  { immediate: true }
)

const isExpanded = ref(false)
const canBeToggle = computed(() => commentContent.value.length > 400)

const isNeedsToBeTrimmed = computed(
  () => canBeToggle.value && !isExpanded.value
)

const trimmedText = computed(() =>
  isNeedsToBeTrimmed.value
    ? commentContent.value.slice(0, 280)
    : commentContent.value
)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

//Converting date to time ago

const commentDate = computed(() => props.comment.created_at.toDate())


const timeAgo = computed(() => {
  const now = new Date()

  const seconds = differenceInSeconds(now, commentDate.value)
  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = differenceInMinutes(now, commentDate.value)
  if (minutes < 60) {
    return `${minutes}m`
  }

  const hours = differenceInHours(now, commentDate.value)
  if (hours < 24) {
    return `${hours}h`
  }

  const days = differenceInDays(now, commentDate.value)
  return `${days}d`
})
</script>

<template>
  <!-- For Styling purposes only -->
  <div class="backdrop" v-if="showPopover || isEditing" @click.self="closePopover"></div>
  <!-- For Styling purposes only -->

  <div class="poppins-regular w-100 d-flex flex-column align-items-start justify-content-center text-dark pb-0 pt-0">
    <div class="w-75 d-flex flex-column justify-content-start py-0 rounded" style="height: auto">
      <div class="line" style="height: 3vh"></div>

      <!-- <div
        class="bg-light rounded-pill p-2 px-3 d-flex align-items-center justify-content-between content-based"
      >
        <p class="p-0 m-0 name-size">

          This is a sample
        </p>
      </div> -->

      <div class="my-border text-light rounded py-3 px-4 d-flex flex-column justify-content-start content-based">
        <div class="d-flex align-items-center justify-content-between gap-5">
          <div class="d-flex gap-2 align-items-center">
            <img class="comment-circle" :src="props.comment?.user.photoURL
              ? props.comment?.user.photoURL
              : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
              " alt="pic" />
            <p class="p-0 m-0 name-size emailFSize">
              <!--username-->
              {{ props.comment.user_email }} · {{ timeAgo }}
            </p>
          </div>
          <!--3 dots is paking here-->
          <div class="d-flex align-items-center justify-content-between position-relative">
            <transition name="pop">
              <Popover v-if="showPopover" :id="props.comment.id" from="comment" @openEdit="openEdit"
                @closePopover="closePopover" />
            </transition>
            <transition name="pop">
              <EditComment v-if="isEditing" :comment="props.comment" @closeEdit="closeEdit" />
            </transition>

            <i class="bi bi-three-dots" @click="togglePopover" v-show="props.isMyComment"></i>
          </div>
        </div>

        <div class="ps-4 d-flex align-items-center justify-content-between gap-4" style="cursor: default">
          <!--COMMENT CONTENT-->
          <p @click="toggleExpand" class="p-0 m-0 fw-light">
            {{ trimmedText }}
            <span v-if="canBeToggle" class="text-secondary" style="cursor: pointer !important">{{ isExpanded ? '' :
              '...See more' }}
            </span>
          </p>
          <CommentAction :comment="props.comment" />
        </div>
      </div>

      <div class="px-3 bg-light d-flex justify-content-left align-items-center content-based"></div>
    </div>
  </div>
</template>

<style scoped>
.line {
  width: 2px;
  height: 1vh;
  margin-left: 10%;
  background: rgba(255, 255, 255, 0.2);
}

.backdrop {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 10;
}

.content-based {
  width: fit-content;
  height: fit-content;
}

.emailFSize {
  font-size: 0.8em;
  font-weight: 450;
}

.pos {
  top: -370%;
  right: -620%;
}

.box {
  transition: 0.3s ease-in-out;
}

.comment-circle {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: center;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.pop-enter-to,
.pop-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>
