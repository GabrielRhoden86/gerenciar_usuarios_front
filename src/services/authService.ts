import apiClient from './apiClient';


export const authService = {
  async login(email: string, password: string) {
    const response = await apiClient.post('/login', {
      email,
      password,
    });
    return response.data;
  },

  async logout() {
    const response = await apiClient.post('/logout');
    return response.data;
  },
};