<template>
  <div class="page-container">
    <!-- Back button -->
    <button @click="$router.back()" class="flex items-center gap-2 text-brown-500 hover:text-brown-700 font-medium mb-6 transition-colors group">
      <svg class="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      {{ t('brain.backToArticle') }}
    </button>

    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10 animate-fade-in">
        <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
        </div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-brown-800 mb-2">{{ t('brain.title') }}</h1>
        <p class="text-brown-500 text-lg">{{ t('brain.subtitle') }}</p>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8 animate-fade-in-up">
        <div class="flex items-center justify-between text-sm text-brown-500 mb-2">
          <span>Progress</span>
          <span>{{ answeredCount }} / {{ questions.length }}</span>
        </div>
        <div class="h-2 bg-brown-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-brown-600 to-emerald-500 rounded-full transition-all duration-500"
            :style="{ width: `${(answeredCount / questions.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Questions -->
      <div class="space-y-4">
        <div
          v-for="(q, index) in questions"
          :key="index"
          class="card overflow-hidden animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Question Header -->
          <button
            @click="toggleQuestion(index)"
            class="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
            :class="expandedIndex === index ? 'bg-brown-50' : 'hover:bg-beige-100'"
          >
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                :class="q.answered ? 'bg-emerald-100 text-emerald-600' : 'bg-brown-100 text-brown-600'"
              >
                <svg v-if="q.answered" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                <span v-else>{{ index + 1 }}</span>
              </span>
              <span class="font-semibold text-brown-800">{{ t('brain.question') }} {{ index + 1 }}</span>
            </div>
            <svg
              class="w-5 h-5 text-brown-400 transition-transform duration-300"
              :class="expandedIndex === index ? 'rotate-180' : ''"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Expandable Content -->
          <transition name="fade">
            <div v-if="expandedIndex === index" class="px-6 pb-6 border-t border-brown-100">
              <p class="text-brown-700 font-medium my-4 leading-relaxed">{{ q.question }}</p>

              <!-- Answer Textarea -->
              <textarea
                v-model="q.userAnswer"
                :placeholder="t('brain.yourAnswer')"
                rows="4"
                class="w-full px-4 py-3 rounded-xl bg-beige-50 border border-brown-200 text-brown-800 placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-brown-500/30 focus:border-brown-400 transition-all resize-none"
                @input="q.answered = !!q.userAnswer.trim()"
              ></textarea>

              <!-- Show/Hide Suggested Answer -->
              <button
                @click="q.showSuggested = !q.showSuggested"
                class="mt-3 text-sm font-medium text-brown-500 hover:text-brown-700 transition-colors flex items-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                {{ q.showSuggested ? t('brain.hideAnswer') : t('brain.showAnswer') }}
              </button>

              <transition name="fade">
                <div v-if="q.showSuggested" class="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p class="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">{{ t('brain.suggestedAnswer') }}</p>
                  <p class="text-sm text-emerald-800 leading-relaxed">{{ q.suggestedAnswer }}</p>
                </div>
              </transition>
            </div>
          </transition>
        </div>
      </div>

      <!-- Completion message -->
      <transition name="fade">
        <div v-if="answeredCount === questions.length && answeredCount > 0" class="mt-8 text-center card p-8 bg-gradient-to-br from-emerald-50 to-beige-50 border-emerald-200 animate-fade-in-up">
          <div class="text-4xl mb-3">🎉</div>
          <h3 class="text-xl font-bold text-emerald-700 mb-2">{{ t('brain.completed') }}</h3>
          <p class="text-emerald-600">{{ t('brain.completedMsg') }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const expandedIndex = ref(0)

const questions = ref([
  {
    question: 'What are the primary ethical concerns raised by the widespread adoption of AI in this context?',
    userAnswer: '',
    answered: false,
    showSuggested: false,
    suggestedAnswer: 'The primary ethical concerns include data privacy implications, algorithmic bias that may perpetuate existing inequalities, potential job displacement, and the need for transparent decision-making processes in AI systems that affect human lives.'
  },
  {
    question: 'How does the article distinguish between correlation and causation in its key claims?',
    userAnswer: '',
    answered: false,
    showSuggested: false,
    suggestedAnswer: 'The article presents several correlative relationships but could more carefully distinguish between correlation and causation. For instance, the efficiency gains attributed to AI may also be influenced by broader digital transformation initiatives occurring simultaneously.'
  },
  {
    question: 'What potential biases might exist in the sources cited within this article?',
    userAnswer: '',
    answered: false,
    showSuggested: false,
    suggestedAnswer: 'The sources may have an inherent pro-technology bias as many come from industry publications and organizations that benefit from AI adoption. A balanced analysis would also include perspectives from labor unions, ethicists, and communities disproportionately affected by automation.'
  },
  {
    question: 'How might the conclusions differ if this article were written from a different cultural or economic perspective?',
    userAnswer: '',
    answered: false,
    showSuggested: false,
    suggestedAnswer: 'From developing economies, the focus might shift to infrastructure barriers and digital divide concerns rather than optimization. Cultural perspectives may emphasize community impact over individual productivity gains, and environmental costs of AI infrastructure might be weighted more heavily.'
  },
  {
    question: 'What evidence would you need to independently verify the main claims of this article?',
    userAnswer: '',
    answered: false,
    showSuggested: false,
    suggestedAnswer: 'Independent verification would require peer-reviewed research studies with reproducible results, longitudinal data showing sustained impacts rather than short-term observations, diverse expert opinions from multiple disciplines, and direct data from implementations rather than self-reported corporate metrics.'
  },
])

const answeredCount = computed(() => questions.value.filter(q => q.answered).length)

function toggleQuestion(index) {
  expandedIndex.value = expandedIndex.value === index ? -1 : index
}
</script>
