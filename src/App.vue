<template>
  <div class="wrapper d-flex vh-100 principal-app">
    <MenuLateral />
    <div class="content flex-grow-1 d-flex flex-column ">
      <Header />
      <div class="d-flex justify-content-center ">
        <ConteudoPrincipal />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import MenuLateral from '@/components/MenuLateral.vue';
import Header from './components/Header.vue';
import ConteudoPrincipal from './components/ConteudoPrincipal.vue';
</script>

<style>
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