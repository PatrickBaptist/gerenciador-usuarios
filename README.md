# Front-end - Gerenciador de Usuários

Este é o front-end de um sistema de gerenciamento de usuários, desenvolvido em React com funcionalidades modernas, como gerenciamento de estados com React Hook Form, validações com Yup e estilização utilizando Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca principal para construção da interface.
- **React Hook Form**: Gerenciamento de formulários de maneira performática.
- **Yup**: Validações de schema para formulários.
- **Axios**: Comunicação com APIs externas.
- **React Query (TanStack)**: Gerenciamento de dados e cache.
- **Tailwind CSS**: Estilização rápida e eficiente.
- **ShadCN**: Componentes estilizados e consistentes para design.
- **Testing Library**: Testes unitários para a interface.

## 📂 Estrutura do Projeto

/src ├── components │ ├── Form │ │ └── AddressForm.jsx # Formulário para adicionar ou editar endereços │ └── AddressList │ └── AddressList.jsx # Lista de endereços gerenciados ├── App.js # Componente principal ├── index.js # Ponto de entrada do React └── styles.css # Estilos globais e Tailwind

markdown
Copy code

## 🛠️ Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (recomendado: v16 ou superior)
- **npm** ou **yarn**

## 📦 Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd front_usuarios
Instale as dependências:

bash
Copy code
npm install
# ou
yarn install
Inicie o servidor de desenvolvimento:

bash
Copy code
npm start
# ou
yarn start
Acesse no navegador:

arduino
Copy code
http://localhost:3000
🔑 Scripts Disponíveis
npm start: Inicia o servidor de desenvolvimento.
npm build: Cria a build de produção.
npm test: Roda os testes.
npm eject: Expõe as configurações de build (use com cuidado).
🖌️ Estilização
A estilização do projeto foi feita usando Tailwind CSS e ShadCN para componentes pré-construídos.

Configuração do Tailwind
O arquivo tailwind.config.js está configurado para oferecer suporte ao design responsivo e temas personalizados. Certifique-se de incluir os paths dos componentes para que o purge funcione corretamente.

📡 Integração com API
Para integrar com sua API, o projeto utiliza Axios. Substitua a URL base no arquivo correspondente para conectar com o backend.# gerenciador-usuarios
# gerenciador-usuarios
