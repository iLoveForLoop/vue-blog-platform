<script setup>
import { computed, ref } from 'vue'
import { addPost } from '@/composables/addPost'
import { useRouter } from 'vue-router'
import store from '@/store'
import { Timestamp } from 'firebase/firestore'

const router = useRouter()
const content = ref('')
const userId = computed(() => store.state.user.uid)
const handleSubmit = async () => {
  try {
    const data = {
      content: content.value,
      user_id: userId.value,
      created_at: Timestamp.now(),
    }
    await addPost(data)
    console.log('added')
    content.value = ''
    router.push('/')
  } catch (err) {
    console.log(err.message)
  }
}
</script>


<template>
  <div class="container p-5 bg-dark" style="height: 100vh">
    <h2 class="text-light text-center">Create Rants</h2>

    <form
      @submit.prevent="handleSubmit"
      class="d-flex justify-content-center flex-column p-5 mt-5"
    >
      <div>
        <textarea
          class="form-control w-100"
          v-model="content"
          style="height: 20vh"
        ></textarea>
      </div>
      <div>
        <button class="btn btn-warning my-5 px-5 py-2">Post</button>
      </div>
    </form>
  </div>
</template>

<style>
</style>
