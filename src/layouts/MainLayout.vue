<template>
  <div class="wrapper d-flex vh-100 principal-app">
    <MenuLateral v-if="isMenuOpen" class="menu-lateral" />
    <div class="content flex-grow-1 d-flex flex-column" title="Oculta menu">
      <div class="p-2 border-bottom bg-light d-flex justify-content-start">
        <button @click="toggleMenu" class="btn btn-outline-primary menu-toggle-btn">
          <i class="bi bi-list menu-icon"></i>
        </button>
      </div>

      <div class="p-4 flex-grow-1 overflow-auto d-flex justify-content-center">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MenuLateral from '@/components/MenuLateral.vue';
import { useWindowSize } from '@vueuse/core';
const { width } = useWindowSize();
const isMenuOpen = ref(true);

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  if (width.value < 768) {
    isMenuOpen.value = false;
  }
});
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
.content {
  overflow: auto;
}
.principal-app {
  min-height: 100vh;
  background-color: #EEEEEE;
}

@media (max-width: 768px) {
  .menu-lateral {
    position: absolute;
    z-index: 1000;
    width: 250px;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #fff;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%); /* oculto */
  }
  .content {
    flex-grow: 1;
    margin-left: 0; 
  }
}
</style>
