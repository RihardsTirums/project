import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Post from '@/views/post/Post.vue'
import { useAuthStore } from '@/stores/auth'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
    meta: { guest: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { guest: true }
  },
  {
    path: '/posts',
    name: 'posts',
    component: Post,
    meta: { auth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const auth = useAuthStore()
      return auth.user
        ? { name: 'posts' }
        : { name: 'welcome' }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _, next) => {
  const auth = useAuthStore()
  await auth.load()

  if (to.meta.auth && !auth.user) {
    return next({ name: 'login' })
  }

  if (to.meta.guest && auth.user) {
    return next({ name: 'posts' })
  }

  next()
})

export default router

// { path: '/posts/create',name: 'posts.create', component: PostForm,   meta: { auth: true,   navLabel: 'New Post' } },
// { path: '/profile',     name: 'profile',      component: Profile,    meta: { auth: true,   navLabel: 'Profile' } },