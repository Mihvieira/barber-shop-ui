# Barber Shop UI

Este é o projeto **Barber Shop UI**, uma aplicação frontend desenvolvida em **Angular 19** para gerenciar agendamentos, clientes e serviços de uma barbearia. A aplicação utiliza o Angular Material para componentes visuais e segue boas práticas de desenvolvimento com TypeScript.

## Tecnologias Utilizadas

- **Angular 19**: Framework principal para desenvolvimento frontend.
- **Angular Material**: Biblioteca de componentes UI para Angular.
- **TypeScript**: Linguagem de programação utilizada no projeto.
- **RxJS**: Biblioteca para programação reativa.
- **Bootstrap**: Estilização adicional.
- **SCSS**: Pré-processador CSS para estilização.

## Funcionalidades

- **Gerenciamento de Clientes**:
  - Cadastro, edição e exclusão de clientes.
  - Visualização de detalhes do cliente.

- **Agendamentos**:
  - Criação de agendamentos para clientes.
  - Visualização de agendamentos no formato de calendário e agenda.

- **Serviços**:
  - Listagem de serviços disponíveis na barbearia.

- **Configurações**:
  - Gerenciamento de horários de funcionamento e outros ajustes.

## Estrutura do Projeto

A estrutura do projeto segue a organização padrão do Angular:
```
src/ ├── app/ │ ├── components/ # Componentes da aplicação │ ├── models/ # Modelos de dados │ ├── service/ # Serviços para comunicação com a API │ ├── app.component.ts # Componente raiz │ ├── app.routes.ts # Configuração de rotas │ └── app.config.ts # Configuração da aplicação ├── environments/ # Configurações de ambiente ├── styles.scss # Estilos globais └── main.ts # Arquivo principal de bootstrap
```

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 18 ou superior)
- **Angular CLI** (versão 19 ou superior)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/barber-shop-ui.git
   cd barber-shop-ui
   ```

2. Instale as dependências:
```
npm install
```

3. Inicie o servidor de desenvolvimento:
```
npm start
```

4. Acesse a aplicação no navegador:
```
http://localhost:4200
```

## Configuração de Ambiente
Os arquivos de configuração de ambiente estão localizados na pasta src/environments. Por padrão, a aplicação utiliza o arquivo environment.ts para desenvolvimento.

Exemplo de Configuração:
```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
};
```
## Scripts Disponíveis
* npm start: Inicia o servidor de desenvolvimento.
* npm build: Gera a build de produção.
* npm test: Executa os testes unitários.

## Contribuição
Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
```
git checkout -b minha-feature
```
3. Faça as alterações e commit:
```
git commit -m "Minha nova feature"
```
4. Envie suas alterações:
```
git push origin minha-feature
```
5. Abra um Pull Request.

