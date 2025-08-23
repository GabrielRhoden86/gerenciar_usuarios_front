<template>
  <div id="app">
    <div v-if="$route.name !== 'login'" class="wrapper d-flex vh-100 principal-app">
      <div class="menu-toggler">
        <i 
          @click="toggleMenu" 
          :class="['bi', isMenuOpen ? 'bi-x' : 'bi-list', 'fs-4', 'p-2']"
        ></i>
      </div>

      <MenuLateral :is-open="isMenuOpen" />
      
      <div class="content flex-grow-1 d-flex flex-column">
        <div class="p-4 flex-grow-1 overflow-auto">
          <router-view />
        </div>
      </div>
    </div>
    <div v-else class="vh-100 d-flex justify-content-center align-items-center bg-light">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuLateral from "@/components/MenuLateral.vue";

const isMenuOpen = ref(true);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};


</script>

<style>
 .bi-box-arrow-right{
    cursor:pointer;
    margin-left:2% !important;
  }

.menu-toggler {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1050; /* Garante que o ícone esteja acima do menu */
  cursor: pointer;
}
.wrapper {
  overflow: hidden;
}
.content {
  overflow: auto;
}
.principal-app{
 background-color: #EEEEEE ;
}
</style>