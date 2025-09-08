<template>
  <div v-if="showAlert" :class="['alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show', 'custom-alert']" role="alert">
    <span >
      {{ menssagem }} 
    </span>
    <button type="button" 
      class="btn-close btn-close-sm position-absolute p-2" 
      data-bs-dismiss="alert" 
      aria-label="Close">
     </button>
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

<style>
  .custom-alert {
  position: fixed;   
  top: 1rem;     
  right: 1rem;       
  z-index: 9999;    
  max-width: 480px; 
  padding: 0.75rem 1.25rem;
  word-wrap: break-word;  
  word-break: break-word; 
  white-space: normal;    
  transition: opacity 0.5s ease-in-out;
}
.btn-close-sm {
  transform: scale(0.6);
  margin-bottom:15px;
}
*{
  /* border:solid red 1px; */
}
</style>