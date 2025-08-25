<template>
  <main class="rounded-2 conteudo-principal col-md-12 bg-body-tertiary mt-1">
    <div class="p-4 rounded-1 p-3">
      <div class="container-fluid text-secondary">
        <h4 class="text-primary">Cadastro</h4>
        <p>Cadastrar novos usuários do sistema</p>
        <hr class="line">
        <div class="col-md-10 d-flex justify-content-center align-items-center">
          <FormularioGeral
            titulo="Cadastrar novos usuários"
            icone="bi bi-person-plus fs-5 text-primary me-2"
            name="Cadastrar"
            @submit-form="cadastrarUsuario"
            :isLoading="isLoading"
            class="col-md-10"
          />
        </div>
      </div>
    </div>
  </main>

  <AlertComponente
    :showAlert="showAlert"
    :type="alertType"
    acao="cadastrado"
    class="custom-alert"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormularioGeral from "@/components/FormularioGeral.vue";
import AlertComponente from "@/components/AlertComponente.vue";
import { useUsuariosStore } from '@/stores/usuarioStore';
import { exibirAlerta } from '@/Utils/Geral';

const usuariosStore = useUsuariosStore();
const isLoading = ref<boolean>(false);
const showAlert = ref(false);
const alertType = ref('success'); 
let alertTimeoutId: number | null = null;

const cadastrarUsuario = async (dadosDoFormulario:any) => {
  isLoading.value = true;
  showAlert.value = false;
  try {
    const { name, email, role_id } = dadosDoFormulario;
    await usuariosStore.cadastrarUsuarios(name, email, role_id);
    alertTimeoutId = exibirAlerta(showAlert, alertType, 'success'); 

  } catch (error) {
    alertTimeoutId = exibirAlerta(showAlert, alertType, 'danger');
    console.error("Erro ao cadastrar o usuário:", error);
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
  height:100vh;
}

.line {
  color:#0A67F1;
  background-color:#0A67F1;
  border:solid 1px;
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

.btn-close {
  transform: scale(0.7); 
}
</style>