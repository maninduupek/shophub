<template>
  <aside class="space-y-6">
    <!-- Filter Header -->
    <div class="rounded-3xl border border-slate-200 bg-white p-5">
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-lg font-semibold text-slate-900">Filters</h2>
        <button
          v-if="hasActiveFilters"
          @click="clearFilters"
          class="text-sm font-medium text-brand-600"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Price Range Filter -->
    <div class="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 class="mb-3 font-semibold text-slate-900">Price Range</h3>
      <div class="space-y-4">
        <div>
          <label class="text-sm text-slate-600 mb-2 block">Min: ${{ minPrice }}</label>
          <input
            v-model.number="minPrice"
            type="range"
            min="0"
            max="1000"
            step="10"
            class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
          />
        </div>
        <div>
          <label class="text-sm text-slate-600 mb-2 block">Max: ${{ maxPrice }}</label>
          <input
            v-model.number="maxPrice"
            type="range"
            min="0"
            max="1000"
            step="10"
            class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
          />
        </div>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 class="mb-4 font-semibold text-slate-900">Categories</h3>
      <div class="space-y-3">
        <label class="flex items-center gap-3 cursor-pointer p-2 rounded-lg">
          <input
            type="radio"
            name="category"
            value=""
            v-model="selectedCategory"
            class="w-4 h-4 text-brand-600 border-slate-300 rounded"
          />
          <span class="text-sm text-slate-700">All Categories</span>
        </label>

        <label
          v-for="cat in categories"
          :key="cat"
          class="flex items-center gap-3 cursor-pointer p-2 rounded-lg"
        >
          <input
            type="radio"
            name="category"
            :value="cat"
            v-model="selectedCategory"
            class="w-4 h-4 text-brand-600 border-slate-300 rounded"
          />
          <span class="text-sm text-slate-700 capitalize">
            {{ cat }}
          </span>
          <span class="ml-auto text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {{ getProductCount(cat) }}
          </span>
        </label>
      </div>
    </div>

    <!-- Rating Filter -->
    <div class="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 class="mb-4 font-semibold text-slate-900">Rating</h3>
      <div class="space-y-3">
        <label class="flex items-center gap-3 cursor-pointer p-2 rounded-lg">
          <input
            type="checkbox"
            :checked="minRating === 0"
            @change="minRating = 0"
            class="w-4 h-4 text-brand-600 border-slate-300 rounded"
          />
          <span class="text-sm text-slate-700">All Ratings</span>
        </label>

        <div class="space-y-2">
          <label
            v-for="rating in [4, 3, 2]"
            :key="rating"
            class="flex items-center gap-2 cursor-pointer p-2 rounded-lg"
          >
            <input
              type="checkbox"
              :checked="minRating === rating"
              @change="minRating = rating"
              class="w-4 h-4 text-brand-600 border-slate-300 rounded"
            />
            <div class="flex items-center gap-1">
              <svg
                v-for="star in 5"
                :key="star"
                :class="[
                  'w-3 h-3',
                  star <= rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                ]"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-sm text-slate-700">& Up</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Availability Filter -->
    <div class="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 class="mb-4 font-semibold text-slate-900">Availability</h3>
      <div class="space-y-3">
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="inStockOnly"
            class="w-4 h-4 text-brand-600 border-slate-300 rounded"
          />
          <span class="text-sm text-slate-700">In Stock Only</span>
        </label>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import type { Product } from '../types/product'

interface Props {
  categories: string[]
  products: Product[]
  initialCategory?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialCategory: ''
})

const emit = defineEmits<{
  'update:category': [value: string]
  'update:minPrice': [value: number]
  'update:maxPrice': [value: number]
  'update:minRating': [value: number]
  'update:inStock': [value: boolean]
}>()

const selectedCategory = ref(props.initialCategory)
const minPrice = ref(0)
const maxPrice = ref(1000)
const minRating = ref(0)
const inStockOnly = ref(false)

const hasActiveFilters = computed(
  () =>
    selectedCategory.value !== '' ||
    minPrice.value > 0 ||
    maxPrice.value < 1000 ||
    minRating.value > 0 ||
    inStockOnly.value
)

const getProductCount = (category: string): number => {
  return props.products.filter((p) => p.category === category).length
}

const clearFilters = () => {
  selectedCategory.value = ''
  minPrice.value = 0
  maxPrice.value = 1000
  minRating.value = 0
  inStockOnly.value = false
}

// Watch for changes and emit events
import { watch } from 'vue'

watch(selectedCategory, (value) => emit('update:category', value))
watch(minPrice, (value) => emit('update:minPrice', value))
watch(maxPrice, (value) => emit('update:maxPrice', value))
watch(minRating, (value) => emit('update:minRating', value))
watch(inStockOnly, (value) => emit('update:inStock', value))
</script>
