<template>
  <div class="col-md-4">
    <div class="card h-100 custom-card p-0">
      <div class="card-body text-center">
        <i :class="icone" class="fs-3 mb-3"></i>
        <h5 class="card-title fw-bold text-dark">{{ titulo }}</h5>
        <p class="card-text text-muted">{{ subtitulo }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Cards",
  props: {
    icone: {
      type: String,
    },
    iconeEdit: {
      type: String,
    },
    titulo: {
      type: String,
      },
    subtitulo: {
      type: String,
      required: false,
      default: "",
    },
  },
});
</script>
