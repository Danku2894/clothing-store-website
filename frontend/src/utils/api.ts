import useAuthStore from '../store/authStore'

const API_BASE_URL = '/api'

interface ApiError extends Error {
  status?: number
}

async function handleResponse(response: Response) {
  const data = await response.json()
  
  if (!response.ok) {
    const error = new Error(data.message || 'Có lỗi xảy ra') as ApiError
    error.status = response.status
    throw error
  }
  
  return data
}

async function request(endpoint: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token
  
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  })

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })
    return await handleResponse(response)
  } catch (error) {
    if (error instanceof Error) {
      const apiError = error as ApiError
      if (apiError.status === 401) {
        useAuthStore.getState().logout()
      }
      throw apiError
    }
    throw error
  }
}

export const api = {
  get: (endpoint: string) => request(endpoint),
  
  post: (endpoint: string, data: any) =>
    request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  put: (endpoint: string, data: any) =>
    request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (endpoint: string) =>
    request(endpoint, {
      method: 'DELETE',
    }),
}

export const auth = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => api.post('/auth/register', data),
  
  logout: () => api.post('/auth/logout', {}),
  
  getProfile: () => api.get('/auth/profile'),
  
  updateProfile: (data: {
    firstName: string
    lastName: string
    phone?: string
    address?: string
    city?: string
    district?: string
    ward?: string
  }) => api.put('/auth/profile', data),
}

export const products = {
  getAll: (params?: {
    category?: string
    collection?: string
    page?: number
    limit?: number
  }) => api.get('/products' + (params ? `?${new URLSearchParams(params as any)}` : '')),
  
  getById: (id: number) => api.get(`/products/${id}`),
  
  getCategories: () => api.get('/products/categories'),
  
  getCollections: () => api.get('/products/collections'),
}

export const orders = {
  create: (data: {
    items: Array<{
      productId: number
      quantity: number
      size: string
      color: string
    }>
    shippingAddress: {
      firstName: string
      lastName: string
      phone: string
      address: string
      city: string
      district: string
      ward: string
    }
    paymentMethod: string
    deliveryMethod: string
  }) => api.post('/orders', data),
  
  getAll: () => api.get('/orders'),
  
  getById: (id: string) => api.get(`/orders/${id}`),
  
  cancel: (id: string) => api.post(`/orders/${id}/cancel`, {}),
} 