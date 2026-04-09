<template>
  <div class="page-container">
    <!-- Back button -->
    <button @click="$router.push('/news')" class="flex items-center gap-2 text-brown-500 hover:text-brown-700 font-medium mb-6 transition-colors group">
      <svg class="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      {{ t('newsDetail.backToNews') }}
    </button>

    <LoadingSpinner v-if="loading" />

    <article v-else class="animate-fade-in">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 bg-brown-100 text-brown-600 rounded-full text-sm font-medium">{{ article.category }}</span>
          <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">{{ article.language }}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-brown-800 leading-tight mb-4">{{ article.title }}</h1>
        <div class="flex flex-wrap items-center gap-4 text-sm text-brown-400">
          <span>{{ t('news.source') }}: <strong class="text-brown-600">{{ article.source_name }}</strong></span>
          <span>{{ t('news.publishedAt') }}: {{ formatDate(article.published_at) }}</span>
          <a v-if="article.original_url" :href="article.original_url" target="_blank" rel="noopener"
            class="inline-flex items-center gap-1 text-brown-500 hover:text-brown-700 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            Original Source
          </a>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- AI Summary -->
          <div class="card p-6 border-l-4 rtl:border-l-0 rtl:border-r-4 border-brown-500">
            <h2 class="text-lg font-bold text-brown-800 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5 text-brown-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              {{ t('newsDetail.summary') }}
            </h2>
            <p class="text-brown-600 leading-relaxed">{{ article.summary }}</p>
          </div>

          <!-- Full Article -->
          <div class="card p-6">
            <h2 class="text-lg font-bold text-brown-800 mb-4">{{ t('newsDetail.fullArticle') }}</h2>
            <div class="prose prose-brown max-w-none text-brown-600 leading-relaxed space-y-4 whitespace-pre-line">
              {{ article.full_content }}
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">

          <!-- n8n AI Analysis Result -->
          <div class="card p-6 bg-gradient-to-br from-emerald-50 to-brown-50 border border-emerald-200/50">
            <h3 class="text-lg font-bold text-brown-800 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              AI Analysis
            </h3>

            <!-- Loading state -->
            <div v-if="n8nLoading" class="space-y-3">
              <div class="flex items-center gap-3 text-sm text-emerald-600">
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Analyzing with AI...
              </div>
              <div class="space-y-2">
                <div class="skeleton h-3 w-full rounded"></div>
                <div class="skeleton h-3 w-5/6 rounded"></div>
                <div class="skeleton h-3 w-4/6 rounded"></div>
              </div>
            </div>

            <!-- Error state -->
            <div v-else-if="n8nError" class="text-sm">
              <p class="text-red-500 mb-3">{{ n8nError }}</p>
              <button @click="sendToN8n" class="px-4 py-2 bg-brown-600 text-white text-xs font-semibold rounded-lg hover:bg-brown-700 transition-colors">
                Retry
              </button>
            </div>

            <!-- Result -->
            <div v-else-if="n8nResult" class="text-brown-600 text-sm leading-relaxed whitespace-pre-line">
              {{ typeof n8nResult === 'string' ? n8nResult : JSON.stringify(n8nResult, null, 2) }}
            </div>
          </div>

          <!-- Analytical Recommendation (from Supabase) -->
          <div v-if="article.recommendation" class="card p-6 bg-gradient-to-br from-amber-50 to-brown-50 border border-amber-200/50">
            <h3 class="text-lg font-bold text-brown-800 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ t('newsDetail.analyticalRecommendation') }}
            </h3>
            <p class="text-brown-600 text-sm leading-relaxed">{{ article.recommendation }}</p>
          </div>

          <!-- Article Info -->
          <div class="card p-6">
            <h3 class="text-lg font-bold text-brown-800 mb-4">Article Info</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-brown-400">Category</span>
                <span class="font-medium text-brown-700">{{ article.category }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-brown-400">Language</span>
                <span class="font-medium text-brown-700">{{ article.language }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-brown-400">Source</span>
                <span class="font-medium text-brown-700">{{ article.source_name }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-brown-400">Published</span>
                <span class="font-medium text-brown-700">{{ formatDate(article.published_at) }}</span>
              </div>
              <div v-if="article.fetched_at" class="flex justify-between">
                <span class="text-brown-400">Fetched</span>
                <span class="font-medium text-brown-700">{{ formatDate(article.fetched_at) }}</span>
              </div>
            </div>
          </div>

          <!-- Re-analyze button -->
          <button
            @click="sendToN8n"
            :disabled="n8nLoading"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Re-analyze with AI
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { supabase } from '../services/supabase.js'
import { processArticle } from '../services/api.js'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const { t } = useI18n()
const route = useRoute()
const loading = ref(true)

const article = ref({})
const n8nLoading = ref(false)
const n8nResult = ref(null)
const n8nError = ref(null)

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

// Step 1: Fetch article from Supabase
async function fetchArticle() {
  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', route.params.id)
      .single()

    if (error) throw error
    article.value = data
  } catch (err) {
    console.error('Failed to fetch article:', err.message)
  } finally {
    loading.value = false
  }
}

// Step 2: Send article data to n8n for AI processing
async function sendToN8n() {
  n8nLoading.value = true
  n8nError.value = null
  n8nResult.value = null

  try {
    const result = await processArticle({
      id: article.value.id,
      title: article.value.title,
      summary: article.value.summary,
      full_content: article.value.full_content,
      category: article.value.category,
      source_name: article.value.source_name,
      published_at: article.value.published_at,
      language: article.value.language,
      original_url: article.value.original_url,
    })

    n8nResult.value = result
  } catch (err) {
    console.error('n8n processing failed:', err)
    n8nError.value = 'Failed to get AI analysis. Make sure your n8n webhook is active.'
  } finally {
    n8nLoading.value = false
  }
}

onMounted(async () => {
  // First fetch article from Supabase
  await fetchArticle()

  // Then automatically send to n8n for processing
  if (article.value.id) {
    sendToN8n()
  }
})
</script>
