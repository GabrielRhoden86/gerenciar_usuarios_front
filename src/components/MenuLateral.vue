<template>
  <div class="d-flex flex-column flex-shrink-0 p-4 text-white p-lg-8">
    
    <span class="d-flex align-items-center text-white text-decoration-none logout mt-3">
      <strong>
        <a 
          class="dropdown-item w-25 d-flex align-items-center" 
          href="#"
          @click.prevent="handleLogout"
          :class="{ 'disabled': loading }"
        >
          <i class="bi bi-box-arrow-right fs-4 me-2"></i>
          <span v-if="!loading">Sair</span>
          <span v-else>Deslogando...</span>
        </a>
      </strong>

      <div 
        v-if="loading" 
        class="spinner-border spinner-border-sm text-light ms-2" 
        role="status"
      >
      </div>
    </span>

    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li>
        <router-link to="/" class="nav-link text-white">
          <i class="bi bi-house fs-5 me-2"></i> Página inicial
        </router-link>  
      </li>
       <li>
        <div  
          @click="goToPerfil()"
          class="nav-link text-white perfil">
          <i class="bi bi-person fs-5 me-2 "></i> Meu Perfil
        </div>
      </li>
      <li>
        <router-link to="/usuarios" class="nav-link text-white">
          <i class="bi bi-people fs-5 me-2"></i> Usuários
        </router-link>
      </li>
    </ul>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const idUser =  ref<number>(0);
const loading = ref<boolean>(false);
const auth = useAuthStore();

const handleLogout = async () => {
  loading.value = true;
  try {
    await authStore.logout();
    router.push({ name: 'login' }); 
  } catch (error) {
    console.error("Erro no logout:", error);
  } finally {
    loading.value = false; 
  }
};

onMounted(async () => {
  idUser.value = auth.userId;
});

const goToPerfil = () => {
  router.push({
    name: 'perfil',
    params: { id: idUser.value}
  });
};

</script>

<style scoped>
  .spinner-sm {
    width: 1.1rem;
    height: 1.1rem;
  }
  .perfil{
    cursor: pointer;
  }
  .sidebar a.active {
    background-color: #0d6efd;
  }
  .menu-lateral{
    background-color: #0D6EFD;
  }
  .nav-link:hover {
    background-color: #639df5;
    border-radius: 4px;
  }
  .dropdown-menu{
    border-radius:3px;
  }
  .logout{
    cursor: pointer;
    margin-left:15px;
  }
</style>