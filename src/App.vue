<template>
  <div id="app">
    <div v-if="$route.name !== 'login'" class="wrapper d-flex vh-100 principal-app">
      <MenuLateral />
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
import MenuLateral from "@/components/MenuLateral.vue";

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
 background-color: #EEEEEE ;
}
</style>