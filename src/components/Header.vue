<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary p-lg-4">
  <div class="container-fluid">
    <ul class="navbar-nav d-flex flex-row">
    
      
      
    
    </ul>
  </div>
</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Dropdown, initMDB } from "mdb-ui-kit";
initMDB({
  Dropdown: Dropdown as typeof Dropdown
});
export default defineComponent({
  name: 'HeaderNav',
});
</script>