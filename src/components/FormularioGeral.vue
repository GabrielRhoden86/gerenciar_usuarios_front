<template>
  <div class="col-md-11 col-lg-9 col-xl-7 offset-xl-1 mt-2">
    <form class="p-4 shadow-sm rounded bg-white" @submit.prevent="submitForm">
      <header class="mb-4 d-flex align-items-center justify-content-center">
        <i :class="icone" class="fs-3"></i>
        <p class="mb-0 fw-bold text-primary">{{ titulo }}</p>
      </header>

      <div class="mb-3">
        <input 
          v-model="form.name" 
          type="text" 
          class="form-control rounded-1" 
          placeholder="Nome" 
          :required="props.acao !== 'editar'" 
        />
      </div>

      <div class="mb-3">
        <input 
          v-model="form.email" 
          type="email" 
          class="form-control rounded-1" 
          placeholder="Email" 
          :required="props.acao !== 'editar'" 
        />
      </div>
       <div v-if="props.acao === 'editar'" class="mb-3">
        <input
          v-model="form.password"
          type="password"
          class="form-control rounded-1"
          placeholder="Nova Senha"
        />
      </div>
    <div v-if="permissao === 1">
      <div class="form-check mb-3">
        <input 
          class="form-check-input" 
          type="radio" 
          name="tipo-conta" 
          id="admin" 
          value="1" 
          v-model.number="form.role_id" 
          :required="props.acao !== 'editar'" 
        />
        <label class="form-check-label" for="admin">
          <span class="fw-semibold">🔑 Administrador</span><br />
          <small class="text-muted">Acesso total ao sistema.</small>
        </label>
      </div>

      <div class="form-check mb-3">
        <input 
          class="form-check-input" 
          type="radio" 
          name="tipo-conta" 
          id="usuario" 
          value="2" 
          v-model.number="form.role_id" 
          :required="props.acao !== 'editar'" 
        />
        <label class="form-check-label" for="usuario">
          <span class="fw-semibold">👤 Usuário Padrão</span><br />
          <small class="text-muted">Acesso restrito.</small>
        </label>
      </div>
     </div>
      <button type="submit" class="btn btn-primary w-100 btn-sm px-5 rounded-1" :disabled="props.isLoading">
        <span v-if="props.isLoading">
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading...
        </span>
        <span v-else>
          {{ name }}
        </span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineEmits, defineProps, watch, onMounted, ref } from 'vue';
import { useUsuariosStore } from '@/stores/usuarioStore';
const usuariosStore = useUsuariosStore();
const props = defineProps({
  titulo: String,
  name: String,
  icone: String,
  acao: String,
  isLoading: Boolean
});

const permissao = ref<number | null>(null);

const emits = defineEmits(['submit-form']);
const form = reactive({
  name: '',
  email: '',
  password: '', 
  role_id: null as number | null
});

watch(() => form.name, (newValue) => {
  form.name = newValue.replace(/[^a-zA-Z\s]/g, '');
});

onMounted(async () => {
  permissao.value = await usuariosStore.verificaPermissao();
  console.log( permissao.value);
});
const submitForm = () => {
    if (!form.name && !form.email && !form.role_id && !form.password) return; 

  emits('submit-form', { ...form });
  form.name = '';
  form.email = '';
  form.password = '';
  form.role_id = null;
};
</script>