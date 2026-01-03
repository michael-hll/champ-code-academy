import { api } from './api';
import type { User } from '../types';
import { loginMock, logoutMock, refreshTokenMock } from '../mocks/auth';

// Check if we should use backend API or mock data
const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    if (!USE_BACKEND) {
      // Mock mode: use mock authentication
      return loginMock(credentials.email, credentials.password);
    }
    
    // Backend mode: call real API
    const { data } = await api.post<LoginResponse>('/api/auth/login', credentials);
    return data;
  },

  async logout(): Promise<void> {
    if (!USE_BACKEND) {
      // Mock mode: no-op
      return logoutMock();
    }
    
    // Backend mode: call real API
    await api.post('/api/auth/logout');
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    if (!USE_BACKEND) {
      // Mock mode: return mock token
      return refreshTokenMock(refreshToken);
    }
    
    // Backend mode: call real API
    const { data } = await api.post('/api/auth/refresh', { refreshToken });
    return data;
  },
};
