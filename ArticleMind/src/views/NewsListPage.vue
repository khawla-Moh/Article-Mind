<template>
  <div class="page-container">
    <div class="mb-8 animate-fade-in">
      <h1 class="text-3xl md:text-4xl font-extrabold text-brown-800 mb-2">{{ t('news.title') }}</h1>
      <p class="text-brown-500 text-lg">{{ t('news.subtitle') }}</p>
    </div>

    <!-- Filters -->
    <div class="mb-8 animate-fade-in-up" style="animation-delay: 0.1s">
      <CategoryFilter
        :categories="categories"
        :selected-category="selectedCategory"
        :selected-time="selectedTime"
        @category-change="onCategoryChange"
        @time-change="onTimeChange"
      />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonCard v-for="i in 6" :key="i" />
    </div>

    <!-- News Grid -->
    <div v-else-if="filteredNews.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in filteredNews"
        :key="item.id"
        class="card overflow-hidden group animate-fade-in-up hover:-translate-y-1"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <router-link :to="`/news/${item.id}`">
          <div class="h-48 bg-gradient-to-br from-brown-200 to-brown-100 overflow-hidden">
            <img v-if="item.image" :src="item.image" :alt="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-16 h-16 text-brown-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
              </svg>
            </div>
          </div>
          <div class="p-5">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-0.5 bg-brown-100 text-brown-600 rounded-full text-xs font-medium">{{ item.category }}</span>
              <span class="px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">{{ item.language }}</span>
            </div>
            <h3 class="font-bold text-brown-800 mb-2 line-clamp-2 group-hover:text-brown-600 transition-colors">{{ item.title }}</h3>
            <p class="text-sm text-brown-400 line-clamp-2 mb-3">{{ item.summary }}</p>
            <div class="flex items-center justify-between text-xs text-brown-400">
              <span>{{ item.source_name }}</span>
              <span>{{ formatDate(item.published_at) }}</span>
            </div>
          </div>
        </router-link>

        <!-- Send to n8n button -->
        <div class="px-5 pb-4">
          <button
            @click.stop="sendToN8n(item)"
            :disabled="processingId === item.id"
            class="w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            :class="processingId === item.id
              ? 'bg-brown-200 text-brown-400 cursor-wait'
              : 'bg-gradient-to-r from-brown-600 to-brown-500 text-white hover:shadow-lg hover:shadow-brown-500/25 hover:-translate-y-0.5 active:translate-y-0'"
          >
            <svg v-if="processingId === item.id" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            {{ processingId === item.id ? 'Processing...' : 'Analyze with AI' }}
          </button>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="text-center py-16">
      <svg class="w-20 h-20 mx-auto text-brown-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-brown-500 text-lg">{{ t('news.noResults') }}</p>
    </div>

    <!-- n8n Result Modal -->
    <transition name="fade">
      <div v-if="n8nResult" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" @click.self="n8nResult = null">
        <div class="card max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 animate-fade-in-up">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-brown-800 flex items-center gap-2">
              <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              AI Analysis Result
            </h2>
            <button @click="n8nResult = null" class="p-2 rounded-lg hover:bg-brown-100 transition-colors">
              <svg class="w-5 h-5 text-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="text-brown-600 leading-relaxed whitespace-pre-line">{{ typeof n8nResult === 'string' ? n8nResult : JSON.stringify(n8nResult, null, 2) }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { supabase } from '../services/supabase.js'
import { processArticle } from '../services/api.js'
import CategoryFilter from '../components/CategoryFilter.vue'
import SkeletonCard from '../components/SkeletonCard.vue'

const { t } = useI18n()

const loading = ref(true)
const selectedCategory = ref('all')
const selectedTime = ref('all')
const newsItems = ref([])
const processingId = ref(null)
const n8nResult = ref(null)

const categories = computed(() => [
  { value: 'all', label: t('news.allCategories') },
  { value: 'technology', label: t('news.categoryTech') },
  { value: 'sports', label: t('news.categorySport') },
  { value: 'business', label: t('news.categoryBusiness') },
  { value: 'health', label: t('news.categoryHealth') },
  { value: 'science', label: t('news.categoryScience') },
  { value: 'politics', label: t('news.categoryPolitics') },
])

const filteredNews = computed(() => {
  if (selectedCategory.value === 'all') return newsItems.value
  return newsItems.value.filter(n =>
    n.category?.toLowerCase() === selectedCategory.value.toLowerCase()
  )
})

// Calculate the cutoff date for time filtering
function getTimeFilter(period) {
  const now = new Date()
  switch (period) {
    case '24h':
      return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    case 'week':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    case 'month':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
    default:
      return null  // 'all' = no time filter
  }
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

async function fetchNewsFromSupabase() {
  loading.value = true
  try {
    const timeFrom = getTimeFilter(selectedTime.value)

    let query = supabase
      .from('news_articles')
      .select('id, title, original_url, source_name, category, summary, published_at, language')

    // Only apply time filter if a specific period is selected
    if (timeFrom) {
      query = query.gte('published_at', timeFrom)
    }

    const { data, error } = await query.order('published_at', { ascending: false })

    if (error) throw error

    newsItems.value = data || []
  } catch (err) {
    console.error('Failed to fetch from Supabase:', err.message)
    newsItems.value = []
  } finally {
    loading.value = false
  }
}

// ─── Send article data to n8n for processing ───
async function sendToN8n(article) {
  processingId.value = article.id
  try {
    const result = await processArticle({
      id: article.id,
      title: article.title,
      summary: article.summary,
      category: article.category,
      source_name: article.source_name,
      published_at: article.published_at,
      language: article.language,
      original_url: article.original_url,
    })
    // Show the result from n8n
    n8nResult.value = result
  } catch (err) {
    console.error('n8n processing failed:', err.message)
    n8nResult.value = 'Error: Failed to process article. Please check your n8n webhook is active.'
  } finally {
    processingId.value = null
  }
}

function onCategoryChange(val) {
  selectedCategory.value = val
}

function onTimeChange(val) {
  selectedTime.value = val
}

// Re-fetch when time filter changes
watch(selectedTime, () => {
  fetchNewsFromSupabase()
})

onMounted(() => {
  fetchNewsFromSupabase()
})
</script>
