<template>
    <NavBar />
    <main class="py-8">
        <router-view />
    </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>