<template>
 <main class="rounded-2 conteudo-principal bg-body-tertiary mt-1">
  <div class="flex-grow-1 p-4 rounded-1 p-3">
    <div class="container-fluid text-secondary">
      <h4 class="text-primary">Usuários</h4>
      <p>Sistema de gerenciador de usuários</p>
      <hr class='line'>

    <div class="mb-3 d-flex align-items-center d-flex justify-content-md-end">
        <b class="text-primary">Filtrar</b><i class="bi bi-funnel fs-5 me-2 text-primary"></i>
      </div>
<div class="table-responsive">
  <table class="table align-middle mb-0 bg-white">
    <thead class="bg-light">
      <tr>
        <th>Name</th>
        <th>Title</th>
        <th>Status</th>
        <th>Position</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            <img
              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
              alt=""
              style="width: 45px; height: 45px"
              class="rounded-circle"
            />
            <div class="ms-3">
              <p class="fw-bold mb-1">John Doe</p>
              <p class="text-muted mb-0">john.doe@gmail.com</p>
            </div>
          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">Software engineer</p>
          <p class="text-muted mb-0">IT department</p>
        </td>
        <td>
          <span class="badge badge-success rounded-pill d-inline">Active</span>
        </td>
        <td>Senior</td>
        <td>
          <button type="button" class="btn btn-link btn-sm btn-rounded">
            Edit
          </button>
        </td>
      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            <img
              src="https://mdbootstrap.com/img/new/avatars/6.jpg"
              class="rounded-circle"
              alt=""
              style="width: 45px; height: 45px"
            />
            <div class="ms-3">
              <p class="fw-bold mb-1">Alex Ray</p>
              <p class="text-muted mb-0">alex.ray@gmail.com</p>
            </div>
          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">Consultant</p>
          <p class="text-muted mb-0">Finance</p>
        </td>
        <td>
          <span class="badge badge-primary rounded-pill d-inline">Onboarding</span>
        </td>
        <td>Junior</td>
        <td>
          <button type="button" class="btn btn-link btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark">
            Edit
          </button>
        </td>
      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            <img
              src="https://mdbootstrap.com/img/new/avatars/7.jpg"
              class="rounded-circle"
              alt=""
              style="width: 45px; height: 45px"
            />
            <div class="ms-3">
              <p class="fw-bold mb-1">Kate Hunington</p>
              <p class="text-muted mb-0">kate.hunington@gmail.com</p>
            </div>
          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">Designer</p>
          <p class="text-muted mb-0">UI/UX</p>
        </td>
        <td>
          <span class="badge badge-warning rounded-pill d-inline">Awaiting</span>
        </td>
        <td>Senior</td>
        <td>
          <button type="button" class="btn btn-link btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark">
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>


    </div>
  </div>
 </main>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'usuarios',
});
</script>

 <style  scoped>
 .card-title{
  color:#075bda !important;
 }
 .custom-card {
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
 .custom-card:hover {
   border:solid 1px #1b68db;
}
.custom-card:hover {
  box-shadow: 0 4px 12px rgba(10, 103, 241, 0.3);
  transform: translateY(-3px);
}
 .conteudo-principal{
  width:97% !important;
  /* background-color: white !important; */
  height:85vh;
 }

 .line{
  color:#0A67F1;
  background-color:#0A67F1 ;
  border:solid 1px;
 }

</style>
    
