<template>
  <div class="space-y-6">
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <button @click="goBack" class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
        ← Back
      </button>
    </div>

    <div v-if="product" class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <img :src="product.thumbnail" :alt="product.title" class="w-full rounded-3xl object-cover" />
        <div class="mt-6 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 class="text-3xl font-semibold text-slate-900">{{ product.title }}</h1>
              <p class="text-sm text-slate-500">{{ product.brand }} · {{ product.category }}</p>
            </div>
            <p class="rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">{{ product.rating.toFixed(1) }} ★</p>
          </div>
          <p class="text-slate-700">{{ product.description }}</p>
        </div>
      </section>

      <aside class="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="space-y-2">
          <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Price</p>
          <p class="text-3xl font-semibold text-slate-900">${{ product.price }}</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="rounded-3xl bg-slate-50 p-4">
            <p class="text-sm text-slate-500">Stock</p>
            <p class="text-lg font-semibold text-slate-900">{{ product.stock }}</p>
          </div>
          <div class="rounded-3xl bg-slate-50 p-4">
            <p class="text-sm text-slate-500">Discount</p>
            <p class="text-lg font-semibold text-slate-900">{{ product.discountPercentage }}%</p>
          </div>
        </div>
        <button class="w-full rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
          Add to Cart
        </button>
      </aside>
    </div>

    <div v-else class="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
      Loading product details...
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProductById } from '../services/api'
import type { Product } from '../types/product'

const route = useRoute()
const router = useRouter()
const product = ref<Product | null>(null)

const loadProduct = async () => {
  const id = Number(route.params.id)
  if (!Number.isFinite(id)) {
    router.push('/')
    return
  }

  try {
    product.value = await fetchProductById(id)
  } catch {
    router.push('/')
  }
}

const goBack = () => router.back()

onMounted(loadProduct)
</script>
