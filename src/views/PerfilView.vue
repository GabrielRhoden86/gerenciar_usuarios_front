<template>
 <main class="rounded-2 conteudo-principal col-md-12 bg-body-tertiary mt-1">
  <div class="p-4 rounded-1 p-3">
    <div class="container-fluid text-secondary">
      <h4 class="text-secondary">Editar Perfil</h4>
      <p>Editar perfil de usuários do sistema</p>
      <hr class='line'>
      <div class=" col-md-10 d-flex justify-content-center align-items-center">
      <FormularioGeral 
        titulo="Editar perfil usuários"
        name="Editar"
       class="col-md-10"/>
      </div>
    </div>
  </div>
 </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioGeral from "@/components/FormularioGeral.vue";

export default defineComponent({
  name: 'perfil',
  components:{
    FormularioGeral
  }
});
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
    /* centraliza vertical */
}

.line {
  color:#0A67F1;
  background-color:#0A67F1;
  border:solid 1px;
}
</style>
