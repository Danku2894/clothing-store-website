import { api } from '../utils/api'
import type { 
  AdminOrder, 
  AdminUser, 
  OrderStatus,
  UserRole,
  PaginatedResponse 
} from '../types/admin'

interface GetUsersParams {
  page?: number
  size?: number
  sort?: string
}

interface GetOrdersParams {
  page?: number
  size?: number
  sort?: string
}

const adminService = {
  // User Management
  getUsers: async (params: GetUsersParams = {}): Promise<PaginatedResponse<AdminUser>> => {
    const searchParams = new URLSearchParams()
    if (params.page !== undefined) searchParams.append('page', params.page.toString())
    if (params.size !== undefined) searchParams.append('size', params.size.toString())
    if (params.sort) searchParams.append('sort', params.sort)
    
    const response = await api.get(`/api/admin/users?${searchParams.toString()}`)
    return response.data
  },

  toggleUserStatus: async (userId: number): Promise<void> => {
    await api.post(`/api/admin/users/${userId}/toggle-status`, {})
  },

  updateUserRole: async (userId: number, newRole: UserRole): Promise<void> => {
    await api.put(`/api/admin/users/${userId}/role`, { newRole })
  },

  // Order Management
  getOrders: async (params: GetOrdersParams = {}): Promise<PaginatedResponse<AdminOrder>> => {
    const searchParams = new URLSearchParams()
    if (params.page !== undefined) searchParams.append('page', params.page.toString())
    if (params.size !== undefined) searchParams.append('size', params.size.toString())
    if (params.sort) searchParams.append('sort', params.sort)
    
    const response = await api.get(`/api/admin/orders?${searchParams.toString()}`)
    return response.data
  },

  getOrderDetails: async (orderId: number): Promise<AdminOrder> => {
    const response = await api.get(`/api/admin/orders/${orderId}`)
    return response.data
  },

  updateOrderStatus: async (orderId: number, newStatus: OrderStatus): Promise<void> => {
    await api.put(`/api/admin/orders/${orderId}/status`, newStatus)
  }
}

export default adminService