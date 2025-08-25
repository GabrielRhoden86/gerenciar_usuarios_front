<template>
  <div
    class="offcanvas offcanvas-end"
    :class="{ 'show': isVisible }"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">Filtros</h5>
      <button
        type="button"
        class="btn-close"
        @click="fecharModal"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <p>Formulário de filtro</p>
      <div class="mb-3">
        <label for="filtro-name" class="form-label">Nome</label>
        <input type="text" id="filtro-name" class="form-control" v-model="filtrosInternos.name">
      </div>
      <div class="mb-3">
        <label for="filtro-email" class="form-label">Email</label>
        <input type="text" id="filtro-email" class="form-control" v-model="filtrosInternos.email">
      </div>
      <div class="mb-3">
        <label for="filtro-role" class="form-label">Permissão</label>
        <select class="form-select" id="filtro-role" v-model="filtrosInternos.role_id">
          <option :value="null">Todas as permissões</option>
          <option value="1">Admin</option>
          <option value="2">Usuário Padrão</option>
        </select>
      </div>
      <button type="button" class="btn btn-primary" @click="aplicarFiltros">Aplicar Filtros</button>
      <button type="button" class="btn btn-secondary ms-2" @click="limparFiltros">Limpar Filtros</button>
    </div>
  </div>
</template>
<style scoped>
.offcanvas.show {
  visibility: visible;
}
</style>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  filtros: { 
    type: Object,
    required: true
  }
});

const emits = defineEmits(['close', 'apply-filters', 'clear-filters']);

const filtrosInternos = ref({ ...props.filtros });

watch(() => props.filtros, (newFiltros) => {
  filtrosInternos.value = { ...newFiltros };
});

const fecharModal = () => {
  emits('close');
};

const aplicarFiltros = () => {
  emits('apply-filters', filtrosInternos.value);
  fecharModal();
};

const limparFiltros = () => {
  emits('clear-filters');
  fecharModal();
};
</script>