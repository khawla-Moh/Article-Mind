<template>
  <span
    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
    :class="badgeClass"
  >
    <span class="w-2 h-2 rounded-full" :class="dotClass"></span>
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: { type: Number, default: 0 },
})

const badgeClass = computed(() => {
  if (props.score >= 70) return 'bg-emerald-100 text-emerald-700 border border-emerald-200'
  if (props.score >= 40) return 'bg-amber-100 text-amber-700 border border-amber-200'
  return 'bg-red-100 text-red-700 border border-red-200'
})

const dotClass = computed(() => {
  if (props.score >= 70) return 'bg-emerald-500'
  if (props.score >= 40) return 'bg-amber-500'
  return 'bg-red-500'
})

const label = computed(() => {
  if (props.score >= 70) return 'High'
  if (props.score >= 40) return 'Medium'
  return 'Low'
})
</script>
