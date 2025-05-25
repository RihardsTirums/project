import { createRouter, createWebHistory, type RouteRecordRaw, type RouteLocationNormalized } from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Post from '@/views/post/Post.vue'
import PostCard from '@/components/posts/PostCard.vue'
import { useAuthStore } from '@/stores/auth'
import Profile from '@/views/user/Profile.vue'
import PostFormView from '@/views/post/PostFormView.vue'
import { fetchPost } from '@/services/post'

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
    path: '/posts/form/:id?',
    name: 'posts.form',
    component: PostFormView,
    props: route => ({
      postId: route.params.id ? Number(route.params.id) : undefined,
    }),
    meta: {
      auth: true,
      navLabel: 'Post Form',
      requireOwner: (to: RouteLocationNormalized) =>
        typeof to.params.id !== 'undefined',
    },
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

  if (
    to.meta.requireOwner &&
    (to.meta.requireOwner as (r: RouteLocationNormalized) => boolean)(to)
  ) {
    const postId = Number(to.params.id)
    try {
      const response = await fetchPost(postId)
      if (response.data.user.id !== auth.user!.id) {
        return next({ name: 'posts' })
      }
    } catch {
      return next({ name: 'posts' })
    }
  }

  next()
})

export default router