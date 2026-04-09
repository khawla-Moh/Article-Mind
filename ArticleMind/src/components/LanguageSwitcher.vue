<template>
  <button
    @click="toggleLocale"
    class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 backdrop-blur-sm border border-brown-200 hover:border-brown-400 hover:bg-white transition-all duration-300 text-sm font-medium text-brown-700"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
    </svg>
    <span>{{ t('common.switchLang') }}</span>
  </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function toggleLocale() {
  const newLocale = locale.value === 'en' ? 'ar' : 'en'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLocale
}
</script>
