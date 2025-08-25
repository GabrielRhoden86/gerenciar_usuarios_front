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
            subtitulo="Cadastrar novos usuários no sistema"
            icone="bi bi-person-plus text-primary"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import Cards from "@/components/Cards.vue";

const router = useRouter();
const goUsuarios = () => {
  router.push({ name: 'usuarios' });
};

const goCadastro = () => {
  router.push({ name: 'cadastro' });
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
  height:85vh;
 }

 .line{
  color:#0A67F1;
  background-color:#0A67F1 ;
  border:solid 1px;
 }

</style>
    
