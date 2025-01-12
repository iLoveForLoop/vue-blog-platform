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
    isOnProfile: false,
    isComponentOverLapping: false,
    isSidebarOpen: false,
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
    setIsNewUser(state, payload) {
      state.isNewUser = payload
    },
    setIsOnProfile(state, payload) {
      state.isOnProfile = payload
    },
    setIsComponentOverLapping(state, payload) {
      state.isComponentOverLapping = payload
    },
    setIsSidebarOpen(state, payload) {
      state.isSidebarOpen = payload
    },
  },
  actions: {
    async signUp(context, { email, password, displayName }) {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        await updateProfile(res.user, { displayName })
        context.commit('updateUser', res.user)
        context.commit('setIsNewUser', true)
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
        context.commit('setIsNewUser', false)
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
