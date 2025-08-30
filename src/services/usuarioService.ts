import apiClient from './apiClient';
import type { UserItem } from '@/interfaces/UserItem';
import type { UserItemPayload } from '@/interfaces/UserItemPayload';
import type { PaginationResponse } from '@/interfaces/PaginationResponse';

interface ApiResponse<T> {
  data: T;
}
export const useUsuarioService = {

  async usuarioService(page: number, filtros: any = {}) {
    const response = await apiClient.get<PaginationResponse<UserItem>>('/usuarios/listar', {
      params: {
        page: page,
        ...filtros 
      }
    });
    return response.data;
  },
  

  async cadastrarUsuarioService(name: string, email: string, role_id: number) {
    try {
      const response = await apiClient.post<UserItemPayload>('/usuarios/cadastrar', {
        name,
        email,
        role_id
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

async atualizarUsuarioService(id: number, payload: any) {
  const response = await apiClient.patch<UserItemPayload>(`/usuarios/editar/${id}`, payload);
  return response.data;
},

async excluirUsuarioService(id: number) {
  const response = await apiClient.delete<UserItemPayload>(`/usuarios/excluir/${id}`);
  return response.data;
},

async buscaUsuarioService(id: number) {
  const response = await apiClient.get<ApiResponse<UserItemPayload>>(`/usuarios/buscar/${id}`);
  return response.data.data;
}
};