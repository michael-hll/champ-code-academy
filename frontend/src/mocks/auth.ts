import type { User } from '../types';

// Mock user data
const MOCK_USER: User = {
    id: 'user-001',
    name: 'Sarah Tan',
    email: 'tutor@champcode.com',
    avatar: "",
  };

// Mock tokens
const MOCK_ACCESS_TOKEN = 'mock-access-token-12345';
const MOCK_REFRESH_TOKEN = 'mock-refresh-token-67890';

export async function loginMock(email: string, password: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 10));
  
  // Simple validation - accept any email/password for demo
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  return {
    user: MOCK_USER,
    accessToken: MOCK_ACCESS_TOKEN,
    refreshToken: MOCK_REFRESH_TOKEN
  };
}

export async function logoutMock() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 10));
  // No-op in mock mode
}

export async function refreshTokenMock(refreshToken: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 10));
  
  if (refreshToken !== MOCK_REFRESH_TOKEN) {
    throw new Error('Invalid refresh token');
  }
  
  return {
    accessToken: MOCK_ACCESS_TOKEN
  };
}
