import { computed } from 'vue'
import type { Product } from '../types/product'

export function useFilteredProducts(products: Product[], searchTerm: string, category: string) {
  return computed(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase()
    return products.filter((product) => {
      const matchesTerm = normalizedTerm
        ? [product.title, product.description].some((value) => value.toLowerCase().includes(normalizedTerm))
        : true
      const matchesCategory = category ? product.category === category : true
      return matchesTerm && matchesCategory
    })
  })
}
