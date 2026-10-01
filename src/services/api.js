// API Service for connecting frontend to Spring Boot + MongoDB backend

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Generic request helper
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('tamil_ai_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 401 && !endpoint.startsWith('/auth/')) {
        localStorage.removeItem('tamil_ai_token');
        localStorage.removeItem('tamil_ai_user');
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
      }
      const errorMsg = data?.message || data?.error || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

// Auth API
export const authAPI = {
  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),

  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  getStatus: () => request('/auth/status')
};

// Emotion Analysis API
export const emotionAPI = {
  analyze: (payload) =>
    request('/analyze', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getHistory: () => request('/analyze/history'),

  getById: (id) => request(`/analyze/${id}`)
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => request('/dashboard/stats')
};

// Continual Adaptation & Lexicon API
export const adaptationAPI = {
  getStats: () => request('/adaptation/stats'),

  simulate: () =>
    request('/adaptation/simulate', {
      method: 'POST'
    }),

  getSlang: () => request('/lexicon/slang'),

  addSlang: (slangEntry) =>
    request('/lexicon/slang', {
      method: 'POST',
      body: JSON.stringify(slangEntry)
    }),

  updateSlangStatus: (id, status) =>
    request(`/lexicon/slang/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),

  getMorphologicalRules: () => request('/lexicon/morphological-rules')
};

// Dataset API
export const datasetAPI = {
  getSamples: () => request('/dataset/samples'),
  getSampleByCode: (code) => request(`/dataset/samples/${code}`)
};

// System Health & Benchmarks API
export const systemAPI = {
  getHealth: () => request('/system/health'),
  getBenchmarks: () => request('/system/benchmarks')
};
