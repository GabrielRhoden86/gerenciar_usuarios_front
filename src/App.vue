<template>
  <div id="app">
    <div class="wrapper d-flex vh-100 principal-app">
      <MenuLateral v-if="isMenuOpen && $route.name !== 'login'" />
      <div class="content flex-grow-1 d-flex flex-column" title="Oculta menu">
        <div
          v-if="$route.name !== 'login'"
          class="p-2 border-bottom bg-light d-flex justify-content-start"
        >
          <button @click="toggleMenu" class="btn btn-outline-primary menu-toggle-btn">
            <i class="bi bi-list menu-icon"></i>
          </button>
        </div>
        <div class="p-4 flex-grow-1 overflow-auto">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuLateral from "@/components/MenuLateral.vue";

   const isMenuOpen = ref<boolean>(true);
    const toggleMenu = (): void => {
      isMenuOpen.value = !isMenuOpen.value;
    };

</script>

<style>
 .bi-box-arrow-right{
    cursor:pointer;
    margin-left:2% !important;
 }

.wrapper {
  overflow: hidden;
}
.content {
  overflow: auto;
}
.principal-app{
 min-height:100vh;
 background-color: #EEEEEE ;
}
body{
   background-color: #EEEEEE ;
}
</style>'