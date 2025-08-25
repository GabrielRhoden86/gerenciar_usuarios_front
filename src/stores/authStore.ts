import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authService } from "@/services/authService";
import type { AuthResponse } from '@/interfaces/AuthResponse';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token') || null);
  const user = ref<AuthResponse['user'] | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const loading = ref(false);

  async function login(email: string, password: string): Promise<AuthResponse> {
    loading.value = true;
    try {
      const response = await authService.login(email, password);
      token.value = response.access_token ?? null;;
      user.value = response.user;

      localStorage.setItem('token', response.access_token ?? '');
      localStorage.setItem('user', JSON.stringify(response.user));

      return response;
    } catch (err) {
      console.error('Erro ao logar:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function logout(): Promise<void> {
    if (token.value) {
      try {
        await authService.logout();
      } catch (err) {
        console.error('Falha ao deslogar do servidor:', err);
      }
    }
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return {
    token,
    user,
    loading,
    login,
    logout
  };
});
