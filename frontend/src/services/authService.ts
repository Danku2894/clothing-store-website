import axios from 'axios';
import type { IAuthResponse, IRegisterRequest } from '../types/auth';
import type { User } from '../store/authStore';

const API_URL = '/api/auth';

const authService = {
  register: async (data: IRegisterRequest): Promise<{ token: string; refreshToken: string; user: User }> => {
    try {
      const response = await axios.post<IAuthResponse>(`${API_URL}/register`, data);
      const { user, token, refreshToken } = response.data;

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      }

      return { token, refreshToken, user };
    } catch (error: any) {
      if (error.response) {
        throw error;
      } else if (error.request) {
        throw new Error('Không thể kết nối đến server');
      } else {
        throw new Error('Có lỗi xảy ra');
      }
    }
  },

  login: async (email: string, password: string): Promise<{ token: string; refreshToken: string; user: User }> => {
    try {
      const response = await axios.post<IAuthResponse>(`${API_URL}/login`, { email, password });
      const { user, token, refreshToken } = response.data;

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      }

      return { token, refreshToken, user };
    } catch (error: any) {
      if (error.response) {
        throw error;
      } else if (error.request) {
        throw new Error('Không thể kết nối đến server');
      } else {
        throw new Error('Có lỗi xảy ra');
      }
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  updateProfile: async (data: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    address?: string
    city?: string
    district?: string
    ward?: string
  }): Promise<User> => {
    try {
      const response = await axios.put<{ user: User }>(`${API_URL}/profile`, data);
      const { user } = response.data;

      // Cập nhật thông tin người dùng trong localStorage
      const currentUser = localStorage.getItem('user');
      if (currentUser) {
        const updatedUser = { ...JSON.parse(currentUser), ...user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      return user;
    } catch (error: any) {
      if (error.response) {
        throw error;
      } else if (error.request) {
        throw new Error('Không thể kết nối đến server');
      } else {
        throw new Error('Có lỗi xảy ra');
      }
    }
  }
};

// Thêm interceptor để tự động thêm token vào header
axios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authService;