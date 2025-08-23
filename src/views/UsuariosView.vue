<template>
 <main class="rounded-2 conteudo-principal bg-body-tertiary mt-1">
  <div class="flex-grow-1 p-4 rounded-1 p-3">
    <div class="container-fluid text-secondary">
      <h4 class="text-primary">Usuários</h4>
      <p>Sistema de gerenciador de usuários</p>
      <hr class='line'>

    <div class="mb-3 d-flex align-items-center d-flex justify-content-md-end">
        <b class="text-primary">Filtrar</b><i class="bi bi-funnel fs-5 me-2 text-primary"></i>
      </div>
      <div class="table-responsive">
        <Tabela :headers="headers" :items="items"/>
      </div>
    </div>
  </div>
 </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Tabela from "@/components/Tabela.vue";
import type { TableHeader } from "@/interfaces/TableHeader";
import type { UserItem } from "@/interfaces/UserItem";

const cabecalho = ref<TableHeader[]>([
  { key: 'name', label: 'Name' },
  { key: 'title', label: 'Title' },
  { key: 'position', label: 'Position' },
  { key: 'actions', label: 'Actions' },
]);

const headers = computed(() =>
  cabecalho.value.map(col => {
    return {
      label: col.label,
      key: col.key,
      ...( { align: 'center' as const })
    };
  })
);

const items = ref<UserItem[]>([
  {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    image: 'https://mdbootstrap.com/img/new/avatars/8.jpg',
    title: 'Software engineer',
    department: 'IT department',
    statusText: 'Active',
    statusClass: 'success',
    position: 'Senior',
  },
  {
    name: 'Alex Ray',
    email: 'alex.ray@gmail.com',
    image: 'https://mdbootstrap.com/img/new/avatars/6.jpg',
    title: 'Consultant',
    department: 'Finance',
    statusText: 'Onboarding',
    statusClass: 'primary',
    position: 'Junior',
  },
  {
    name: 'Kate Hunington',
    email: 'kate.hunington@gmail.com',
    image: 'https://mdbootstrap.com/img/new/avatars/7.jpg',
    title: 'Designer',
    department: 'UI/UX',
    statusText: 'Awaiting',
    statusClass: 'warning',
    position: 'Senior',
  },
]);

</script>

 <style  scoped>
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
 .conteudo-principal{
  width:97% !important;
  /* background-color: white !important; */
  height:85vh;
 }

 .line{
  color:#0A67F1;
  background-color:#0A67F1 ;
  border:solid 1px;
 }

</style>
    