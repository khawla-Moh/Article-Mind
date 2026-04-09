<template>
  <div class="flex items-center justify-center py-12">
    <div class="relative">
      <div class="w-12 h-12 border-4 border-brown-200 rounded-full"></div>
      <div class="absolute top-0 left-0 w-12 h-12 border-4 border-brown-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <span class="ml-4 rtl:mr-4 rtl:ml-0 text-brown-600 font-medium">{{ t('common.loading') }}</span>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
