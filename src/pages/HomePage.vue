<template>
  <div class="space-y-6">
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 class="text-2xl font-semibold text-slate-900">Shop the latest products</h1>
      <p class="mt-2 text-slate-600">Browse a curated list of DummyJSON products with search and category filtering.</p>
    </section>

    <FilterBar
      :categories="categories"
      :initialTerm="searchTerm"
      :initialCategory="selectedCategory"
      @update:term="searchTerm = $event"
      @update:category="selectedCategory = $event"
    />

    <section>
      <div class="mb-4 flex items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm">
        <div>
          <h2 class="text-lg font-semibold text-slate-900">Products</h2>
          <p class="mt-1 text-sm text-slate-600">Showing {{ filteredProducts.length }} of {{ products.length }} items.</p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { fetchProducts } from '../services/api'
import type { Product } from '../types/product'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'

const products = ref<Product[]>([])
const categories = ref<string[]>([])
const searchTerm = ref('')
const selectedCategory = ref('')

const loadProducts = async () => {
  const response = await fetchProducts()
  products.value = response.products
  categories.value = Array.from(new Set(response.products.map((product) => product.category))).sort()
}

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesTerm = [product.title, product.description].some((field) =>
      field.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
    const matchesCategory = selectedCategory.value ? product.category === selectedCategory.value : true
    return matchesTerm && matchesCategory
  })
})

onMounted(loadProducts)
</script>
