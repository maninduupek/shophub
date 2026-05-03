<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <NavBar />
    <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import NavBar from './components/NavBar.vue'
</script>
