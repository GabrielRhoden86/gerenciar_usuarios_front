import apiClient from './apiClient';
import type { UserItem } from '@/interfaces/UserItem';
import type { UserItemPayload } from '@/interfaces/UserItemPayload';
import type { PaginationResponse } from '@/interfaces/PaginationResponse';
import type { ApiResponse } from '@/interfaces/ApiResponse';
import type { UserFilters } from '@/interfaces/UserFilter';



export const useUsuarioService = {

  async listar(page: number, filtros: UserFilters = {}):Promise<PaginationResponse<UserItem>> {
    const response = await apiClient.get<PaginationResponse<UserItem>>('/usuarios/listar', {
      params: {
        page: page,
        ...filtros 
      }
    });
    return response.data;
  },
  

  async cadastrar(name: string, email: string, role_id: number): Promise<UserItemPayload> {
      const response = await apiClient.post<UserItemPayload>('/usuarios/cadastrar', {
        name,
        email,
        role_id
      });
      return response.data;
  },

async atualizar(id: number, payload: UserItemPayload): Promise<UserItemPayload> {
  const response = await apiClient.patch<UserItemPayload>(`/usuarios/editar/${id}`, payload);
  return response.data;
},

async excluir(id: number): Promise<UserItemPayload> {
  const response = await apiClient.delete<UserItemPayload>(`/usuarios/excluir/${id}`);
  return response.data;
},

async buscar(id: number): Promise<UserItemPayload> {
  const response = await apiClient.get<ApiResponse<UserItemPayload>>(`/usuarios/buscar/${id}`);
  return response.data.data;
 }
};