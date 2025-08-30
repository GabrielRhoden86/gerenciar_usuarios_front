<template>
  <main class="rounded-2 conteudo-principal col-12 bg-body-tertiary mt-1">
    <div class="p-3 p-md-4 rounded-1">
      <div class="container-fluid text-secondary">
        <h4 class="text-primary">Editar Perfil</h4>
        <p>Editar perfil de usuários do sistema</p>
        <hr class="line">

        <div class="row g-1 justify-content-center align-items-start">
          <div class="col-12 col-md-10 col-lg-7 d-flex">
            <FormularioGeral
              class="flex-fill"
              @submit-form="atualizarUsuario"
              :isLoading="isLoading"
              titulo="Editar Perfil do Usuário"
              name="Atualizar Perfil"
              icone="bi bi-person text-primary me"
              acao="editar"
              :permissao="permissao"
            />
          </div>

          <div class="col-12 col-md-10 col-lg-5 d-flex mt-5 mt-lg-0 card-perfil-container">
            <div class="flex-fill">
              <CardPerfil v-if="!isLoading && usuario" :usuario="usuario" class="card-perfil mt-3" />
              <div v-else class="text-center mt-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2">Carregando dados do usuário...</p>
              </div>
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
import CardPerfil from "@/components/CardPerfil.vue";
import AlertComponente from "@/components/AlertComponente.vue";
import { useUsuariosStore } from '@/stores/usuarioStore';
import { exibirAlerta } from '@/Utils/Geral';
import { useRoute } from 'vue-router';
import type { UserItemPayload } from '@/interfaces/UserItemPayload';

interface Usuario {
  name: string;
  email: string;
  role_id: number;
  created_at: string;
  updated_at: string;
}

const isLoading = ref(false);
const usuariosStore = useUsuariosStore();
const showAlert = ref(false);
const alertType = ref('success'); 
const permissao = ref<number | null>(0);
const usuario = ref<Usuario | null>(null);
const userId = ref<number | null>(null);
const menssagemAlerta = ref<string>('');
const route = useRoute();

const carregarPermissao = async () => {
  permissao.value = await usuariosStore.verificaPermissao();
};

const carregarUsuarioPorId = async (id: number) => {
  isLoading.value = true;
  try {
    const usuarioData: UserItemPayload = await usuariosStore.buscaUsuarioId(id);
    usuario.value = usuarioData;
    userId.value = id;
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await carregarPermissao();

  const idParam = Number(route.params.id);
  if (!isNaN(idParam)) {
    await carregarUsuarioPorId(idParam);
  }
});

const atualizarUsuario = async (dadosDoFormulario: any) => {
  if (userId.value === null) {
    exibirAlerta(showAlert, alertType, 'danger');
    return;
  }

  isLoading.value = true;
  showAlert.value = false;

  try {
    const payload: any = {};
    if (dadosDoFormulario.name) payload.name = dadosDoFormulario.name;
    if (dadosDoFormulario.email) payload.email = dadosDoFormulario.email;
    if (dadosDoFormulario.password) payload.password = dadosDoFormulario.password;
    if (dadosDoFormulario.role_id !== null) payload.role_id = dadosDoFormulario.role_id;

    await usuariosStore.atualizarUsuarios(userId.value, payload);
    await carregarUsuarioPorId(userId.value); 
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
.line {
  color: #0A67F1;
  background-color: #0A67F1;
  border: solid 1px;
}

/* Mantém o formulário do mesmo tamanho */
.row > .d-flex {
  display: flex;
  flex-direction: column;
}

.card-perfil-container {
  flex: 1 1 auto; 
}

.card-perfil {
  min-height: 400px; 
  padding: 1.5rem;   
  box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075); 
  border-radius: 0.5rem; 
  background-color: #fff;
}

@media (max-width: 767px) {
  .row > .d-flex {
    flex-direction: column;
  }
  .card-perfil {
    min-height: auto; 
  }
}
</style>