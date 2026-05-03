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

      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useProducts, useFilteredProducts } from '../composables/useProducts'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'

const { products, isLoading, error, fetchProducts, categories } = useProducts()
const searchTerm = ref('')
const selectedCategory = ref('')

const filteredProducts = useFilteredProducts(products.value, searchTerm.value, selectedCategory.value)

onMounted(() => {
  fetchProducts()
})
</script>
