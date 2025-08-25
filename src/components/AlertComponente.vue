<template>
    <div>
        <div v-if="showAlert" :class="['alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show', 'custom-alert']" role="alert">
            <span v-if="type === 'success'">
                Usuário cadastrado com sucesso! 
            </span>
            <span v-else>
                Ocorreu um erro ao cadastrar o usuário. 
            </span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  showAlert: Boolean,
  type: {
    type: String,
    default: 'success'
  }
});
</script>
<style >
.custom-alert {
  position: fixed;
  top: 5%;
  right: 2%;
  z-index: 9999;
  min-width: 5%;
  transition: opacity 0.5s ease-in-out; 
}

.custom-alert.fade {
  opacity: 0;
  visibility: hidden; 
}

.custom-alert.show {
  opacity: 1;
  visibility: visible;
}

.btn-close {
  transform: scale(0.7); 
}
</style>