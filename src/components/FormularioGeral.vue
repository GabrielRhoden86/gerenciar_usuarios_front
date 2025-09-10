<template>
  <div  v-if="props.permissao !== null" class="col-md-11 col-lg-9 col-xl-7 offset-xl-1 mt-2 form-geral min-vh-100" >
    <form class="p-4 shadow-sm rounded bg-white" @submit.prevent="submitForm">
      <header class="mb-4 d-flex align-items-center justify-content-center">
        <i :class="icone" class="fs-2"></i>
        <p class="mb-0 fw-bold fs-5 text-primary">{{ titulo }}</p>
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

      <div v-show="props.acao === 'editar'" class="mb-3">
        <input
          v-model="form.password"
          type="password"
          class="form-control rounded-1"
          placeholder="Nova Senha"
          autocomplete="new-password"
        />
      </div>

      <div v-show="props.permissao === 1">
        <div class="form-check mb-3">
          <input 
            class="form-check-input" 
            type="radio" 
            name="tipo-conta" 
            id="admin" 
            value="1" 
            v-model.number="form.role_id" 
            @change="roleAlterada = true"
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
            @change="roleAlterada = true"
            :required="props.acao !== 'editar'" 
          />
          <label class="form-check-label" for="usuario">
            <span class="fw-semibold">👤 Usuário Padrão </span><br />
            <small class="text-muted">Acesso restrito.</small>
          </label>
        </div>
      </div>

      <div v-if="roleAlterada" class="mt-2 text-danger small p-2">
        ⚠️ Após atualizar o perfil o usuário precisará realizar um novo login para atualizar as permissões de acesso.
      </div>
     
      <button type="submit" class="btn btn-primary w-100 btn-sm px-5 rounded-1" :disabled="props.isLoading">
        <span v-if="props.isLoading">
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Atualizando...
        </span>
        <span v-else>
          {{ name }}
        </span>
      </button>
    </form>
  </div>
  <div v-else class="text-center mt-5">
    <span class="spinner-border text-primary" role="status"></span>
    <p class="mt-2">Carregando dados do usuário...</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineEmits, defineProps, watch, ref  } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
  titulo: String,
  name: String,
  icone: String,
  acao: String,
  isLoading: Boolean,
  permissao: Number as PropType<number | null>
});

const roleAlterada = ref(false); 

const emits = defineEmits(['submit-form']);
const form = reactive({
  name: '',
  email: '',
  password: '', 
  role_id: null as number | null
});

watch(() => form.name, (newValue) => {
  form.name = newValue.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
});


const submitForm = () => {
  if (!form.name && !form.email && !form.role_id && !form.password) return;

  emits('submit-form', { ...form });
  form.name = '';
  form.email = '';
  form.password = '';
  form.role_id = null;
  roleAlterada.value = false; 
};
</script>
