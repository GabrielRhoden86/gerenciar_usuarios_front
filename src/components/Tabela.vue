<template>
      <AlertComponente
        :showAlert="showAlert"
        :type="alertType"
        class="custom-alert mw-300"
        :menssagem="menssagemAlerta"
      />
    <div class="table-responsive">
    <table class="table table-hover align-middle mb-0 bg-white">
      <thead class="bg-light">
        <tr>
          <th v-for="header in props.headers" :key="header.key" class="title-table pt-3">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td>
            <div class="d-flex align-items-center">
              <i class="fs-3 bi bi-person"></i>
              <div class="ms-3">
                <p class="fw-bold text-muted mb-1">{{ item.name }}</p>
              </div>
            </div>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ item.title }}</p>
            <p class="text-muted mb-0">{{ item.email }}</p>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ item.title }}</p>
            <p :class="formatRole(item.role_id).color" class="mb-0">
                {{ formatRole(item.role_id).name }}
            </p>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ item.title }}</p>
            <p class="text-muted mb-0">{{ formatarData(item.created_at) }}</p>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ item.title }}</p>
            <p class="text-muted mb-0">{{ formatarData(item.updated_at) }}</p>
          </td> 

        <td class="text-center position-relative">
         <div class="d-flex justify-content-start gap-2">
          <button 
            type="button" 
            class="btn btn-link btn-sm position-relative" 
            title="Editar"
            @click="goToPerfil(item.id)"
            :disabled="loadingPerfilId === item.id"
          >
            <i class="bi bi-pencil fs-5"></i>
            <div 
              v-if="loadingPerfilId === item.id" 
              class="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center"
              style="pointer-events: none;"
            >
              <div class="spinner-border text-primary" role="status" style="width: 2.2rem; height: 2.2rem;">
                <span class="visually-hidden"></span>
              </div>
            </div>
          </button>
            <button 
              type="button"      
              @click="handleExcluir(item.id)" 
              class="btn btn-link btn-sm text-danger position-relative" 
              title="Excluir"
              :disabled="loadingExcluirId === item.id"
            >
              <i class="bi bi-trash fs-5"></i>

              <div 
                v-if="loadingExcluirId === item.id" 
                class="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center"
                style="pointer-events: none;"
              >
                <div class="spinner-border spinner-border-sm  text-danger" role="status" style="width: 2rem; height: 2rem;">
                  <span class="visually-hidden"></span>
                </div>
              </div>
            </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import  { onMounted, ref} from "vue";
import type { TableHeader } from "@/interfaces/TableHeader";
import type { UserItem } from "@/interfaces/UserItem";
import { formatarData } from '@/Utils/Geral';
import { formatRole } from '@/Utils/Geral';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '@/stores/usuarioStore';
import { exibirAlerta } from '@/Utils/Geral';
import AlertComponente from "@/components/AlertComponente.vue";
import { useAuthStore } from '@/stores/authStore';

const loadingPerfilId = ref<number | null>(null);
const loadingExcluirId = ref<number | null>(null);
const permissaoCarregada  = ref(false);
const emit = defineEmits<{
  (e: "excluir", id: number): void;
  (e: "page-changed", page: number): void;
}>();
const router = useRouter();
const permissao = ref<number | null>(0);
const usuariosStore = useUsuariosStore();
const showAlert = ref(false);
const menssagemAlerta = ref<string>('')
const alertType = ref('success'); 
const idUser = ref<number | null>(null);
const auth = useAuthStore();

const props = defineProps({
  headers: {
    type: Array as PropType<TableHeader[]>,
    default: () => [],
  },
  items: {
    type: Array as PropType<UserItem[]>,
    default: () => [],
  },
});

onMounted(async () => {
  permissao.value = auth.user?.permissao;
  idUser.value = auth.user?.id;
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const handleExcluir = async (id: number) => { 
 loadingExcluirId.value = id; 
  try {
    emit('excluir', id); 
  } finally {
    loadingExcluirId.value = null; 
  }
};

const goToPerfil = async (id: number) => {
  loadingPerfilId.value = id;
  await delay(1);
  try {
    if (permissao.value === 1 || idUser.value === id) {
      router.push({
        name: 'perfil',
        params: { id: id }
      });
    } else {
      menssagemAlerta.value = "Você não tem permissão para acessar esta área!";
      exibirAlerta(showAlert, alertType, menssagemAlerta, 'danger');
    }
  } finally {
    loadingPerfilId.value = null;
  }
};

</script>

<style lang="css" scoped>
  .img-padrao{
    width: 45px; 
    height: 45px
  }
  .title-table{
   color:rgb(99, 97, 97) !important;
  }
  .table{
    font-size:13.5px;
  }

</style>