<template>
  <main class="rounded-2 conteudo-principal col-md-12 bg-body-tertiary mt-1">
    <div class="p-4 rounded-1 p-3">
      <div class="container-fluid text-secondary">
        <h4 class="text-primary">Cadastro</h4>
        <p>Cadastrar novos usuários do sistema</p>
        <hr class="line">
        <div class="col-md-10 d-flex justify-content-center align-items-center">

            <AlertComponente
              :showAlert="showAlert"
              :type="alertType"
            />

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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormularioGeral from "@/components/FormularioGeral.vue";
import AlertComponente from "@/components/AlertComponente.vue";
import { useUsuariosStore } from '@/stores/usuarioStore';
import type { UserItemPayload } from '@/interfaces/UserItemPayload';

const usuariosStore = useUsuariosStore();
const isLoading = ref<boolean>(false);
const showAlert = ref(false);
const alertType = ref('success'); 

const exibirAlerta = (type = 'success', tempo = 4000) => {
  alertType.value = type;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, tempo);
};

const cadastrarUsuario = async (dadosDoFormulario:any) => {
 isLoading.value = true;
 showAlert.value = false; 
  try {
    const { name, email, role_id } = dadosDoFormulario;
    await usuariosStore.cadastrarUsuarios(name, email, role_id);
    exibirAlerta('success');

 } catch (error) {
      exibirAlerta('danger');
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
</style>