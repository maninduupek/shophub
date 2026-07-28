<template>
  <div class="mx-auto max-w-7xl space-y-6">
    <div class="flex items-center gap-2">
      <button
        @click="goBack"
        class="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
      >
        ← Back
      </button>
    </div>

    <div v-if="isLoading" class="rounded-3xl border border-slate-200 bg-white p-8 text-center">
      <p class="text-slate-700">Loading product details...</p>
    </div>

    <div v-else-if="error" class="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
      <p class="text-red-700">{{ error }}</p>
    </div>

    <div v-else-if="product" class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="rounded-3xl border border-slate-200 bg-white p-4">
        <img
          :src="selectedImage"
          :alt="product.title"
          class="w-full rounded-3xl object-cover"
          @error="handleImageError"
        />
      </div>

      <div class="space-y-6">
        <div class="rounded-3xl border border-slate-200 bg-white p-4 space-y-4">
          <div class="flex flex-wrap items-center gap-3">
            <span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 capitalize">
              {{ product.category }}
            </span>
            <span class="text-sm text-slate-500">by {{ product.brand }}</span>
          </div>

          <div>
            <h1 class="text-3xl font-bold text-slate-900">{{ product.title }}</h1>
            <p class="mt-3 text-sm text-slate-600 leading-relaxed">{{ product.description }}</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1">
              <svg
                v-for="star in 5"
                :key="star"
                :class="[
                  'h-5 w-5',
                  star <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-slate-300'
                ]"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-sm font-semibold text-slate-900">{{ product.rating.toFixed(1) }}</span>
            <span class="text-sm text-slate-500">({{ product.stock }} in stock)</span>
          </div>

          <div class="rounded-3xl bg-slate-50 p-4">
            <p class="text-sm text-slate-500">Price</p>
            <p class="text-3xl font-bold text-slate-900">${{ product.price.toFixed(2) }}</p>
          </div>

          <button
            @click="handleAddToCart"
            :disabled="product.stock <= 0"
            class="w-full rounded-2xl bg-brand-600 px-6 py-3 text-lg font-semibold text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProductById } from '../services/api'
import { useCartStore } from '../store/cart'
import type { Product } from '../types/product'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const selectedImage = ref<string>('')

const loadProduct = async () => {
  const id = Number(route.params.id)
  if (!Number.isFinite(id)) {
    router.push('/')
    return
  }

  isLoading.value = true
  error.value = null

  try {
    product.value = await fetchProductById(id)
    selectedImage.value = product.value.thumbnail
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load product'
    console.error('Error loading product:', err)
  } finally {
    isLoading.value = false
  }
}

const handleAddToCart = () => {
  if (product.value && product.value.stock > 0) {
    cartStore.addItem(product.value)
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/500x500/f3f4f6/9ca3af?text=No+Image'
}

const goBack = () => router.back()

onMounted(loadProduct)
</script>
