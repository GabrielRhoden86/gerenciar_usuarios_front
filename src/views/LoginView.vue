<template>
 <main class="rounded-2 bg-body-tertiary mt-2 p-5">
  <h4 class="text-primary p-2">Gerenciador de usuários</h4>
  <hr class="line"> 
  <div class="container-fluid h-custom">
   <div class="row d-flex justify-content-center align-items-center h-100">
    <div class="col-12 col-md-6 col-lg-5 mb-4 mb-md-0 d-flex justify-content-center">
     <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image">
      </div>
      <div class="col-12 col-md-6 col-lg-6 mx-auto"  >
        <Formulario class="bg-white p-4 rounded col-lg-10" />
      </div>
    </div>
  </div>
 </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from "@/components/FormularioLogin.vue";

export default defineComponent({
  name: 'login',
  components: { Formulario },
});
</script>

<style scoped>

.bg-body-tertiary {
  margin-bottom: 10%;
}

.form-login {
  width: 100%; 
}

@media (min-width: 1500px) {
  .form-login {
    max-width: 400px; 
  }
}
</style>
