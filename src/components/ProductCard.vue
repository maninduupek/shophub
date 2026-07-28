<template>
  <article class="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 relative">
    <!-- Product Image - Clickable -->
    <router-link :to="resolvedLink" class="block">
      <div class="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
        <div class="absolute top-2 right-2 z-10 rounded-bl-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
          -{{ discount }}%
        </div>
        <img
          :src="image"
          :alt="title"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </div>
    </router-link>

    <!-- Product Title - Clickable -->
    <router-link :to="resolvedLink" class="block">
      <h3 class="mt-3 text-lg font-semibold text-slate-900 line-clamp-2">
        {{ title }}
      </h3>
    </router-link>

    <!-- Product Rating -->
    <div v-if="rating > 0" class="flex items-center gap-1 mb-2">
      <div class="flex items-center">
        <svg
          v-for="star in 5"
          :key="star"
          :class="[
            'w-4 h-4',
            star <= Math.floor(rating)
              ? 'text-yellow-400 fill-current'
              : star - 0.5 <= rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          ]"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <span class="text-sm text-gray-600">{{ rating.toFixed(1) }}</span>
    </div>

    <!-- Product Price -->
    <div class="flex items-center gap-2 mb-4">
      <span class="text-xl font-bold text-gray-900">${{ price.toFixed(2) }}</span>
      <span v-if="originalPrice && originalPrice > price" class="text-sm text-gray-500 line-through">
        ${{ originalPrice.toFixed(2) }}
      </span>
    </div>

    <!-- Add to Cart Button -->
    <button
      class="w-full rounded-2xl bg-brand-600 py-3 px-4 text-sm font-semibold text-white focus:outline-none"
      @click.stop="$emit('add-to-cart')"
    >
      Add to Cart
    </button>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  productId: number
  title: string
  price: number
  image: string
  rating?: number
  discount?: number
  originalPrice?: number
  linkTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  rating: 0,
  discount: 0,
  originalPrice: undefined,
  linkTo: undefined
})

const emit = defineEmits<{
  'add-to-cart': []
}>()

const resolvedLink = computed(() => props.linkTo ?? `/product/${props.productId}`)

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=No+Image'
}
</script>
