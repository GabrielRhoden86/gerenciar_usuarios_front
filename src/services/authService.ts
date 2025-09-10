import apiClient from './apiClient';

interface AuthPayload {
  email: string;
  password: string;
}
interface AuthResponse {
  access_token?: string; 
  user: {
    name?: string;
    permissao?: number;
  };
}

export const authService = {
  
  async login(email: string, password: string): Promise<AuthResponse> {
    const payload: AuthPayload = { email, password };
    const response = await apiClient.post<AuthResponse>('/login', payload);
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/logout');
  },

};
