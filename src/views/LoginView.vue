<template>
 <main class="rounded-2 bg-body-tertiary mt-5">
  <h4 class="text-primary p-2">Gerenciador de usuários</h4>
  <hr class="line"> 
  <div class="container-fluid h-custom">
   <div class="row d-flex justify-content-center align-items-center h-100">
     <div class="col-md-9 col-lg-6 col-xl-5">
       <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
        class="img-fluid" alt="Sample image">
      </div>
      <Formulario/>
    </div>
  </div>
 </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from "@/components/FormularioLogin.vue";

export default defineComponent({
  name: 'login',
    components: {
    Formulario, 
  },
});
</script>

 <style  scoped>
 .line{
  color:#0A67F1;
  background-color:#0A67F1 ;
  border:solid 1px;
 }



.bg-body-tertiary{
  margin-bottom:10%;
}
</style>
    
