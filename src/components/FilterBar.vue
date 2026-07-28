<template>
  <section class="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
    <div class="grid gap-4 sm:grid-cols-[1fr_auto]">
      <div>
        <label class="mb-2 block text-sm font-medium text-slate-700">Search products</label>
        <input
          v-model="term"
          type="search"
          placeholder="Search by title or description"
          class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div>
        <label class="mb-2 block text-sm font-medium text-slate-700">Category</label>
        <CategoryDropdown
          :categories="categories"
          :initialCategory="category"
          @update:category="category = $event"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch } from 'vue'
import CategoryDropdown from './CategoryDropdown.vue'

const props = defineProps<{ categories: string[]; initialTerm: string; initialCategory: string }>()
const emit = defineEmits<{
  (e: 'update:term', value: string): void
  (e: 'update:category', value: string): void
}>()

const term = ref(props.initialTerm)
const category = ref(props.initialCategory)

watch(term, (value) => emit('update:term', value))
watch(category, (value) => emit('update:category', value))
</script>
