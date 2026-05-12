<template>
  <div class="space-y-6">
    <!-- Back Button -->
    <div class="flex items-center gap-2">
      <button
        @click="goBack"
        class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:border-slate-300 hover:shadow-md active:scale-95"
      >
        ← Back to Products
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="rounded-2xl bg-slate-100 p-12 text-center">
      <p class="text-slate-700">Loading product details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6">
      <p class="text-red-700">{{ error }}</p>
      <button
        @click="goBack"
        class="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
      >
        Go Back
      </button>
    </div>

    <!-- Product Details -->
    <div v-else-if="product" class="space-y-6">
      <!-- Main Product Section -->
      <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <!-- Product Images -->
        <section class="space-y-4">
          <!-- Main Image -->
          <div class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
            <img
              :src="selectedImage"
              :alt="product.title"
              class="w-full h-96 object-cover rounded-2xl transition-transform duration-500 hover:scale-105 cursor-zoom-in"
              @error="handleImageError"
            />
          </div>

          <!-- Thumbnail Gallery -->
          <div v-if="product.images && product.images.length > 1" class="grid grid-cols-4 gap-3">
            <button
              v-for="(image, index) in product.images.slice(0, 4)"
              :key="index"
              @click="selectedImage = image"
              :class="[
                'relative rounded-lg border-2 overflow-hidden transition-all duration-300 hover:scale-105',
                selectedImage === image
                  ? 'border-brand-600 shadow-lg ring-2 ring-brand-100'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
              ]"
            >
              <img :src="image" :alt="`View ${index + 1}`" class="w-full h-20 object-cover transition-transform duration-300 hover:scale-110" />
            </button>
          </div>
        </section>

        <!-- Product Info and CTA -->
        <section class="space-y-6">
          <!-- Header Info -->
          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <!-- Badge -->
            <div class="flex items-center gap-2 flex-wrap">
              <span v-if="product.discountPercentage > 0" class="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                Save {{ product.discountPercentage }}%
              </span>
              <span class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 capitalize">
                {{ product.category }}
              </span>
            </div>

            <!-- Title & Brand -->
            <div>
              <h1 class="text-3xl font-bold text-slate-900">{{ product.title }}</h1>
              <p class="mt-1 text-slate-600">by <strong>{{ product.brand }}</strong></p>
            </div>

            <!-- Rating -->
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  :class="[
                    'w-4 h-4',
                    star <= Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : star - 0.5 <= product.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-slate-300'
                  ]"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-lg font-semibold text-slate-900">{{ product.rating.toFixed(1) }}</span>
              <span class="text-sm text-slate-600">({{ product.reviews?.length || 0 }} reviews)</span>
            </div>

            <!-- Description -->
            <p class="text-slate-700 leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Price and Add to Cart -->
          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <!-- Pricing -->
            <div class="space-y-2">
              <p class="text-sm uppercase tracking-wider text-slate-500 font-medium">Price</p>
              <div class="flex items-baseline gap-3">
                <span class="text-4xl font-bold text-slate-900">${{ product.price.toFixed(2) }}</span>
                <span v-if="originalPrice > product.price" class="text-lg text-slate-500 line-through">
                  ${{ originalPrice.toFixed(2) }}
                </span>
              </div>
            </div>

            <!-- Stock Status -->
            <div class="flex items-center gap-3 p-3 rounded-lg" :class="product.stock > 0 ? 'bg-green-50' : 'bg-red-50'">
              <div :class="['w-3 h-3 rounded-full', product.stock > 0 ? 'bg-green-500' : 'bg-red-500']"></div>
              <span :class="['font-medium', product.stock > 0 ? 'text-green-700' : 'text-red-700']">
                {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
              </span>
            </div>

            <!-- Quantity Selector -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-slate-700">Quantity</label>
              <div class="flex items-center gap-3 border border-slate-200 rounded-lg w-fit">
                <button
                  @click="quantity = Math.max(1, quantity - 1)"
                  :disabled="quantity <= 1"
                  class="px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  −
                </button>
                <span class="min-w-12 text-center font-semibold">{{ quantity }}</span>
                <button
                  @click="quantity = Math.min(product.stock, quantity + 1)"
                  :disabled="quantity >= product.stock"
                  class="px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Add to Cart Button -->
            <button
              @click="handleAddToCart"
              :disabled="product.stock <= 0"
              class="w-full rounded-lg bg-brand-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-lg active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed transform"
            >
              {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
            </button>

            <!-- Wishlist Button -->
            <button class="w-full rounded-lg border-2 border-slate-200 px-6 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-brand-600 hover:text-brand-600 hover:shadow-md active:scale-95 transform">
              ♡ Add to Wishlist
            </button>
          </div>
        </section>
      </div>

      <!-- Product Specifications -->
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Specifications</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="space-y-2 p-4 rounded-lg bg-slate-50">
            <p class="text-sm uppercase tracking-wider text-slate-500 font-medium">Weight</p>
            <p class="text-lg font-semibold text-slate-900">{{ product.weight }} g</p>
          </div>
          <div class="space-y-2 p-4 rounded-lg bg-slate-50">
            <p class="text-sm uppercase tracking-wider text-slate-500 font-medium">Dimensions</p>
            <p class="text-lg font-semibold text-slate-900">
              {{ product.dimensions.width }} × {{ product.dimensions.height }} × {{ product.dimensions.depth }} cm
            </p>
          </div>
          <div class="space-y-2 p-4 rounded-lg bg-slate-50">
            <p class="text-sm uppercase tracking-wider text-slate-500 font-medium">SKU</p>
            <p class="text-lg font-semibold text-slate-900 font-mono text-sm">{{ product.sku }}</p>
          </div>
          <div class="space-y-2 p-4 rounded-lg bg-slate-50">
            <p class="text-sm uppercase tracking-wider text-slate-500 font-medium">Availability</p>
            <p class="text-lg font-semibold text-slate-900">{{ product.availabilityStatus }}</p>
          </div>
        </div>
      </div>

      <!-- Product Details Info -->
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Warranty & Shipping -->
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 class="text-xl font-bold text-slate-900">Warranty & Shipping</h3>
          <div class="space-y-3 text-slate-700">
            <div class="flex gap-3">
              <span class="font-semibold min-w-fit">Warranty:</span>
              <span>{{ product.warrantyInformation }}</span>
            </div>
            <div class="flex gap-3">
              <span class="font-semibold min-w-fit">Shipping:</span>
              <span>{{ product.shippingInformation }}</span>
            </div>
            <div class="flex gap-3">
              <span class="font-semibold min-w-fit">Returns:</span>
              <span>{{ product.returnPolicy }}</span>
            </div>
            <div class="flex gap-3">
              <span class="font-semibold min-w-fit">Min. Order:</span>
              <span>{{ product.minimumOrderQuantity }} units</span>
            </div>
          </div>
        </div>

        <!-- Product Metadata -->
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 class="text-xl font-bold text-slate-900">Product Info</h3>
          <div class="space-y-3 text-sm text-slate-700">
            <div class="flex justify-between py-2 border-b border-slate-200">
              <span class="font-semibold">Created:</span>
              <span>{{ formatDate(product.meta.createdAt) }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-slate-200">
              <span class="font-semibold">Updated:</span>
              <span>{{ formatDate(product.meta.updatedAt) }}</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="font-semibold">Barcode:</span>
              <span class="font-mono text-xs">{{ product.meta.barcode }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div v-if="product.reviews && product.reviews.length > 0" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Customer Reviews ({{ product.reviews.length }})</h2>
        <div class="space-y-4">
          <div v-for="(review, index) in product.reviews.slice(0, 3)" :key="index" class="border-b border-slate-200 pb-4 last:border-b-0">
            <div class="flex items-start justify-between mb-2">
              <div>
                <p class="font-semibold text-slate-900">{{ review.reviewerName }}</p>
                <p class="text-sm text-slate-500">{{ formatDate(review.date) }}</p>
              </div>
              <div class="flex gap-0.5">
                <svg
                  v-for="star in 5"
                  :key="star"
                  :class="[
                    'w-4 h-4',
                    star <= review.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                  ]"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p class="text-slate-700">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProductById } from '../services/api'
import { useCartStore } from '../store/cart'
import type { Product } from '../types/product'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const selectedImage = ref<string>('')
const quantity = ref(1)

const originalPrice = computed(() => {
  if (!product.value) return 0
  return product.value.price / (1 - product.value.discountPercentage / 100)
})

const loadProduct = async () => {
  const id = Number(route.params.id)
  if (!Number.isFinite(id)) {
    router.push('/')
    return
  }

  isLoading.value = true
  error.value = null

  try {
    product.value = await fetchProductById(id)
    selectedImage.value = product.value.thumbnail
    quantity.value = 1
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load product'
    console.error('Error loading product:', err)
  } finally {
    isLoading.value = false
  }
}

const handleAddToCart = () => {
  if (product.value && product.value.stock > 0) {
    // Add product to cart (quantity support would require cart modification)
    cartStore.addItem(product.value)
    console.log(`Added ${quantity.value} × ${product.value.title} to cart`)
    // You could show a toast notification here
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/500x500/f3f4f6/9ca3af?text=No+Image'
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const goBack = () => router.back()

onMounted(loadProduct)
</script>
