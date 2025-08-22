<template>
 <main class="rounded-4 conteudo-principal mt-4">
  <div class="flex-grow-1 p-4  rounded-4 p-3 ">
    <div class="container-fluid text-secondary">
      <h2 class="text-secondary">Conteúdo Principal</h2>
      <p>Aqui vai o conteúdo principal do sistema.</p>
      <!-- Exemplo de grid responsivo -->
      <div class="row">
        <div class="col-md-4 mb-3" v-for="i in 6" :key="i">
          <div class="card">
            <div class="card-body">
              Item {{ i }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MainContent',
});
</script>


 <style  scoped>
 *{
   
 }
 .conteudo-principal{
  /* border:solid red 1px; */
  width:97% !important;
  background-color: white !important;
 }

</style>
    
