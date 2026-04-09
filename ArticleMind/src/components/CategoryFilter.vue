<template>
  <div class="space-y-4">
    <!-- Categories -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat.value"
        @click="$emit('categoryChange', cat.value)"
        class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        :class="selectedCategory === cat.value
          ? 'bg-gradient-to-r from-brown-600 to-brown-500 text-white shadow-lg shadow-brown-500/25'
          : 'bg-white/80 text-brown-600 border border-brown-200 hover:border-brown-400 hover:bg-white'"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- Time Dropdown -->
    <div class="flex items-center gap-3">
      <label class="text-sm font-medium text-brown-600">{{ t('news.timePeriod') }}:</label>
      <select
        :value="selectedTime"
        @change="$emit('timeChange', $event.target.value)"
        class="px-4 py-2 rounded-xl bg-white/80 border border-brown-200 text-brown-700 text-sm focus:outline-none focus:ring-2 focus:ring-brown-500/30 focus:border-brown-400 transition-all"
      >
        <option value="all">All</option>
        <option value="24h">{{ t('news.last24h') }}</option>
        <option value="week">{{ t('news.lastWeek') }}</option>
        <option value="month">{{ t('news.lastMonth') }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  categories: { type: Array, required: true },
  selectedCategory: { type: String, default: 'all' },
  selectedTime: { type: String, default: '24h' },
})

defineEmits(['categoryChange', 'timeChange'])
</script>
