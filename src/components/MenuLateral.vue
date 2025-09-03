<template>
  <div class="d-flex flex-column flex-shrink-0 p-4 text-white menu-lateral">
   
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
        <div  
          @click="goToPerfil()"
          class="nav-link text-white cadastro">
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
import { useUsuariosStore } from '@/stores/usuarioStore';

const authStore = useAuthStore();
const usuariosStore = useUsuariosStore();
const router = useRouter();
const idUser =  ref<number>(0);

const handleLogout = () => {
  authStore.logout();
  router.push({ name: 'login' });
};

onMounted(async () => {
  idUser.value = await usuariosStore.verificaId();
});

const goToPerfil = () => {
  router.push({
    name: 'perfil',
    params: { id: idUser.value}
  });
};

</script>

<style scoped>
.cadastro{
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
.nav-link.router-link-active {
  /* border-bottom:3px solid  #d1e1fc;
  color: #fff !important;
  border-radius: 4px; */
}
.logout{
  cursor: pointer;
  margin-left:15px;
}
</style>