
<template>
  <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-5">
    <form @submit="handleLogin" class="p-4 shadow-sm rounded bg-white">
      <header class="text-center mb-4">
        <h4 class="fw-bold text-primary">Login</h4>
        <p class="text-muted small">Acesse sua conta para continuar</p>
      </header>
  
          <div class="mb-3">
            <input 
              v-model="email"
              type="email" 
              class="form-control form-control-md rounded-1"
              placeholder="Email" 
            />
      </div>

      <div class="mb-3">
        <input 
          v-model="password"
          type="password" 
          class="form-control form-control-md rounded-1" 
          placeholder="Senha"
        />
      </div>
      <div class="text-center text-lg-start mt-4 pt-2">
        <button type="submit" class="btn btn-primary btn-sm px-5 rounded-1 w-100" :disabled="isLoading">
          <span v-if="isLoading">
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Loading...
          </span>
          <span v-else>
            Entrar
        </span>
        </button>
      </div>
    </form> 
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const isLoading = ref<boolean>(false);

async function handleLogin(e: Event) {
  e.preventDefault();
  isLoading.value = true;
  try {
    await authStore.login(email.value, password.value);
    router.push({ name: 'home' });
  } catch (error) {
    console.log('Erro no login, verifique suas credenciais');
    console.error('Erro no login, verifique suas credenciais');
  } finally {
    isLoading.value = false;
  }
}
</script>

<style >
input:focus {
  outline: none; 
  border: 1px solid #99ccff !important; 
  box-shadow: 0 0 5px rgba(153, 204, 255, 0.5) !important;
}
</style>