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
    {
      path: '/setup',
      name: 'setupProfile',
      component: () => import('../views/SetupProfile.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { user, isAuthReady, isNewUser } = store.state
  console.log('is new user: ', isNewUser)
  if (!isAuthReady) {
    const unwatch = store.watch(
      state => state.isAuthReady,
      ready => {
        if (ready) {
          unwatch()
          router.push(to.fullPath) // Retry the navigation
        }
      },
    )
    return // Wait for isAuthReady
  }

  // Requires authentication but no user
  if (to.meta.requiresAuth && !user) {
    next({ name: 'login' })
  }
  // Prevent non-new users from accessing setup profile
  else if (to.name === 'setupProfile' && !isNewUser) {
    next({ name: 'home' })
  }
  // Prevent logged-in users from accessing login page
  else if (to.name === 'login' && user) {
    next({ name: 'home' })
  }
  // Allow navigation
  else {
    next()
  }
})

export default router
