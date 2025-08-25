
<template>
  <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-5">
    <form @submit="handleLogin" class="p-4 shadow-sm rounded bg-white">
      <header class="text-center mb-4">
        <h4 class="fw-bold text-primary">Login</h4>
        <p class="text-muted small">Acesse sua conta para continuar</p>
      </header>
           <AlertComponente
              :showAlert="showAlert"
              :type="alertType"
            />
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

      <div class="d-flex justify-content-between align-items-center mb-3">
        <a href="#!" class="text-primary small">Esqueceu sua senha?</a>
      </div>

      <div class="text-center text-lg-start mt-4 pt-2">
      <button type="submit" class="btn btn-primary btn-sm px-5 rounded-1 w-100" :disabled="authStore.loading">
        <span v-if="authStore.loading">
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
           Loading...
        </span>
        <span v-else>
           Entrar
       </span>
      </button>
        <p class="small fw-bold mt-3 mb-0">
          Crie uma conta!
          <a href="#!" class="link-primary"> Registrar</a>
        </p>
      </div>
    </form> 
  </div>
</template>

<script lang="ts" setup>
  import { ref,onMounted } from 'vue';
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/authStore'
  import AlertComponente from "@/components/AlertComponente.vue";


  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const authStore = useAuthStore()
  const isLoading = ref<boolean>(false);

  const showAlert = ref(false);
  const alertType = ref('danger'); 

const exibirAlerta = (type = 'danger', tempo = 4000) => {
  alertType.value = type;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, tempo);
};

  async function handleLogin(e: Event) {
    e.preventDefault()
    try {
      await authStore.login(email.value, password.value)
        router.push({ name: 'home' }) 
    } catch (error) {
      exibirAlerta('danger');
      // alert('Erro no login, verifique suas credenciais')
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