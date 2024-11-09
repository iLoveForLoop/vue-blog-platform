import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({
    post: null,
  }),
  actions: {
    setPost(data) {
      console.log('i reached in the pinia actions')
      this.post = data
    },
  },
})
