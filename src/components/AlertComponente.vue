<template>
    <div>
        <div v-if="props.showAlert" :class="['alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show', 'custom-alert']" role="alert">
            <span v-if="type === 'success'">
                Usuário {{acao}} com sucesso! 
            </span>
            <span v-else>
               {{menssagem}} 
            </span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  menssagem:{
    type: String,
    default: 'success'
  },
  showAlert: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'success'
  },
  acao: {
    type: String,
    required: false
  }
});
</script>
<style >

</style>