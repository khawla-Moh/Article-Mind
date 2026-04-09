import axios from 'axios'

const N8N_BASE = import.meta.env.VITE_N8N_WEBHOOK_URL

const api = axios.create({
  baseURL: N8N_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── News ───
export const fetchNews = (params = {}) =>
  api.get('/news', { params }).then(r => r.data)

export const fetchNewsById = (id) =>
  api.get(`/news/${id}`).then(r => r.data)

export const fetchNewsByCategory = (category, params = {}) =>
  api.get('/news', { params: { category, ...params } }).then(r => r.data)

// ─── Send article to n8n for AI processing ───
export const processArticle = (articleData) =>
  api.post('/news', articleData).then(r => r.data)

// ─── Article Generation ───
export const generateArticle = (payload) =>
  api.post('/generate-article', payload).then(r => r.data)

export const fetchArticleById = (id) =>
  api.get(`/article/${id}`).then(r => r.data)

// ─── Export ───
export const exportArticlePdf = (id) =>
  api.get(`/export/${id}`, { responseType: 'blob' }).then(r => r.data)

// ─── Brain Activation ───
export const fetchBrainQuestions = (articleId) =>
  api.get(`/brain/${articleId}`).then(r => r.data)

export default api
