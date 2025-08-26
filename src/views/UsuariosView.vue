<template>
 <main class="rounded-2 conteudo-principal bg-body-tertiary mt-1">
  <div class="flex-grow-1 p-4 rounded-1 p-3">
    <div class="container-fluid text-secondary">
      <h4 class="text-primary">Usuários</h4>
      <p>Sistema de gerenciador de usuários</p>
      <hr class='line'>

      <div class="mb-3 d-flex align-items-center d-flex justify-content-md-end filtros">
        <b class="text-primary" @click="toggleFiltroModal">Filtrar</b>
        <i class="bi bi-funnel fs-5 me-2 text-primary" @click="toggleFiltroModal"></i>
      </div>

      <div class="table-responsive">
      <div class="d-flex justify-content-center w-100">
        <template v-if="isLoading">
          <span class="text-center">
         <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Carregando... 
          </span>
        </template>
      <template v-else>
      <div class="w-100">
        <Tabela
          :headers="headers"
          :items="resultItems"
           @excluir="abrirModalExclusao"
        />
          <PaginacaoTabela
            :pagination="pagination"
            @page-changed="fetchDadoUsuarios"
          />
        </div>
        <ModalExclusao
          ref="modalExclusao"
          :itemSelecionado="itemSelecionado"
          @confirmar="excluirUsuario"
        />
      </template>
      </div>
      </div>
    </div>
  </div>
     <ModalLateral
      :isVisible="isFiltroModalOpen"
      :filtros="filtros"
      @close="toggleFiltroModal"
      @apply-filters="handleApplyFilters"
      @clear-filters="handleClearFilters"
   />
      <AlertComponente
        :showAlert="showAlert"
        :type="alertType"
         class="custom-alert"
        :menssagem="menssagemAlerta"
      />
    
 </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Tabela from "@/components/Tabela.vue";
import PaginacaoTabela from "@/components/PaginacaoTabela.vue";
import type { TableHeader } from "@/interfaces/TableHeader";
import type { UserItem } from "@/interfaces/UserItem";
import { useUsuariosStore } from '@/stores/usuarioStore';
import ModalExclusao from "@/components/Modal/ModalExclusao.vue";
import ModalLateral from "@/components/Modal/ModalLateral.vue";
import AlertComponente from "@/components/AlertComponente.vue";
import { exibirAlerta } from '@/Utils/Geral';

const usuariosStore = useUsuariosStore();
const resultItems = ref<UserItem[]>([]);
const itemSelecionado = ref<number | null>(null);
const modalAberto = ref(false);
const modalExclusao = ref<any>(null); 
const permissao = ref<number>(0);


const showAlert = ref(false);
const menssagemAlerta = ref<string>('')
const alertType = ref('success'); 
let alertTimeoutId: number | null = null;

const pagination = ref({
  current_page: 1,
  per_page: 10,
  last_page: 1,
  total: 0,
});

const cabecalho = ref<TableHeader[]>([
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'Email' },
  { key: 'role_id', label: 'Perfil' },
  { key: 'created_at', label: 'Criado' },
  { key: 'updated_at', label: 'Atualizado' },
  { key: 'acoes', label: 'Ações' },
]);

const filtros = ref({
  name: '',
  email: '',
  role_id: null
});

const isFiltroModalOpen = ref(false);

const toggleFiltroModal = () => {
  isFiltroModalOpen.value = !isFiltroModalOpen.value;
};

const headers = computed(() =>
  cabecalho.value.map(col => {
    return {
      label: col.label,
      key: col.key,
      ...( { align: 'center' as const })
    };
  })
);

const isLoading = ref<boolean>(false);

const fetchDadoUsuarios = async (page = 1) => {
  isLoading.value = true;
  try {
    const items = await usuariosStore.fetchUsuarios(page, filtros.value);
    if (items && 'data' in items && items.data) {
      pagination.value = {
        current_page: items.data.current_page,
        per_page: items.data.per_page,
        last_page: items.data.last_page,
        total: items.data.total,
      };
      resultItems.value = items.data.data;
    } else {
      pagination.value = {
        current_page: 1,
        per_page: 0,
        last_page: 1,
        total: 0,
      };
      resultItems.value = [];
    }
  } catch (error) {
    console.error("Erro ao buscar os usuários:", error);
  } finally {
    isLoading.value = false;
  }
};

const abrirModalExclusao = (id: number) => {

if(permissao.value ===1 ){
   itemSelecionado.value = id;
  if (modalExclusao.value) {
    modalExclusao.value.abrirModal();
  }
}else{
  menssagemAlerta.value = "Você não tem permissão para acessar esta área!";
  alertTimeoutId = exibirAlerta(showAlert, alertType, 'danger');
}
};

const fecharModal = () => {   
  modalAberto.value = false;
};

const handleApplyFilters = (novosFiltros: { name: string, email: string, role_id: number | null }) => {
    filtros.value = novosFiltros;
    fetchDadoUsuarios(1); 
    toggleFiltroModal(); 
};

const handleClearFilters = () => {
    filtros.value = {
        name: '',
        email: '',
        role_id: null
    };
    fetchDadoUsuarios(1); 
    toggleFiltroModal(); 
};

const excluirUsuario = async (id: number) => { 
  if (!id) {
    console.error("ID não fornecido para exclusão.");
    return;
  }
  isLoading.value = true;
  try {
    await usuariosStore.excluirUsuario(id);
    await fetchDadoUsuarios(pagination.value.current_page);
    
    fecharModal(); 
  } catch (error) {
    console.error("Erro ao excluir o usuário:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchDadoUsuarios();
});
</script>

 <style  scoped>
 .filtros{
  cursor:pointer;
 }
 .btn-close-sm {
  width: 0.75rem;   
  height: 0.75rem;  
  font-size: 0.6rem;
  border-radius: 2px; 
}
 .card-title{
  color:#075bda !important;
 }
 .custom-card {
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
 .custom-card:hover {
   border:solid 1px #1b68db;
}
.custom-card:hover {
  box-shadow: 0 4px 12px rgba(10, 103, 241, 0.3);
  transform: translateY(-3px);
}
 .conteudo-principal {
  width: 97% !important;
  min-height: 100vh;
}

 .line{
  color:#0A67F1;
  background-color:#0A67F1 ;
  border:solid 1px;
 }

</style>
    