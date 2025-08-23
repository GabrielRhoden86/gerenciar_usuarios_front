import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
   {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Home' },
  },
     {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Login' },
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/views/UsuariosView.vue'),
    meta: { title: 'Lista usuários' },
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('@/views/CadastroView.vue'),
    meta: { title: 'Cadastro de Usuário' },
  },
  
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('@/views/PerfilView.vue'),
    meta: { title: 'Editar Perfil' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;