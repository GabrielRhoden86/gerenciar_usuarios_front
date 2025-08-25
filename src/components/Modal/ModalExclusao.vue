<template>
  <div class="modal fade" ref="modalRef" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger">
             <i class="bi bi-exclamation-circle-fill text-danger fs-3 me-3"></i>

            Confirmação de Exclusão

          </h5>
          <button type="button" class="btn-close" @click="fecharModal"></button>
        </div>
        <div class="modal-body">
          <p>Tem certeza que deseja excluir este usuário?</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="fecharModal">Cancelar</button>
          <button class="btn btn-danger" @click="confirmarExclusao">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';

export default defineComponent({
  props: {
    itemSelecionado: Number
  },
  emits: ['fechar', 'confirmar'],
  setup(props, { emit }) {
    const modalRef = ref<HTMLElement | null>(null);
    let modalInstance: Modal | null = null;

    onMounted(() => {
      if (modalRef.value) {
        modalInstance = new Modal(modalRef.value, { backdrop: 'static', keyboard: false });
      }
    });

    const abrirModal = () => {
      if (modalInstance) modalInstance.show();
    };

    const fecharModal = () => {
      if (modalInstance) modalInstance.hide();
      emit('fechar');
    };

    const confirmarExclusao = () => {
      emit('confirmar', props.itemSelecionado);
      fecharModal();
    };

    return { modalRef, abrirModal, fecharModal, confirmarExclusao };
  }
});
</script>
