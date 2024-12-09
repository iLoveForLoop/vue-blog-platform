import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { auth } from '@/firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { updateUsers } from '@/composables/updateUsers'

const store = createStore({
  state: {
    user: null,
    isAuthReady: false,
    isNewUser: false,
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload
    },
    setIsAuthReady(state, payload) {
      state.isAuthReady = payload
    },
    setToggleEdit(state, payload) {
      state.toggleEdit = payload
    },
  },
  actions: {
    async signUp(context, { email, password, displayName }) {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        await updateProfile(res.user, { displayName })
        context.commit('updateUser', res.user)
      } else {
        throw new Error('Failed to signup')
      }

      updateUsers()
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

  plugins: [createPersistedState()],
})

const kill = onAuthStateChanged(auth, user => {
  store.commit('updateUser', user)
  store.commit('setIsAuthReady', true)

  kill()
})

export default store
