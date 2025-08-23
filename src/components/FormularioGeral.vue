<template>
  <div class="col-md-11 col-lg-9 col-xl-7 offset-xl-1 mt-2">
    <form class="p-4 shadow-sm rounded bg-white">
    <header class="mb-4 d-flex align-items-center justify-content-center">
        <i :class="icone" class="fs-3"></i>
        <p class="mb-0 fw-bold text-primary">{{titulo}}</p>
    </header>

      <div class="mb-3 ">
        <input 
          type="name" 
          id="formName" 
          class="form-control form-control-md rounded-1"
          placeholder="Nome" 
        />
      </div>

         <div class="mb-3">
        <input 
          type="email" 
          id="formEmail" 
          class="form-control form-control-md rounded-1"
          placeholder="Email" 
        />
      </div>

        <div class="form-check mb-3">
        <input class="form-check-input" type="radio" name="tipo-conta" id="admin" value="1" required>
         <label class="form-check-label" for="admin">
            <span class="fw-semibold">🔑 Administrador</span> <br>
            <small class="text-muted">Acesso total ao sistema, permissões avançadas.</small>
        </label>
        </div>

    <div class="form-check mb-3">
    <input class="form-check-input" type="radio" name="tipo-conta" id="usuario" value="2" required>
     <label class="form-check-label" for="usuario">
        <span class="fw-semibold">👤 Usuário Padrão</span><br>
        <small class="text-muted">Acesso restrito, indicado para uso geral.</small>
    </label>
    </div>

      <div class="text-center text-lg-center mt-4 pt-2">
        <button type="submit" class="btn btn-primary btn-sm px-5 rounded-1 w-100">
          {{name}}
        </button>
      </div>
    </form>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Formulario',
    props: {
    titulo:{
    type: String, 
    required: true,
    },
    icone:{
    type: String, 
    required: true,
    },
    name:{
    type: String, 
    required: true,
    }
   }
});
</script>

<style >
input:focus {
  outline: none; 
  border: 1px solid #99ccff !important; 
  box-shadow: 0 0 5px rgba(153, 204, 255, 0.5) !important;
}

*{
   /* border:solid red 1px; */
}
</style>