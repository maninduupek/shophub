<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <div class="text-center">
        <router-link to="/" class="inline-flex items-center justify-center gap-2 text-slate-900">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <span class="text-xl font-semibold">ShopHub</span>
        </router-link>
        <h2 class="mt-6 text-3xl font-semibold text-slate-900">Welcome Back</h2>
        <p class="mt-2 text-sm text-slate-600">Sign in to access your account and continue shopping.</p>
      </div>

      <form class="space-y-6" @submit.prevent="handleSignIn">
        <div>
          <label class="text-sm font-medium text-slate-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-200"
          />
          <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <div>
          <div class="flex items-center justify-between text-sm font-medium text-slate-700">
            <label>Password</label>
            <a href="#" class="text-brand-600 hover:underline">Forgot Password?</a>
          </div>
          <div class="mt-2 relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-28 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-200"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-3 inline-flex items-center rounded-full bg-slate-100 px-3 text-xs font-semibold text-slate-700"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
        </div>

        <div class="flex items-center justify-between gap-4">
          <label class="inline-flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" v-model="rememberMe" class="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
            Remember Me
          </label>
        </div>

        <div>
          <button
            type="submit"
            class="w-full rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white"
          >
            Sign In
          </button>
          <p v-if="errors.general" class="mt-3 text-center text-sm text-red-600">{{ errors.general }}</p>
        </div>
      </form>

      <p class="text-center text-sm text-slate-600">
        Don't have an account?
        <button @click="goToSignUp" class="font-semibold text-brand-600 hover:underline">Sign Up</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

const validateEmail = (value: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(value)
}

const clearErrors = () => {
  errors.email = ''
  errors.password = ''
  errors.general = ''
}

const validateForm = () => {
  clearErrors()

  if (!email.value.trim()) {
    errors.email = 'Email is required.'
  } else if (!validateEmail(email.value.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!password.value) {
    errors.password = 'Password is required.'
  } else if (password.value.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  return !errors.email && !errors.password
}

const handleSignIn = () => {
  if (!validateForm()) {
    return
  }

  try {
    authStore.login(email.value.trim(), password.value)
    router.push('/'
    )
  } catch (error) {
    errors.general = error instanceof Error ? error.message : 'Unable to sign in.'
  }
}

const goToSignUp = () => {
  router.push('/signup')
}
</script>
