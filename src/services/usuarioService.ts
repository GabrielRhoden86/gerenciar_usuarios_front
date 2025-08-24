import apiClient from './apiClient';

export const useUsuarioService = {
  async usuarioService() {
    const response = await apiClient.get('/usuarios/listar', {
    });
    return response.data;
  },
};