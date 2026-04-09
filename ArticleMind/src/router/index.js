import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/NewsListPage.vue'),
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: () => import('../views/NewsDetailPage.vue'),
  },
  {
    path: '/article-generator',
    name: 'ArticleGenerator',
    component: () => import('../views/ArticleGeneratorPage.vue'),
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: () => import('../views/ArticleDetailPage.vue'),
  },
  {
    path: '/brain/:articleId',
    name: 'BrainActivation',
    component: () => import('../views/BrainActivationPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
