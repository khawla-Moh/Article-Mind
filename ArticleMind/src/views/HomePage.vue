<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-brown-800 via-brown-700 to-brown-600 text-white">
      <!-- Decorative elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-brown-500/20 rounded-full blur-3xl animate-float"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-brown-400/10 rounded-full blur-3xl animate-float" style="animation-delay: 3s"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brown-500/5 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div class="text-center max-w-3xl mx-auto animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-8">
            <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            AI-Powered Platform
          </div>
          <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            {{ t('home.heroTitle') }}
          </h1>
          <p class="text-lg md:text-xl text-brown-200 leading-relaxed mb-10">
            {{ t('home.heroSubtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <router-link to="/news" class="w-full sm:w-auto px-8 py-4 bg-white text-brown-800 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
              {{ t('home.ctaNews') }}
            </router-link>
            <router-link to="/article-generator" class="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 text-center">
              {{ t('home.ctaGenerate') }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Wave divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FDFCFA"/>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="page-container py-16 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Feature 1: Smart Analysis -->
        <div class="card p-8 group hover:-translate-y-2 transition-all duration-500 animate-fade-in-up" style="animation-delay: 0.1s">
          <div class="w-14 h-14 bg-gradient-to-br from-brown-500 to-brown-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brown-500/20 group-hover:shadow-brown-500/40 group-hover:scale-110 transition-all duration-300">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-brown-800 mb-3">{{ t('home.featureAnalysis') }}</h3>
          <p class="text-brown-500 leading-relaxed">{{ t('home.featureAnalysisDesc') }}</p>
        </div>

        <!-- Feature 2: Article Generation -->
        <div class="card p-8 group hover:-translate-y-2 transition-all duration-500 animate-fade-in-up" style="animation-delay: 0.2s">
          <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 group-hover:scale-110 transition-all duration-300">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-brown-800 mb-3">{{ t('home.featureGenerate') }}</h3>
          <p class="text-brown-500 leading-relaxed">{{ t('home.featureGenerateDesc') }}</p>
        </div>

        <!-- Feature 3: Brain Activation -->
        <div class="card p-8 group hover:-translate-y-2 transition-all duration-500 animate-fade-in-up" style="animation-delay: 0.3s">
          <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 group-hover:scale-110 transition-all duration-300">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-brown-800 mb-3">{{ t('home.featureBrain') }}</h3>
          <p class="text-brown-500 leading-relaxed">{{ t('home.featureBrainDesc') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
