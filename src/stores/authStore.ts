// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/authService';
import router from '@/router';
interface User {
  id: number;
  name: string;
  permissao: number;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  const loadFromStorage = () => {
  const savedToken = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');

  if (savedToken) token.value = savedToken;
  if (savedUser) user.value = JSON.parse(savedUser);
  };

  async function login(email: string, password: string) {

    const result = await authService.login(email, password);
    if (result.access_token && result.user) {
      token.value = result.access_token;
      user.value = {
        id: (result.user as any).id,
        name: result.user.name ?? '',
        permissao: result.user.permissao ?? 0
      };
      localStorage.setItem('token', token.value);
      localStorage.setItem('user', JSON.stringify(user.value));
    }
  }

const logout = async () => {
  try {
    await authService.logout(); 
  } catch (e) {
    console.error('Erro ao deslogar no backend:', e);
  } finally {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push({ name: 'login' });
  }
};


  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    loadFromStorage
  };
});
