<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-white menu-lateral">
   
      <span  class="d-flex align-items-center text-white text-decoration-none logout">
         <i class="bi bi-person fs-4 me-2"></i>
        <strong><a class="dropdown-item"  @click.prevent="handleLogout">Sair</a></strong>
      </span>
      
    <hr />

    <ul class="nav nav-pills flex-column mb-auto">
      <li>
        <router-link to="/" class="nav-link text-white">
          <i class="bi bi-house fs-5 me-2"></i> Página inicial
        </router-link>
      </li>
         <li>
        <router-link to="/cadastro" class="nav-link text-white">
          <i class="bi bi-person-plus fs-5 me-2"></i> Cadastrar
        </router-link>
      </li>
      <li>
        <router-link to="/perfil" class="nav-link text-white">
          <i class="bi bi-person fs-5 me-2"></i> Editar Perfil
        </router-link>
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
const authStore = useAuthStore();
const router = useRouter();
const handleLogout = () => {
  authStore.logout();
  router.push({ name: 'login' });
};

</script>

<style scoped>
.sidebar a.active {
  background-color: #0d6efd;
}
.menu-lateral{
  background-color: #0D6EFD;
}
.nav-link:hover {

  border-radius: 4px;
}
.dropdown-menu{
  border-radius:3px;
}
.nav-link.router-link-active {
  border-bottom:3px solid  #d1e1fc;
  color: #fff !important;
  border-radius: 4px;
}
.logout{
  cursor: pointer;
  margin-left:15px;
}
</style>