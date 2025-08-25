<template>
    <div v-if="usuario" class="card shadow-sm border-0">
      <div class="card-body p-4">
        <div class="d-flex align-items-center mb-4">
          <i class="bi bi-person-circle text-primary fs-1 me-3"></i>
          <div>
            <h5 class="card-title fw-bold mb-0">Perfil do Usuário</h5>
            <p class="text-muted small mb-0">Informações Detalhadas</p>
          </div>
        </div>

        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="fw-bold">Nome:</span>
            <span>{{ usuario.name }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="fw-bold">Email:</span>
            <span>{{ usuario.email }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="fw-bold">Perfil:</span>
            <span>{{ formatRole(usuario.role_id).name }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="fw-bold">Cadastrado em:</span>
            <span>{{ formatarData(usuario.created_at) }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="fw-bold">Última Atualização:</span>
            <span>{{ formatarData(usuario.updated_at) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="text-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="mt-2">Carregando dados do usuário...</p>
    </div>
  
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { formatarData, formatRole } from '@/Utils/Geral';

interface Usuario {
  name: string;
  email: string;
  role_id: number;
  created_at: string;
  updated_at: string;
}

defineProps({
  usuario: {
    type: Object as PropType<Usuario | null>,
    required: true,
  },
});
</script>