<template>
  <main class="rounded-2 conteudo-principal col-12 bg-body-tertiary mt-1">
    <div class="p-4 rounded-1 p-3">
      <div class="container-fluid text-secondary">
        <h4 class="text-primary">Editar Perfil</h4>
        <p>Editar perfil de usuários do sistema</p>
        <hr class="line">

        <div class="row justify-content-around d-flex">
          <div class="col-md-5 mb-3">
            <FormularioGeral
              class="w-100"
              @submit-form="atualizarUsuario"
              :isLoading="isLoading"
              titulo="Editar Perfil do Usuário"
              name="Atualizar Perfil"
              icone="bi bi-person text-primary me"
              acao="editar"
              :permissao="permissao"
            />
          </div>
            <div class="col-md-5 ms-md-2 mb-4 mt-2 me-5">
            <CardPerfil v-if="!isLoading && usuario" :usuario="usuario" />
            <div v-else class="text-center mt-5">
              <div class="spinner-border text-primary" role="status"></div>
              <p class="mt-2">Carregando dados do usuário...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
    <AlertComponente
    :showAlert="showAlert"
    :type="alertType"
    acao="editar"
    class="custom-alert"
    :menssagem="menssagemAlerta"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormularioGeral from "@/components/FormularioGeral.vue";
import { useUsuariosStore } from '@/stores/usuarioStore';
import AlertComponente from "@/components/AlertComponente.vue";
import { exibirAlerta } from '@/Utils/Geral';
import { useRoute } from 'vue-router';
import CardPerfil from "@/components/CardPerfil.vue";
import type { UserItemPayload } from '@/interfaces/UserItemPayload';

interface Usuario {
  name: string;
  email: string;
  role_id: number;
  created_at: string;
  updated_at: string;
}

const isLoading = ref<boolean>(false);
const usuariosStore = useUsuariosStore();
const showAlert = ref(false);
const alertType = ref('success'); 
const permissao = ref<number | null>(0);
const usuario = ref<Usuario | null>(null);
const route = useRoute();
const userId = ref<number | null>(null);
const menssagemAlerta = ref<string>('')

onMounted(async () => {
  permissao.value = await usuariosStore.verificaPermissao();
});

onMounted(async () => {
  try {
    const id = Number(route.params.id); 
    const usuarioData: UserItemPayload = await usuariosStore.buscaUsuarioId(id);
    usuario.value = usuarioData; 
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
  }
  const id = route.params.id;
  if (id && typeof id === 'string') {
    userId.value = Number(id);
  }

  const carregarUsuario = async () => {
    isLoading.value = true;
    try {
      const id = Number(route.params.id);
      usuario.value = await usuariosStore.buscaUsuarioId(id);
    } finally {
      isLoading.value = false;
    }
  };
  carregarUsuario();
});


const atualizarUsuario = async (dadosDoFormulario: any) => {
  isLoading.value = true;
  showAlert.value = false;

  try {
    if (userId.value === null) {
      exibirAlerta(showAlert, alertType, 'danger');
      return;
    }

    const payload: any = {};
    if (dadosDoFormulario.name) payload.name = dadosDoFormulario.name;
    if (dadosDoFormulario.email) payload.email = dadosDoFormulario.email;
    if (dadosDoFormulario.password) payload.password = dadosDoFormulario.password;
    if (dadosDoFormulario.role_id !== null) payload.role_id = dadosDoFormulario.role_id;

  await usuariosStore.atualizarUsuarios(userId.value, payload);
    
    const usuarioAtualizadoData = await usuariosStore.buscaUsuarioId(userId.value);
    usuario.value = usuarioAtualizadoData;
    exibirAlerta(showAlert, alertType, 'success');
    
  } catch (error) {
    exibirAlerta(showAlert, alertType, 'danger');
    menssagemAlerta.value = "Você não tem permissão para acessar esta área!";

    console.error("Erro ao atualizar o usuário:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>

.card-title {
  color:#075bda !important;
}

.custom-card {
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
.custom-card:hover {
  border:solid 1px #1b68db;
  box-shadow: 0 4px 12px rgba(10, 103, 241, 0.3);
  transform: translateY(-3px);
}

.conteudo-principal {
  width:97% !important;

}
.custom-alert {
  position: fixed; 
  top: 5%; 
  right: 2%; 
  z-index: 9999;
  min-width: 5%;
  transition: opacity 0.5s ease-in-out; 
}
.custom-alert.fade {
  opacity: 0;
  visibility: hidden; 
}

.custom-alert.show {
  opacity: 1;
  visibility: visible;
}
.line {
  color:#0A67F1;
  background-color:#0A67F1;
  border:solid 1px;
}
.card-perfil{
    min-height:48.2vh;
  }
</style>