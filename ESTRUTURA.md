## 📦 Dependências Principais

- **typescript (~5.8.3)**: linguagem que adiciona tipagem ao JavaScript, oferecendo maior segurança.
- **axios (^1.11.0)**: biblioteca para realizar requisições HTTP, usada nos Services para consumir a API.
- **bootstrap (^5.3.7)**: framework CSS para estilização rápida e responsiva.
- **bootstrap-icons (^1.13.1)**: conjunto de ícones compatível com Bootstrap.
- **vue-router (^4.5.x)**: gerenciador de rotas do Vue 3, permitindo navegação entre páginas da aplicação.

## 📦 Pinia + Service + Store

Separação de responsábilidade:
Este projeto demonstra como usar **Pinia** no Vue 3 para gerenciar estado reativo, consumindo uma API através de **Services**.

## ⚙️ Estrutura

- **Service**: responsável por consumir a API e retornar dados.  
- **Store**: responsável pela reatividade e gerenciamento de estado no frontend.
## 🛠️ Service

O Service encapsula as chamadas à API.  
Exemplo de `useUsuarioService.ts`:

```ts
import type { PaginationResponse, UserItem } from '@/types';

export const useUsuarioService = {
  async usuarioService(page: number, filtros: any = {}) {
    const response = await apiClient.get<PaginationResponse<UserItem>>('/usuarios/listar', {
      params: {
        page: page,
        ...filtros 
      }
    });
    return response.data;
  }
};

## 🛠️ Store (Pinia)

A store é responsável por armazenar e manipular os dados reativos.  
Exemplo de uso dentro de store:

```ts
import { ref } from 'vue';
import { useUsuarioService } from '@/services/useUsuarioService';
import type { PaginationResponse, UserItem } from '@/types';

const error = ref<Error | null>(null);

const fetchUsuarios = async (page = 1, filtros = {}) => {
  error.value = null;
  try {
    const response: PaginationResponse<UserItem> = await useUsuarioService.usuarioService(page, filtros);
    return response;
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    error.value = err;
    return null;
  }
};


## 🌐 Configuração de Rotas (Vue Router) index.ts

- Cria o roteamento da aplicação com `createRouter` e `createWebHistory`.
- Define as rotas principais:

| Rota        | Componente           | Meta                         |
|------------|----------------------|-----------------------------|
| `/`        | HomeView.vue          | `requiresAuth: true`        |
| `/login`   | LoginView.vue         | -                           |
| `/usuarios`| UsuariosView.vue      | `requiresAuth: true`        |
| `/cadastro`| CadastroView.vue      | `requiresAuth: true`        |
| `/perfil/:id` | PerfilView.vue      | `requiresAuth: true`        |

- Adiciona **verificação de autenticação**:
  - Se a rota requer autenticação (`requiresAuth`) e o usuário não tem token, redireciona para `/login`.

- Captura erros do router com `router.onError`.

```ts

## Leia Também:

[Como utilizar aplicação](README.md)

## Instalação do App
Para instalar o aplicativo, siga as instruções detalhadas no arquivo:

[Guia de Instalação](docs/INSTALAÇÃO.md)
