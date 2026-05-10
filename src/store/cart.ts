import { defineStore } from 'pinia'
import type { Product } from '../types/product'

const STORAGE_KEY = 'shophub-cart'

function loadCart(): Product[] {
  if (typeof window === 'undefined') {
    return []
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return []
  }

  try {
    return JSON.parse(stored) as Product[]
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

function saveCart(items: Product[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCart() as Product[]
  }),
  actions: {
    addItem(product: Product) {
      const existing = this.items.find((item) => item.id === product.id)
      if (!existing) {
        this.items.push(product)
      }
      saveCart(this.items)
    },
    removeItem(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId)
      saveCart(this.items)
    },
    clearCart() {
      this.items = []
      saveCart(this.items)
    }
  },
  getters: {
    itemCount: (state) => state.items.length,
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price, 0)
  }
})
