<template>
  <div class="space-y-6">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 class="text-2xl font-semibold text-slate-900">Shopping Cart</h1>
      <p class="mt-2 text-slate-600">Review and manage your cart items.</p>
    </section>

    <section class="grid gap-6 lg:grid-cols-3">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <div v-if="items.length === 0" class="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <p class="mt-4 text-lg text-slate-600">Your cart is empty</p>
          <router-link
            to="/"
            class="mt-4 inline-block rounded-lg bg-brand-600 px-6 py-2 text-sm font-medium text-white hover:bg-brand-700 transition"
          >
            Continue Shopping
          </router-link>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="item in items"
            :key="item.id"
            class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex gap-4"
          >
            <img :src="item.thumbnail" :alt="item.title" class="h-24 w-24 rounded-lg object-cover" />
            <div class="flex-1">
              <h3 class="text-sm font-semibold text-slate-900">{{ item.title }}</h3>
              <p class="text-sm text-slate-600 mt-1">${{ item.price.toFixed(2) }}</p>
            </div>
            <button
              @click="removeFromCart(item.id)"
              class="self-center rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-200 transition"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
        <h2 class="text-lg font-semibold text-slate-900">Order Summary</h2>
        <div class="mt-6 space-y-3 border-b border-slate-200 pb-4">
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-600">Subtotal</span>
            <span class="font-medium text-slate-900">${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-600">Tax (10%)</span>
            <span class="font-medium text-slate-900">${{ tax.toFixed(2) }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-600">Shipping</span>
            <span class="font-medium text-slate-900">{{ items.length > 0 ? '$5.00' : '$0.00' }}</span>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between text-lg font-semibold text-slate-900">
          <span>Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
        <button
          :disabled="items.length === 0"
          class="mt-6 w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Checkout
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useCartStore } from '../store/cart'

const cartStore = useCartStore()
const items = computed(() => cartStore.items)

const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price, 0))
const tax = computed(() => subtotal.value * 0.1)
const shipping = computed(() => (items.value.length > 0 ? 5 : 0))
const total = computed(() => subtotal.value + tax.value + shipping.value)

const removeFromCart = (productId: number) => {
  cartStore.removeItem(productId)
}
</script>
