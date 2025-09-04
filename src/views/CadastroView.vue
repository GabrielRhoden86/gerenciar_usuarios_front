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
            :permissao="permissao"
            class="col-md-10"
          />  
        </div>
      </div>
    </div>
  </main>

  <AlertComponente
  :showAlert="showAlert"
  :type="alertType"
  :menssagem="mensagemAlerta"
  acao="cadastrado"
/>  
 
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormularioGeral from "@/components/FormularioGeral.vue";
import AlertComponente from "@/components/AlertComponente.vue";
import { useUsuariosStore } from '@/stores/usuarioStore';
import { exibirAlerta } from '@/Utils/Geral';

const mensagemAlerta = ref<string>('');
const usuariosStore = useUsuariosStore();
const isLoading = ref<boolean>(false);
const showAlert = ref(false);
const alertType = ref('success'); 
const permissao = ref<number | null>(0);

onMounted(async () => {
  permissao.value = await usuariosStore.verificaPermissao();
});

const cadastrarUsuario = async (dadosDoFormulario: any) => {
  isLoading.value = true;
  showAlert.value = false;
  try {
    const { name, email, role_id } = dadosDoFormulario;
    await usuariosStore.cadastrarUsuarios(name, email, role_id);
    mensagemAlerta.value = 'Usuário cadastrado com sucesso! Senha enviada para o email.';
    exibirAlerta(showAlert, alertType, mensagemAlerta, 'success');
    
  } catch (error: any) {
    const errosValidacao = error.response?.data?.errors || {};
    const mensagens = Object.values(errosValidacao).flat();
    const mensagem = mensagens.join(" | ") || error.message || "Erro desconhecido";

    mensagemAlerta.value = mensagem;
    exibirAlerta(showAlert, alertType, mensagemAlerta, 'danger');
  } finally {
    isLoading.value = false;
  }
};
</script>

