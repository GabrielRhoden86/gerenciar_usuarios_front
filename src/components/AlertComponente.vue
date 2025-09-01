<template>
  <div v-if="showAlert" :class="['alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show', 'custom-alert']" role="alert">
    <span >
      {{ menssagem }} 
    </span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  menssagem: {
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
