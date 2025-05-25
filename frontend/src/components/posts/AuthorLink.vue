<script setup lang="ts">
import type { User } from '@/types/post'
const props = defineProps<{ user: User }>()
</script>

<template>
  <router-link
    :to="{ name: 'profile', params: { id: props.user.id } }"
    class="text-indigo-600 hover:underline"
  >
    {{ props.user.name }}
  </router-link>
</template>
