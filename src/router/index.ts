import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { title: 'Dashboard' },
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('@/views/CadastroUsuarioView.vue'),
    meta: { title: 'Cadastro de Usuário' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
