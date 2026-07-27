<template>
  <div class="space-y-6">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 class="text-2xl font-semibold text-slate-900">Shop the latest products</h1>
      <p class="mt-2 text-slate-600">Browse a curated list of DummyJSON products with advanced filtering.</p>
    </section>

    <!-- Search Bar -->
    <div class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <input
        v-model="localSearchTerm"
        type="search"
        placeholder="Search products..."
        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:shadow-lg"
        @keydown.enter="handleFilterBarSearch(localSearchTerm)"
      />
    </div>

    <!-- Two Column Layout: Sidebar + Products -->
    <div class="grid gap-6 lg:grid-cols-[280px_1fr]">
      <!-- Sidebar (Hidden on mobile) -->
      <div class="hidden lg:block">
        <FilterSidebar
          :categories="categories"
          :products="products"
          :initial-category="selectedCategory"
          @update:category="selectedCategory = $event"
          @update:minPrice="minPrice = $event"
          @update:maxPrice="maxPrice = $event"
          @update:minRating="minRating = $event"
          @update:inStock="inStockOnly = $event"
        />
      </div>

      <!-- Products Section -->
      <section class="space-y-4">
        <div class="flex items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Products</h2>
            <p class="mt-1 text-sm text-slate-600" v-if="!isLoading">
              Showing {{ filteredProducts.length }} of {{ products.length }} items.
            </p>
            <p class="mt-1 text-sm text-slate-600" v-else>Loading products...</p>
          </div>
        </div>

        <div v-if="isLoading" class="rounded-2xl bg-slate-100 p-8 text-center">
          <p class="text-slate-700">Loading products...</p>
        </div>

        <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-4">
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="rounded-2xl bg-slate-100 p-8 text-center">
          <p class="text-slate-700">No products found. Try adjusting your filters.</p>
        </div>

        <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product-id="product.id"
            :title="product.title"
            :price="product.price"
            :image="product.thumbnail"
            :rating="product.rating"
            :discount="product.discountPercentage"
            :original-price="product.price / (1 - product.discountPercentage / 100)"
            @add-to-cart="handleAddToCart(product)"
            class="h-full"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useProducts } from '../composables/useProducts'
import { useCartStore } from '../store/cart'
import type { Product } from '../types/product'
import ProductCard from '../components/ProductCard.vue'
import FilterSidebar from '../components/FilterSidebar.vue'

interface Props {
  globalSearchTerm?: string
}

const props = withDefaults(defineProps<Props>(), {
  globalSearchTerm: ''
})

const { products, isLoading, error, fetchProducts, categories } = useProducts()
const cartStore = useCartStore()
const localSearchTerm = ref('')
const selectedCategory = ref('')
const minPrice = ref(0)
const maxPrice = ref(1000)
const minRating = ref(0)
const inStockOnly = ref(false)

// Watch for global search term changes and apply local filtering
watch(() => props.globalSearchTerm, (newTerm) => {
  localSearchTerm.value = newTerm || ''
})

const filteredProducts = computed(() => {
  const normalizedTerm = localSearchTerm.value.trim().toLowerCase()

  return products.value.filter((product) => {
    const categoryMatch = !selectedCategory.value || product.category === selectedCategory.value
    const priceMatch = product.price >= minPrice.value && product.price <= maxPrice.value
    const ratingMatch = product.rating >= minRating.value
    const stockMatch = !inStockOnly.value || product.stock > 0

    const searchMatch = normalizedTerm
      ? [product.title, product.description, product.brand].some((value) =>
          value.toLowerCase().includes(normalizedTerm)
        )
      : true

    return categoryMatch && priceMatch && ratingMatch && stockMatch && searchMatch
  })
})

const handleAddToCart = (product: Product) => {
  cartStore.addItem(product)
  console.log(`Added ${product.title} to cart`)
}

const handleFilterBarSearch = (term: string) => {
  localSearchTerm.value = term
}

onMounted(() => {
  fetchProducts()
})
</script>
