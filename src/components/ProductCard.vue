<template>
  <article class="group rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <router-link :to="`/product/${product.id}`" class="block">
      <img :src="product.thumbnail" :alt="product.title" class="h-48 w-full rounded-2xl object-cover" />
      <div class="mt-4 space-y-2">
        <div class="flex items-center justify-between gap-4">
          <h3 class="text-lg font-semibold text-slate-900">{{ product.title }}</h3>
          <span class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{{ product.category }}</span>
        </div>
        <p class="text-sm text-slate-600 overflow-hidden text-ellipsis max-h-12">{{ product.description }}</p>
        <div class="flex items-center justify-between text-sm font-semibold text-brand-700">
          <span>${{ product.price }}</span>
          <span>{{ product.rating.toFixed(1) }} ★</span>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script lang="ts" setup>
import type { Product } from '../types/product'

const props = defineProps<{ product: Product }>()
</script>
