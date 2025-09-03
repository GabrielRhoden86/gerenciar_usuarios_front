<template>
  <main class="rounded-2 conteudo-principal bg-body-tertiary mt-1">
    <div class="flex-grow-1 p-4 rounded-1 p-3">
      <div class="container-fluid text-secondary">
        <h4 class="text-primary">Gerenciador de usuários</h4>
        <p>Lista de usários do sistema</p>
        <hr class='line'>
    <div class="justify-content-center"> 
      
      <div class="d-flex justify-content-around row g-3" >
        <Cards
         class="col-md-4"
         titulo="Lista de usuários" 
         @click="goUsuarios"
         subtitulo="Lista de todos os usuários do sistema"  
         icone="bi bi-people text-primary"
          />
        <Cards
          class="col-md-4"
          titulo="Meu Perfil"
          @click="goToPerfil"
          subtitulo="Editar meus dados  "
          icone="bi bi-person text-primary"
          />
        <Cards
          class="col-md-4"
          titulo="Cadastro"
          @click="goCadastro"
          :disabled="loadingCadastro || !permissaoCarregada"
          subtitulo="Cadastrar novos usuários no sistema"
          icone="bi bi-person-plus text-primary"
          />

        <div v-if="loadingCadastro" class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="background: rgba(255,255,255,0.6);">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
        </div>
      </div>
      <AlertComponente
        :showAlert="showAlert"
        :type="alertType"
         acao="editar"
         class="custom-alert"
        :menssagem="menssagemAlerta"
      />
    </div>
  </main>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import Cards from "@/components/Cards.vue";
import { useUsuariosStore } from '@/stores/usuarioStore';
import { onMounted, ref } from 'vue';
import AlertComponente from "@/components/AlertComponente.vue";
import { exibirAlerta } from '@/Utils/Geral';

const usuariosStore = useUsuariosStore();
const router = useRouter();
const showAlert = ref(false);
const menssagemAlerta = ref<string>('')
const alertType = ref('success'); 
const loadingCadastro = ref(false);
const permissao = ref<number | null>(null);
const permissaoCarregada = ref(false);
const idUser =  ref<number>(0);

onMounted(async () => {
  idUser.value = await usuariosStore.verificaId();
  permissao.value = await usuariosStore.verificaPermissao();
  permissaoCarregada.value = true;
});

const goUsuarios = () => {
  router.push({ name: 'usuarios' });
};

const goToPerfil = () => {
  router.push({
    name: 'perfil',
    params: { id: idUser.value}
  });
};

const goCadastro = async () => {
  loadingCadastro.value = true;

    try {
      if (permissao.value === null) {
        permissao.value = await usuariosStore.verificaPermissao();
        permissaoCarregada.value = true;
      }

      // return se não tem permissão
      if (permissao.value !== 1) {
        menssagemAlerta.value = "Você não tem permissão para acessar esta área!";
        exibirAlerta(showAlert, alertType, menssagemAlerta, 'danger');
        return;
      }

      // Se passou na permissão redireciona
      router.push("/cadastro");
    } finally {
      loadingCadastro.value = false;
    }
};


</script>

 <style  >
 .card-title{
  color:#075bda !important;
 }
 .custom-card {
  cursor: pointer;
    transition: all 0.3s ease;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
 .custom-card:hover {
   border:solid 1px #1b68db;
}
.custom-card:hover {
  box-shadow: 0 4px 12px rgba(10, 103, 241, 0.3);
  transform: translateY(-3px);
}
 .conteudo-principal{
  width:100% !important;
  min-height:85vh;
 }

 .custom-alert {
  position: fixed; 
  top: 2%; 
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

 .line{
  color:#0A67F1;
  background-color:#0A67F1 ;
  border:solid 1px;
 }

</style>
    
