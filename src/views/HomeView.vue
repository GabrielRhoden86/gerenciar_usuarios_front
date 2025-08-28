<template>
  <main class="rounded-2 conteudo-principal bg-body-tertiary mt-1">
    <div class="flex-grow-1 p-4 rounded-1 p-3">
      <div class="container-fluid text-secondary">
        <h4 class="text-primary">Gerenciador de usuários</h4>
        <p>Lista de usários do sistema</p>
        <hr class='line'>
        <div class="row g-3 justify-content-center"> 
          <Cards
            titulo="Lista de usuários" 
            @click="goUsuarios"
            subtitulo="Lista de todos os usuários do sistema"
            icone="bi bi-people text-primary"
          />
        <Cards
          titulo="Cadastro"
          @click="goCadastro"
          :disabled="!permissaoCarregada"
          subtitulo="Cadastrar novos usuários no sistema"
          icone="bi bi-person-plus text-primary"
        />
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
import { onMounted, ref  } from 'vue';
import AlertComponente from "@/components/AlertComponente.vue";
import { exibirAlerta } from '@/Utils/Geral';

const permissao = ref<number | null>(0);
const usuariosStore = useUsuariosStore();
const router = useRouter();
const showAlert = ref(false);
const menssagemAlerta = ref<string>('')
const alertType = ref('success'); 
const permissaoCarregada = ref(false);

onMounted(async () => {
  permissao.value = await usuariosStore.verificaPermissao();
  permissaoCarregada.value = true;
});

const goUsuarios = () => {
  router.push({ name: 'usuarios' });
};

const goCadastro = async () => {
     console.log('home:',permissao.value)
  if (permissao.value === null) {
    permissao.value = await usuariosStore.verificaPermissao();
  }

  if (permissao.value === 1) {
    router.push("/cadastro");
  } else {
    menssagemAlerta.value = "Você não tem permissão para acessar esta área!";
    exibirAlerta(showAlert, alertType, 'danger');
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
  width:97% !important;
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
    
