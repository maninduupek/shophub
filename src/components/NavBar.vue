<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white">
    <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <router-link to="/" class="flex items-center gap-2 flex-shrink-0">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <span class="hidden sm:inline text-lg font-semibold text-slate-900">ShopHub</span>
        </router-link>

        <div class="flex-1 min-w-0 md:max-w-xl">
          <div class="relative hidden md:block">
            <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search products..."
              class="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-500 outline-none focus:border-slate-900"
              @keydown.enter="handleSearch"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 md:hidden"
          @click="showMobileSearch = !showMobileSearch"
          aria-label="Toggle search"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <router-link
          to="/cart"
          class="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
          aria-label="View cart"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="cartCount > 0" class="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-[0.65rem] font-semibold text-white">
            {{ cartCount }}
          </span>
        </router-link>

        <button
          class="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
          @click="toggleProfile"
          aria-label="Account menu"
        >
          <svg class="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Account
        </button>

        <button
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 md:hidden"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="Open menu"
        >
          <svg class="h-5 w-5" :class="{ 'rotate-90': isMobileMenuOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div v-if="showMobileSearch" class="w-full pt-3 md:hidden">
        <div class="relative">
          <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search products..."
            class="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-500 outline-none focus:border-slate-900"
            @keydown.enter="handleSearch"
          />
        </div>
      </div>

      <nav v-if="isMobileMenuOpen" class="w-full space-y-2 border-t border-slate-200 pt-3 md:hidden">
        <router-link
          to="/"
          class="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
          @click="isMobileMenuOpen = false"
        >
          Home
        </router-link>
        <router-link
          to="/cart"
          class="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
          @click="isMobileMenuOpen = false"
        >
          Cart
        </router-link>
        <button
          class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700"
          @click="toggleProfile(); isMobileMenuOpen = false"
        >
          Account
        </button>
      </nav>

      <div v-if="isProfileOpen" class="absolute right-4 top-full z-20 mt-2 w-48 rounded-2xl border border-slate-200 bg-white">
        <div class="px-4 py-3 border-b border-slate-200">
          <p class="text-sm text-slate-600">{{ displayName }}</p>
        </div>
        <template v-if="isAuthenticated">
          <button class="w-full px-4 py-3 text-left text-sm text-slate-700" @click="handleLogout">Logout</button>
        </template>
        <template v-else>
          <button class="w-full px-4 py-3 text-left text-sm text-slate-700" @click="handleLogin">Sign In</button>
          <button class="w-full px-4 py-3 text-left text-sm text-slate-700" @click="handleSignUp">Sign Up</button>
        </template>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'
import { useAuthStore } from '../store/auth'

const emit = defineEmits<{
  search: [query: string]
}>()

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const searchQuery = ref('')
const showMobileSearch = ref(false)
const isMobileMenuOpen = ref(false)
const isProfileOpen = ref(false)

const cartCount = computed(() => cartStore.itemCount)
const displayName = computed(() => authStore.displayName)
const isAuthenticated = computed(() => authStore.isAuthenticated)

const handleSearch = () => {
  const query = searchQuery.value.trim()
  if (query) {
    emit('search', query)
    searchQuery.value = ''
    showMobileSearch.value = false
  }
}

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value
}

const handleLogin = () => {
  isProfileOpen.value = false
  router.push('/signin')
}

const handleSignUp = () => {
  isProfileOpen.value = false
  router.push('/signup')
}

const handleLogout = () => {
  authStore.logout()
  isProfileOpen.value = false
  router.push('/')
}
</script>

