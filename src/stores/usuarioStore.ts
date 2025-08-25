import { ref } from 'vue';
import { useUsuarioService } from '@/services/usuarioService';
import type { UserItem } from '@/interfaces/UserItem';


export function useUsuariosStore() {
  const usuarios = ref<UserItem[]>([]);
  const error = ref<any>(null);

  const fetchUsuarios = async (page = 1) => {
    error.value = null;
    try {
      const response = await useUsuarioService.usuarioService(page);
      return response;
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      error.value = err;
      return [];
    }
  };

   const cadastrarUsuarios = async (
      name:string,
      email:string,
      role_id:number,
    ) => {
    error.value = null;
    try {
      const response = await useUsuarioService.cadastrarUsuarioService(name,email,role_id);
      return response;
    } catch (err) {
      console.error('Erro ao cadastrar usuários:', err);
      error.value = err;
      return [];
    }
  };

  const atualizarUsuarios = async (
    id: number,
    name: string,
    email: string,
    role_id: number,
  ) => {
    error.value = null;
    try {
      const response = await useUsuarioService.atualizarUsuarioService(id, name, email, role_id);
      return response;
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      error.value = err;
      return null;
  }
  };

  const excluirUsuario  = async (id: number) => {
    error.value = null;
    try {
      const response = await useUsuarioService.excluirUsuarioService(id);
      return response;
    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
      error.value = err;
      throw err; 
    }
  };
  
  return {
    usuarios,
    error,
    fetchUsuarios,
    cadastrarUsuarios,
    atualizarUsuarios,
    excluirUsuario,
  };
}