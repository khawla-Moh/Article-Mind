<template>
  <div class="page-container">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10 animate-fade-in">
        <h1 class="text-3xl md:text-4xl font-extrabold text-brown-800 mb-3">{{ t('articleGenerator.title') }}</h1>
        <p class="text-brown-500 text-lg">{{ t('articleGenerator.subtitle') }}</p>
      </div>

      <!-- Generator Form -->
      <div class="card p-8 mb-8 animate-fade-in-up">
        <!-- Tabs -->
        <div class="flex border-b border-brown-200 mb-6">
          <button
            @click="activeTab = 'keyword'"
            class="flex-1 pb-3 text-sm font-semibold transition-all duration-300 border-b-2"
            :class="activeTab === 'keyword' ? 'text-brown-700 border-brown-600' : 'text-brown-400 border-transparent hover:text-brown-500'"
          >
            {{ t('articleGenerator.tabKeyword') }}
          </button>
          <button
            @click="activeTab = 'category'"
            class="flex-1 pb-3 text-sm font-semibold transition-all duration-300 border-b-2"
            :class="activeTab === 'category' ? 'text-brown-700 border-brown-600' : 'text-brown-400 border-transparent hover:text-brown-500'"
          >
            {{ t('articleGenerator.tabCategory') }}
          </button>
        </div>

        <div class="space-y-5">
          <!-- Keyword Input -->
          <div v-if="activeTab === 'keyword'">
            <label class="block text-sm font-semibold text-brown-700 mb-2">{{ t('articleGenerator.keywordLabel') }}</label>
            <input
              v-model="keywords"
              type="text"
              :placeholder="t('articleGenerator.keywordPlaceholder')"
              class="w-full px-4 py-3 rounded-xl bg-beige-50 border border-brown-200 text-brown-800 placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-brown-500/30 focus:border-brown-400 transition-all"
            />
          </div>

          <!-- Category Select -->
          <div v-if="activeTab === 'category'">
            <label class="block text-sm font-semibold text-brown-700 mb-2">{{ t('articleGenerator.categoryLabel') }}</label>
            <select v-model="selectedCategory" class="w-full px-4 py-3 rounded-xl bg-beige-50 border border-brown-200 text-brown-800 focus:outline-none focus:ring-2 focus:ring-brown-500/30 focus:border-brown-400 transition-all">
              <option value="technology">{{ t('news.categoryTech') }}</option>
              <option value="sports">{{ t('news.categorySport') }}</option>
              <option value="business">{{ t('news.categoryBusiness') }}</option>
              <option value="health">{{ t('news.categoryHealth') }}</option>
              <option value="science">{{ t('news.categoryScience') }}</option>
            </select>
          </div>

          <!-- Tone -->
          <div>
            <label class="block text-sm font-semibold text-brown-700 mb-2">{{ t('articleGenerator.toneLabel') }}</label>
            <div class="flex gap-3">
              <button
                v-for="tone in tones"
                :key="tone.value"
                @click="selectedTone = tone.value"
                class="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                :class="selectedTone === tone.value
                  ? 'bg-brown-600 text-white shadow-lg shadow-brown-500/25'
                  : 'bg-beige-50 text-brown-600 border border-brown-200 hover:border-brown-400'"
              >
                {{ tone.label }}
              </button>
            </div>
          </div>

          <!-- Length -->
          <div>
            <label class="block text-sm font-semibold text-brown-700 mb-2">{{ t('articleGenerator.lengthLabel') }}</label>
            <div class="flex gap-3">
              <button
                v-for="len in lengths"
                :key="len.value"
                @click="selectedLength = len.value"
                class="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                :class="selectedLength === len.value
                  ? 'bg-brown-600 text-white shadow-lg shadow-brown-500/25'
                  : 'bg-beige-50 text-brown-600 border border-brown-200 hover:border-brown-400'"
              >
                {{ len.label }}
              </button>
            </div>
          </div>

          <!-- Generate Button -->
          <button
            @click="generateArticle"
            :disabled="generating || (!keywords && activeTab === 'keyword')"
            class="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <svg v-if="generating" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            {{ generating ? t('articleGenerator.generating') : t('articleGenerator.generate') }}
          </button>
        </div>
      </div>

      <!-- Generated Result -->
      <transition name="fade">
        <div v-if="generatedArticle" class="card p-8 animate-fade-in-up">
          <h2 class="text-2xl font-extrabold text-brown-800 mb-2">{{ t('articleGenerator.resultTitle') }}</h2>
          <div class="h-1 w-16 bg-gradient-to-r from-brown-600 to-brown-400 rounded-full mb-6"></div>

          <h3 class="text-xl font-bold text-brown-700 mb-4">{{ generatedArticle.title }}</h3>
          <div class="text-brown-600 leading-relaxed space-y-4 mb-8">
            <p v-for="(para, i) in generatedArticle.content" :key="i">{{ para }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button class="btn-primary flex-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              {{ t('articleGenerator.download') }}
            </button>
            <router-link to="/brain/generated" class="btn-secondary flex-1 text-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              {{ t('articleGenerator.brainActivation') }}
            </router-link>
            <button @click="generatedArticle = null" class="btn-secondary flex-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              {{ t('articleGenerator.regenerate') }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activeTab = ref('keyword')
const keywords = ref('')
const selectedCategory = ref('technology')
const selectedTone = ref('formal')
const selectedLength = ref('medium')
const generating = ref(false)
const generatedArticle = ref(null)

const tones = computed(() => [
  { value: 'formal', label: t('articleGenerator.toneFormal') },
  { value: 'casual', label: t('articleGenerator.toneCasual') },
  { value: 'academic', label: t('articleGenerator.toneAcademic') },
])

const lengths = computed(() => [
  { value: 'short', label: t('articleGenerator.lengthShort') },
  { value: 'medium', label: t('articleGenerator.lengthMedium') },
  { value: 'long', label: t('articleGenerator.lengthLong') },
])

function generateArticle() {
  generating.value = true
  // Simulate AI generation
  setTimeout(() => {
    generatedArticle.value = {
      title: 'The Future of Artificial Intelligence in Modern Society',
      content: [
        'Artificial intelligence has rapidly evolved from a theoretical concept to a transformative force shaping nearly every aspect of modern life. From healthcare diagnostics to autonomous transportation, AI systems are increasingly capable of performing tasks that once required human expertise.',
        'The integration of machine learning algorithms into business operations has resulted in unprecedented efficiency gains. Companies across industries are leveraging predictive analytics, natural language processing, and computer vision to streamline workflows and enhance decision-making processes.',
        'However, the widespread adoption of AI also raises important ethical considerations. Questions about data privacy, algorithmic bias, and the displacement of human workers require thoughtful discourse and proactive policy development to ensure that the benefits of AI are equitably distributed.',
        'Looking ahead, the convergence of AI with other emerging technologies such as quantum computing and biotechnology promises to unlock even more transformative applications. As we navigate this technological frontier, collaboration between researchers, policymakers, and the public will be essential to shaping a future where AI serves the common good.'
      ]
    }
    generating.value = false
  }, 2500)
}
</script>
