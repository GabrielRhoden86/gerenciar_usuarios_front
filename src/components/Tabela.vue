<template>
    <table class="table table-hover align-middle mb-0 bg-white ">
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

          <td class="text-center">
            <div class="d-flex justify-content-start gap-2">
              <button type="button" class="btn btn-link btn-sm " title="Editar"
               @click="goToPerfil(item.id)"
              >
                <i class="bi bi-pencil fs-5"></i>
              </button>
        
              <button type="button"      
                @click="emit('excluir', item.id)" 
                   class="btn btn-link btn-sm text-danger" title="Excluir">
                <i class="bi bi-trash fs-5"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
        <AlertComponente
        :showAlert="showAlert"
        :type="alertType"
         class="custom-alert"
        :menssagem="menssagemAlerta"
      />
    </table>
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

const emit = defineEmits<{
  (e: "excluir", id: number): void;
  (e: "page-changed", page: number): void;
}>();
const router = useRouter();
const permissao = ref<number>(0);
const usuariosStore = useUsuariosStore();
const itemSelecionado = ref<number | null>(null);
const showAlert = ref(false);
const menssagemAlerta = ref<string>('')
const alertType = ref('success'); 
const idUser = ref<number | null>(null);
let alertTimeoutId: number | null = null;


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
  permissao.value = await usuariosStore.verificaPermissao();
  idUser.value = await usuariosStore.verificaId();
});

const goToPerfil = (id: number)  => {

  if (permissao.value === 1 || idUser.value === id) {
  router.push({
    name: 'perfil',
    params: { id: id }
  });
  } else {
    menssagemAlerta.value = "Você não tem permissão para acessar esta área!";
    alertTimeoutId = exibirAlerta(showAlert, alertType, 'danger');
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