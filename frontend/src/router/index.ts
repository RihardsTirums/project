import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Posts from '@/views/posts/Posts.vue'
// import PostForm     from '@/views/posts/Form.vue'
// import Profile      from '@/views/Profile.vue'
import { useAuthStore } from '@/stores/auth'

export const routes = [
  // Now welcome is guest-only
  { path: '/', name: 'welcome', component: Welcome, meta: { guest: true, navLabel: 'Home' } },
  // Only for guests
  { path: '/login', name: 'login', component: Login, meta: { guest: true, navLabel: 'Login' } },
  { path: '/register', name: 'register', component: Register, meta: { guest: true, navLabel: 'Register' } },
  // Only for authenticated users
  { path: '/posts', name: 'posts', component: Posts, meta: { auth: true, navLabel: 'Posts' } },
  // { path: '/posts/create',name: 'posts.create', component: PostForm,   meta: { auth: true,   navLabel: 'New Post' } },
  // { path: '/profile',     name: 'profile',      component: Profile,    meta: { auth: true,   navLabel: 'Profile' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()

  if (to.meta.auth && !auth.user) {
    return next({ name: 'login' })
  }

  if (to.meta.guest && auth.user) {
    return next({ name: 'posts' })
  }

  next()
})

export default router
