<template>
  <article class="group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-slate-300 cursor-pointer">
    <!-- Discount Badge -->
    <div v-if="discount > 0" class="absolute -top-2 -right-2 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-110">
      -{{ discount }}%
    </div>

    <!-- Product Image - Clickable Link to Detail Page -->
    <router-link :to="`/product/${productId}`" class="block relative overflow-hidden rounded-xl bg-slate-100 group-hover:cursor-pointer">
      <img
        :src="image"
        :alt="title"
        class="h-48 w-full object-cover transition-all duration-500 group-hover:scale-110"
        @error="handleImageError"
      />
      <!-- Overlay on hover -->
      <div class="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-10"></div>
      <!-- Quick view overlay -->
      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20">
        <span class="text-white font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">Quick View</span>
      </div>
    </router-link>

    <!-- Product Info -->
    <div class="mt-4 space-y-3">
      <!-- Title - Clickable Link to Detail Page -->
      <router-link :to="`/product/${productId}`" class="block hover:text-brand-600 transition-colors duration-300">
        <h3 class="text-lg font-semibold text-slate-900 line-clamp-2 leading-tight group-hover:text-brand-600 transition-colors duration-300">
          {{ title }}
        </h3>
      </router-link>

      <!-- Rating -->
      <div class="flex items-center gap-1">
        <div class="flex items-center">
          <svg
            v-for="star in 5"
            :key="star"
            :class="[
              'w-4 h-4 transition-colors duration-300',
              star <= Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : star - 0.5 <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-slate-300'
            ]"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span class="text-sm text-slate-600 ml-1">{{ rating.toFixed(1) }}</span>
      </div>

      <!-- Price -->
      <div class="flex items-center gap-2">
        <span class="text-xl font-bold text-slate-900">${{ price.toFixed(2) }}</span>
        <span v-if="originalPrice && originalPrice > price" class="text-sm text-slate-500 line-through">
          ${{ originalPrice.toFixed(2) }}
        </span>
      </div>

      <!-- Action Button -->
      <button
        class="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-lg active:scale-95 transform"
        @click.stop="$emit('add-to-cart')"
      >
        Add to Cart
      </button>
    </div>
  </article>
</template>

<script lang="ts" setup>
interface Props {
  productId: number
  title: string
  price: number
  image: string
  rating: number
  discount?: number
  originalPrice?: number
}

const props = withDefaults(defineProps<Props>(), {
  discount: 0,
  originalPrice: undefined
})

const emit = defineEmits<{
  'add-to-cart': []
}>()

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=No+Image'
}
</script>
