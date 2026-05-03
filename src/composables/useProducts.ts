import { computed, ref } from 'vue'
import type { Product, ProductListResponse } from '../types/product'
import type { Ref } from 'vue'
import { fetchProducts as fetchProductsApi, searchProducts as searchProductsApi } from '../services/api'

/**
 * Composable for fetching and managing products
 * Handles loading, error states, and provides search/filter functionality
 */
export function useProducts() {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch all products from API
   */
  const fetchProducts = async (limit = 100) => {
    isLoading.value = true
    error.value = null

    try {
      const response: ProductListResponse = await fetchProductsApi(limit)
      products.value = response.products
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred while fetching products'
      console.error('Error fetching products:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Search products by query string
   */
  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      await fetchProducts()
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response: ProductListResponse = await searchProductsApi(query)
      products.value = response.products
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Search failed'
      console.error('Error searching products:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get unique categories from loaded products
   */
  const categories = computed(() => {
    const uniqueCategories = new Set(products.value.map((p) => p.category))
    return Array.from(uniqueCategories).sort()
  })

  /**
   * Get total product count
   */
  const totalProducts = computed(() => products.value.length)

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    searchProducts,
    categories,
    totalProducts
  }
}

/**
 * Composable for filtering products by term and category
 */
export function useFilteredProducts(
  products: Ref<Product[]>,
  searchTerm: Ref<string>,
  category: Ref<string>
) {
  return computed(() => {
    const normalizedTerm = searchTerm.value.trim().toLowerCase()
    return products.value.filter((product) => {
      const matchesTerm = normalizedTerm
        ? [product.title, product.description, product.brand].some((value) =>
            value.toLowerCase().includes(normalizedTerm)
          )
        : true
      const matchesCategory = category.value ? product.category === category.value : true
      return matchesTerm && matchesCategory
    })
  })
}
