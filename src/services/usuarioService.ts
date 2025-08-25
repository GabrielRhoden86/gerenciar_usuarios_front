import apiClient from './apiClient';
import type { UserItem } from '@/interfaces/UserItem';
import type { UserItemPayload } from '@/interfaces/UserItemPayload';
import type { PaginationResponse } from '@/interfaces/PaginationResponse';


export const useUsuarioService = {
  async usuarioService(page: number) {
    const response = await apiClient.get<PaginationResponse<UserItem>>('/usuarios/listar', {
          params: {
            page: page,
          }
        });
    return response.data;
  },  

async cadastrarUsuarioService(name:string, email:string, role_id: number, ) {
    const response = await apiClient.post<UserItemPayload>('/usuarios/cadastrar', {
          name: name,
          email:email,
          role_id:role_id
        });
    return response.data;
  },  

  async atualizarUsuarioService(id: number, name: string, email: string, role_id: number) {
  const response = await apiClient.patch<UserItemPayload>(`/usuarios/editar/${id}`, {
    name: name,
    email: email,
    role_id: role_id
  });
  return response.data;
},

async excluirUsuarioService(id: number) {
  const response = await apiClient.delete<UserItemPayload>(`/usuarios/excluir/${id}`);
  return response.data;
}
};