<template>
  <div class="wrapper d-flex">
    <MenuLateral 
     v-if="isMenuOpen"
     class="menu-lateral" 
     @closeMenu="toggleMenu"
     />
    <div class="content flex-grow-1 d-flex flex-column" title="Oculta menu">
      <div class="p-2 border-bottom bg-light d-flex justify-content-start">
        <button @click="toggleMenu" class="btn menu-toggle-btn"> 
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

<style >
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

.custom-alert {
  position: fixed;   
  top: 1rem;     
  right: 1rem;       
  z-index: 9999;    
  max-width: 400px; 
  padding: 0.75rem 1.25rem;
  word-wrap: break-word;  
  word-break: break-word; 
  white-space: normal;    
  transition: opacity 0.5s ease-in-out;
}

.custom-alert.fade {
  opacity: 0;
  visibility: hidden; 
}

.custom-alert.show {
  opacity: 1;
  visibility: visible;
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
  }

  .menu-toggle-btn {
   color:white;
   margin-bottom: 10px !important;
  }
}
.menu-toggle-btn {
  position: relative;
  z-index: 1100; 
}
body{
  background-color: #EEEEEE !important;
}
 .conteudo-principal {
  width:99% !important;
}

.line{
  color:#0A67F1;
  background-color:#0A67F1 ;
  border:solid 1px;
}

</style>
