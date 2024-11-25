import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../views/SinglePost.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/tester',
      name: 'tester',
      component: () => import('../views/Tester.vue'),
    },
  ],
})

// Add a global navigation guard
router.beforeEach((to, from, next) => {
  const loggedIn = store.state.user // Check if a user is logged in
  const isAuthReady = store.state.isAuthReady // Check if authentication status is ready

  if (!isAuthReady) {
    // Wait for authentication status to be ready before routing
    const unwatch = store.watch(
      state => state.isAuthReady,
      ready => {
        if (ready) {
          unwatch() // Stop watching once ready
          if (to.meta.requiresAuth && !store.state.user) {
            next({ name: 'login' })
          } else if (to.name === 'login' && store.state.user) {
            next({ name: 'home' })
          } else {
            next()
          }
        }
      },
    )
  } else if (to.meta.requiresAuth && !loggedIn) {
    // Redirect to login if the user is not authenticated
    next({ name: 'login' })
  } else if (to.name === 'login' && loggedIn) {
    // Redirect to home if the user is already logged in
    next({ name: 'home' })
  } else {
    // Allow access
    next()
  }
})

export default router
