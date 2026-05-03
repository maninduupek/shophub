import { defineStore } from 'pinia'
import type { Product } from '../types/product'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Product[]
  }),
  actions: {
    addItem(product: Product) {
      if (!this.items.find((item) => item.id === product.id)) {
        this.items.push(product)
      }
    },
    removeItem(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId)
    }
  },
  getters: {
    itemCount: (state) => state.items.length
  }
})
