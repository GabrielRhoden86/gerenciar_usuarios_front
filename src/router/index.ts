import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Home', requiresAuth: true },
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
    meta: { title: 'Lista usuários', requiresAuth: true },
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('@/views/CadastroView.vue'),
    meta: { title: 'Cadastro de Usuário', requiresAuth: true },
  },
  
  {
    path: '/perfil/:id',
    name: 'perfil',
    component: () => import('@/views/PerfilView.vue'),
    meta: { title: 'Editar Perfil', requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.onError(err => {
  console.error('Router error:', err);
});

router.beforeEach((to, _from, next) => {
 const authStore = useAuthStore()

 if (to.meta.requiresAuth && !authStore.token) {
    return next({ name: 'login' })
  }
  next()
})

export default router;