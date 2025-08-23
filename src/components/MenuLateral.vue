<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-white menu-lateral">
   
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>Gabriel Rhoden</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">Configurações</a></li>
        <li><a class="dropdown-item" href="#">Perfil</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><router-link to="/login" class="dropdown-item" href="#">Sair</router-link></li>
      </ul>
    </div>
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

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MenuLateral',
});


</script>

<style scoped>
.sidebar a.active {
  background-color: #0d6efd;
}
.menu-lateral{
  background-color: #0D6EFD;
}
.nav-link:hover {
  /* color: #d1e1fc !important; */
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
</style>