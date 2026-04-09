<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'" :lang="locale" class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 glass border-b border-brown-100/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Brand -->
          <router-link to="/" class="flex items-center gap-2 group">
            <div class="w-9 h-9 bg-gradient-to-br from-brown-600 to-brown-500 rounded-xl flex items-center justify-center shadow-lg shadow-brown-500/20 group-hover:shadow-brown-500/40 transition-shadow">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-brown-800 to-brown-600 bg-clip-text text-transparent">
              {{ t('nav.brand') }}
            </span>
          </router-link>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-1">
            <router-link
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="px-4 py-2 rounded-xl text-sm font-medium text-brown-600 hover:text-brown-800 hover:bg-brown-100/50 transition-all duration-200"
              active-class="!bg-brown-600 !text-white shadow-lg shadow-brown-500/25"
            >
              {{ link.label }}
            </router-link>
          </div>

          <!-- Right side -->
          <div class="flex items-center gap-3">
            <LanguageSwitcher />
            <!-- Mobile menu button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2 rounded-lg text-brown-600 hover:bg-brown-100/50 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="fade">
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-brown-100/50 bg-white/90 backdrop-blur-xl">
          <div class="px-4 py-3 space-y-1">
            <router-link
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 rounded-xl text-sm font-medium text-brown-600 hover:bg-brown-100/50 transition-colors"
              active-class="!bg-brown-600 !text-white"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>
      </transition>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-brown-800 text-beige-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-brown-400 to-brown-300 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-brown-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <span class="text-lg font-bold text-beige-100">{{ t('nav.brand') }}</span>
            </div>
            <p class="text-sm text-beige-300/80 leading-relaxed">{{ t('footer.description') }}</p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-sm font-semibold text-beige-100 uppercase tracking-wider mb-4">{{ t('footer.quickLinks') }}</h3>
            <ul class="space-y-2">
              <li v-for="link in navLinks" :key="link.to">
                <router-link :to="link.to" class="text-sm text-beige-300/80 hover:text-beige-100 transition-colors">
                  {{ link.label }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-sm font-semibold text-beige-100 uppercase tracking-wider mb-4">{{ t('footer.contact') }}</h3>
            <p class="text-sm text-beige-300/80">info@deepread.ai</p>
          </div>
        </div>

        <div class="border-t border-brown-700 mt-8 pt-8 text-center text-xs text-beige-400">
          © {{ new Date().getFullYear() }} DeepRead. {{ t('footer.rights') }}.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const { t, locale } = useI18n()
const mobileMenuOpen = ref(false)

const navLinks = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/news', label: t('nav.news') },
  { to: '/article-generator', label: t('nav.articleGenerator') },
])

onMounted(() => {
  const savedLocale = localStorage.getItem('locale') || 'en'
  locale.value = savedLocale
  document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = savedLocale
})
</script>
