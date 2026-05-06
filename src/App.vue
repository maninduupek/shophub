<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <NavBar @search="handleGlobalSearch" />
    <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <router-view v-slot="{ Component }">
        <component :is="Component" :global-search-term="globalSearchTerm" />
      </router-view>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'

const globalSearchTerm = ref('')

const handleGlobalSearch = (query: string) => {
  globalSearchTerm.value = query
}
</script>
