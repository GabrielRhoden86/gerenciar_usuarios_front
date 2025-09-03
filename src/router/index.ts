import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { 
        path: '', 
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { 
        title: 'Home',
        requiresAuth: true 
        } 
      },

      { 
         path: 'usuarios', 
         name: 'usuarios', 
         component: () =>
         import('@/views/UsuariosView.vue'),
         meta: { title: 'Lista usuários', 
         requiresAuth: true 
        }
        },
      {
        path: 'cadastro', 
        name: 'cadastro', 
        component: () => import('@/views/CadastroView.vue'),
        meta: { title: 'Cadastro de Usuário',
        requiresAuth: true 
        } 
      },
      { path: 'perfil/:id', 
        name: 'perfil',
        component: () => import('@/views/PerfilView.vue'),
        meta: { title: 'Editar Perfil',
        requiresAuth: true }
       },
    ]
  },
  {
    path: '/login',
    component: AuthLayout,
    children: [
      { 
        path: '', name: 'login', 
        component: () => import('@/views/LoginView.vue'),
        meta: { title: 'Login' }
       }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    return next({ name: 'login' });
  }
  next();
});

export default router;
