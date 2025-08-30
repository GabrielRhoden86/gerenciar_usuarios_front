<template>
  <div v-if="showAlert" :class="['alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show', 'custom-alert']" role="alert">
    <span v-if="type === 'success'">
      Usuário {{ acao }} com sucesso!
      <span v-if="acao === 'cadastrado'">
        <br>
        Senha provisória enviada para o email cadastrado.
      </span>
    </span>
    <span v-else>
      {{ mensagem }} 
    </span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  mensagem: {
    type: String,
    default: '',
  },
  showAlert: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'success',
  },
  acao: {
    type: String,
    required: false,
  },
});
</script>
