<template>
  <div class="page-container">
    <!-- Back button -->
    <button @click="$router.back()" class="flex items-center gap-2 text-brown-500 hover:text-brown-700 font-medium mb-6 transition-colors group">
      <svg class="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      {{ t('articleDetail.backToArticles') }}
    </button>

    <LoadingSpinner v-if="loading" />

    <article v-else class="max-w-3xl mx-auto animate-fade-in">
      <!-- Meta -->
      <div class="flex items-center gap-3 mb-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brown-100 text-brown-600 text-xs font-medium">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          {{ t('articleDetail.generatedBy') }}
        </span>
        <span class="text-xs text-brown-400">{{ t('articleDetail.generatedOn') }}: {{ formatDate(article.createdAt) }}</span>
      </div>

      <!-- Title -->
      <h1 class="text-3xl md:text-4xl font-extrabold text-brown-800 leading-tight mb-8">{{ article.title }}</h1>

      <!-- Content -->
      <div class="card p-8 mb-8">
        <div class="text-brown-600 leading-relaxed space-y-4 text-lg">
          <p v-for="(para, i) in article.content" :key="i">{{ para }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button class="btn-primary flex-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          {{ t('articleDetail.download') }}
        </button>
        <router-link :to="`/brain/${article.id}`" class="btn-secondary flex-1 text-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          {{ t('articleDetail.brainActivation') }}
        </router-link>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const { t } = useI18n()
const route = useRoute()
const loading = ref(true)

const article = ref({
  id: 'demo-1',
  title: 'The Future of Artificial Intelligence in Modern Society',
  content: [
    'Artificial intelligence has rapidly evolved from a theoretical concept to a transformative force shaping nearly every aspect of modern life.',
    'The integration of machine learning algorithms into business operations has resulted in unprecedented efficiency gains across every industry.',
    'However, the widespread adoption of AI also raises important ethical considerations that require thoughtful discourse and proactive policy development.',
    'Looking ahead, the convergence of AI with other emerging technologies promises to unlock even more transformative applications for the benefit of all.'
  ],
  createdAt: new Date().toISOString(),
})

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

onMounted(() => {
  setTimeout(() => { loading.value = false }, 600)
})
</script>
