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
              <button type="button" class="btn btn-link btn-sm " title="Editar">
                <i class="bi bi-pencil fs-5"></i>
              </button>
        
              <button type="button"      
                @click="$emit('excluir', item.id)" 
                   class="btn btn-link btn-sm text-danger" title="Excluir">
                <i class="bi bi-trash fs-5"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { TableHeader } from "@/interfaces/TableHeader";
import type { UserItem } from "@/interfaces/UserItem";
import { formatarData } from '@/Utils/Geral';
import { formatRole } from '@/Utils/Geral';

const emit = defineEmits<{
  (e: "page-changed", page: number): void;
}>();

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
    /* border: solid 10px white; */
  }
</style>