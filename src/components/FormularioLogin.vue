<template>
  <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-5">
    <form class="p-4 shadow-sm rounded bg-white">
      <!-- Cabeçalho melhorado -->
      <header class="text-center mb-4">
        <h4 class="fw-bold text-primary">Login</h4>
        <p class="text-muted small">Acesse sua conta para continuar</p>
      </header>

      <div class="mb-3">
        <input 
          type="email" 
          id="formEmail" 
          class="form-control form-control-md rounded-1"
          placeholder="Email" 
        />
      </div>

      <div class="mb-3">
        <input 
          type="password" 
          id="formPassword" 
          class="form-control form-control-md rounded-1" 
          placeholder="Senha"
        />
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <a href="#!" class="text-primary small">Esqueceu sua senha?</a>
      </div>

      <div class="text-center text-lg-start mt-4 pt-2">
        <button type="submit" class="btn btn-primary btn-sm px-5 rounded-1">
          Entrar
        </button>
        <p class="small fw-bold mt-3 mb-0">
          Crie uma conta!
          <a href="#!" class="link-primary"> Registrar</a>
        </p>
      </div>
    </form>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Formulario',
});
</script>

<style >
input:focus {
  outline: none; 
  border: 1px solid #99ccff !important; 
  box-shadow: 0 0 5px rgba(153, 204, 255, 0.5) !important;
}
</style>