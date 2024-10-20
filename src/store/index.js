import { createStore } from 'vuex'
import { auth } from '@/firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

const store = createStore({
  state: {
    user: null,
  },
  mutations: {
    updateUser(state, payload) {
      console.log('up')
      state.user = payload
      console.log(state.user)
    },
  },
  actions: {
    async signUp(context, { email, password }) {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        context.commit('updateUser', res.user)
      } else {
        throw new Error('Failed to signup')
      }
    },
    async logIn(context, { email, password }) {
      console.log('hey')
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res) {
        context.commit('updateUser', res.user)
      } else {
        throw new Error('Failed to login')
      }
    },
    async logout(context) {
      console.log('logout')
      await signOut(auth)
      context.commit('updateUser', null)
    },
  },
})

export default store
