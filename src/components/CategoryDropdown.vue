<template>
  <div>
    <select
      v-model="selected"
      class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
    >
      <option value="">All categories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch } from 'vue'

const props = defineProps<{ categories: string[]; initialCategory: string }>()
const emit = defineEmits<{
  (e: 'update:category', value: string): void
}>()

const selected = ref(props.initialCategory)

watch(selected, (value) => emit('update:category', value))
</script>
