<template>
  <nav class="mt-3" aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(pagination.current_page - 1)">
          Previous
        </a>
      </li>

      <li
        v-for="page in pages"
        :key="page"
        class="page-item"
        :class="{ active: page === pagination.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">
          {{ page }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
        <a class="page-link" href="#" @click.prevent="changePage(pagination.current_page + 1)">
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    pagination: {
      default: () => ({
        current_page: 1,
        per_page: 10,
        last_page: 1,
        total: 0,
      }),
    },
  },
  emits: ["page-changed"],
  setup(props, { emit }) {
    const pages = computed(() =>
      Array.from({ length: props.pagination.last_page }, (_, i) => i + 1)
    );

    const changePage = (page: number) => {
      if (page < 1 || page > props.pagination.last_page) return;
      emit("page-changed", page);
    };

    return { pages, changePage };
  },
});
</script>
