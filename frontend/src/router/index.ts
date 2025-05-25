import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Post from '@/views/post/Post.vue'
import PostCard from '@/components/posts/PostCard.vue'
import { useAuthStore } from '@/stores/auth'
import Profile from '@/views/user/Profile.vue'

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
    path: '/posts/:id',
    name: 'post.show',
    component: PostCard,
    props: route => ({
      id: Number(route.params.id),
      expanded: true
    }),
    meta: { auth: true },
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: Profile,
    props: route => ({ id: Number(route.params.id) }),
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