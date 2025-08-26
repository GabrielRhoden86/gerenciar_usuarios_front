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
        <div  
          @click="goCadastro()"
          class="nav-link text-white cadastro">
          <i class="bi bi-person-plus fs-5 me-2 "></i> Cadastrar
        </div>
      </li>
       <li>
        <div  
          @click="goToPerfil()"
          class="nav-link text-white cadastro">
          <i class="bi bi-person fs-5 me-2 "></i> Perfil
        </div>
      </li>
      <li>
        <router-link to="/usuarios" class="nav-link text-white">
          <i class="bi bi-people fs-5 me-2"></i> Usuários
        </router-link>
      </li>
    </ul>
    <hr />
    <AlertComponente
        :showAlert="showAlert"
        :type="alertType"
         class="custom-alert"
        :menssagem="menssagemAlerta"
      />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useUsuariosStore } from '@/stores/usuarioStore';
import { exibirAlerta } from '@/Utils/Geral';
import AlertComponente from "@/components/AlertComponente.vue";

let alertTimeoutId: number | null = null;


const authStore = useAuthStore();
const permissao = ref<number>(0);
const showAlert = ref(false);
const menssagemAlerta = ref<string>('')
const alertType = ref('success'); 
const usuariosStore = useUsuariosStore();
const router = useRouter();
const idUser =  ref<number>(0);

const handleLogout = () => {
  authStore.logout();
  router.push({ name: 'login' });
};

onMounted(async () => {
  permissao.value = await usuariosStore.verificaPermissao();
  idUser.value = await usuariosStore.verificaId();
});

const goCadastro = () => {
  if (permissao.value === 1) {
    router.push("/cadastro");
  } else {
    menssagemAlerta.value = "Você não tem permissão para acessar esta área!";
    exibirAlerta(showAlert, alertType, 'danger');
  }
};
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