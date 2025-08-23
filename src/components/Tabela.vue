<template>
  <table class="table align-middle mb-0 bg-white">
    <thead class="bg-light">
      <tr>
        <th v-for="header in headers" :key="header.key">
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.name">
        <td>
          <div class="d-flex align-items-center">
            <img :src="item.image" alt="" style="width: 45px; height: 45px" class="rounded-circle" />
            <div class="ms-3">
              <p class="fw-bold mb-1">{{ item.name }}</p>
              <p class="text-muted mb-0">{{ item.email }}</p>
            </div>
          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">{{ item.title }}</p>
          <p class="text-muted mb-0">{{ item.department }}</p>
        </td>
        <td>
          <span :class="['badge', `badge-${item.statusClass}`, 'rounded-pill', 'd-inline']">
            {{ item.statusText }}
          </span>
        </td>
        <td>{{ item.position }}</td>
        <td>
          <button type="button" class="btn btn-link btn-sm btn-rounded">
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { TableHeader } from "@/interfaces/TableHeader";
import type { UserItem } from "@/interfaces/UserItem";

const props = defineProps({
  headers: {
    type: Array as () => TableHeader[],
    default: () => [],
  },  
    items: {
    type: Array as () => UserItem[],
    default: () => [],
  },  
});
onMounted(() => {
 console.log("ok:",props.items);
});


</script>