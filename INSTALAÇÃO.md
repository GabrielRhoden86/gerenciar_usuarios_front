# Gerenciar Usuários Frontend

Este projeto utiliza [Vite](https://vitejs.dev/) como bundler para desenvolvimento rápido e build otimizado.  

---

## 📥 Clonar o repositório

```bash
git clone https://github.com/GabrielRhoden86/gerenciar_usuarios_front.git
cd gerenciar_usuarios_front

🚀 Instalação
1. Pré-requisitos

- **npm install**

- **typescript (~5.8.3)**  
  Linguagem que adiciona tipagem ao JavaScript, oferecendo maior segurança.  
  ```bash
  npm install typescript@~5.8.3 --save-dev

- **axios (^1.11.0)**
    Biblioteca para realizar requisições HTTP, usada nos Services para consumir a API.
    Node.js
    (versão recomendada: >= 18.x)

   npm install axios@^1.11.0

- **bootstrap (^5.3.7)**
   Framework CSS para estilização.
   npm install bootstrap@^5.3.7

- **bootstrap-icons (^1.13.1)** 
   npm install bootstrap-icons@^1.13.1

- **vue-router (^4.5.x)**
    npm install vue-router@^4.5.0


⚙️ Configuração de variáveis de ambiente

Crie um arquivo chamado .env na raiz do projeto com o seguinte conteúdo:

# Ambiente local
VITE_API_URL=http://localhost:8000/api

# Ambiente em nuvem
VITE_API_URL=https://gerenciador-usuarios.onrender.com/api

▶️ Executar o servidor de desenvolvimento

npm run dev
##