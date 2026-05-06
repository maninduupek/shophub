<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 flex-shrink-0">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
          <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <span class="hidden sm:inline text-xl font-bold text-slate-900">ShopHub</span>
      </router-link>

      <!-- Search Bar (Desktop) -->
      <div class="hidden md:flex flex-1 max-w-sm items-center">
        <div class="relative w-full">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search products..."
            class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 pl-10 text-sm placeholder-slate-500 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
            @keydown.enter="handleSearch"
          />
          <svg
            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Search Icon (Mobile) -->
        <button
          class="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          aria-label="Search"
          @click="showMobileSearch = !showMobileSearch"
        >
          <svg class="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>

        <!-- Cart Icon -->
        <router-link
          to="/cart"
          class="relative p-2 rounded-lg hover:bg-slate-100 transition group"
          aria-label="Shopping cart"
        >
          <svg class="h-5 w-5 text-slate-600 group-hover:text-brand-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span v-if="cartCount > 0" class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {{ cartCount }}
          </span>
        </router-link>

        <!-- Profile/Login Button -->
        <button
          class="hidden sm:flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
          @click="isProfileOpen = !isProfileOpen"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span class="hidden md:inline">Account</span>
        </button>

        <!-- Mobile Menu Button -->
        <button
          class="sm:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="Menu"
        >
          <svg class="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Search Bar -->
    <div v-if="showMobileSearch" class="border-t border-slate-200 bg-slate-50 px-4 py-3 md:hidden">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search products..."
        class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm placeholder-slate-500 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        @keydown.enter="handleSearch"
      />
    </div>

    <!-- Mobile Menu -->
    <nav v-if="isMobileMenuOpen" class="border-t border-slate-200 bg-white px-4 py-4 sm:hidden space-y-2">
      <router-link
        to="/"
        class="block rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
        @click="isMobileMenuOpen = false"
      >
        Home
      </router-link>
      <router-link
        to="/cart"
        class="block rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
        @click="isMobileMenuOpen = false"
      >
        Cart
      </router-link>
      <button
        class="w-full rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition text-left"
        @click="isProfileOpen = !isProfileOpen; isMobileMenuOpen = false"
      >
        Account
      </button>
    </nav>

    <!-- Profile Dropdown -->
    <div v-if="isProfileOpen" class="absolute right-4 top-full mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
      <div class="px-4 py-3 border-b border-slate-200">
        <p class="text-sm text-slate-600">Guest User</p>
      </div>
      <nav class="space-y-1 px-2 py-2">
        <button
          class="w-full text-left rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
          @click="handleLogin"
        >
          Sign In
        </button>
        <button
          class="w-full text-left rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
          @click="handleLogout"
        >
          Sign Up
        </button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useCartStore } from '../store/cart'

const emit = defineEmits<{
  search: [query: string]
}>()

const cartStore = useCartStore()
const searchQuery = ref('')
const isMobileMenuOpen = ref(false)
const showMobileSearch = ref(false)
const isProfileOpen = ref(false)

const cartCount = computed(() => cartStore.itemCount)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
    searchQuery.value = ''
    showMobileSearch.value = false
  }
}

const handleLogin = () => {
  console.log('Login')
  isProfileOpen.value = false
}

const handleLogout = () => {
  console.log('Sign Up')
  isProfileOpen.value = false
}
</script>

