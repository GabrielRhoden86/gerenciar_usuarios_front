<template>
 <main class="rounded-2 conteudo-principal col-md-12 bg-body-tertiary mt-1">
  <div class="p-4 rounded-1 p-3">
    <div class="container-fluid text-secondary">
      <h4 class="text-primary">Editar Perfil</h4>
      <p>Editar perfil de usuários do sistema</p>
      <hr class='line'>      
      <div class=" col-md-10 d-flex justify-content-center align-items-center">

      <FormularioGeral 
        @submit-form="atualizarUsuario"
        :isLoading="isLoading"
        titulo="Editar perfil usuários"
        name="Atualizar Perfil"
        icone="bi bi-person text-primary me"
        class="col-md-10"/>
      </div>
    </div>
  </div>
 </main>
   <AlertComponente
    :showAlert="showAlert"
    :type="alertType"
     acao="atualizado"
    class="custom-alert"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormularioGeral from "@/components/FormularioGeral.vue";
import { useUsuariosStore } from '@/stores/usuarioStore';
import AlertComponente from "@/components/AlertComponente.vue";
import { exibirAlerta } from '@/Utils/Geral';
import { useRoute } from 'vue-router';

const isLoading = ref<boolean>(false);
const usuariosStore = useUsuariosStore();
const showAlert = ref(false);
const alertType = ref('success'); 
let alertTimeoutId: number | null = null;

const route = useRoute();
const userId = ref<number | null>(null);

onMounted(() => {
  const id = route.params.id;
  if (id) {
    userId.value = Number(id);
    console.log("ID do usuário a ser editado:", userId.value);
  }
});

const atualizarUsuario = async (dadosDoFormulario: any) => {
  isLoading.value = true;
  showAlert.value = false;
  try {
    const { name, email, role_id } = dadosDoFormulario;
    const id = 30; 
    await usuariosStore.atualizarUsuarios(id, name, email, role_id);
    alertTimeoutId = exibirAlerta(showAlert, alertType, 'success'); 
  } catch (error) {
    alertTimeoutId = exibirAlerta(showAlert, alertType, 'danger');
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
  height:100vh;
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
</style>
