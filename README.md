# Biblioteca de Livros

Este projeto é uma API para gerenciar uma biblioteca de livros, implementada com TypeScript, Express e TypeORM. A API permite realizar operações CRUD (Create, Read, Update, Delete) em uma base de dados de livros.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- MySQL (ou outro banco de dados compatível com TypeORM)

## Instalação

1. Clone este repositório:

   git clone https://github.com/seu-usuario/biblioteca-de-livros.git
   cd biblioteca-de-livros

2. Instale as dependências do projeto:

  npm install

3. Configure o banco de dados:

  Crie um banco de dados no MySQL (ou outro banco de dados compatível) e configure o arquivo ormconfig.json com suas credenciais e informações do banco de dados:

  Exemplo:
  {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "seu-usuario",
    "password": "sua-senha",
    "database": "biblioteca",
    "synchronize": true,
    "logging": false,
    "entities": ["src/entity/**/*.ts"]
  }

## Executando o Projeto

Compile o TypeScript:

npm run build

Inicie o servidor:

npm start
O servidor estará em execução em http://localhost:3000.

## Endpoints da API

Listar todos os livros

GET /books

Resposta:

[
  {
    "ISBN": "978-3-16-148410-0",
    "title": "Título do Livro",
    "author": "Nome do Autor",
    "year": 2023
  },
  ...
]

Obter um livro específico

GET /books/:ISBN
Parâmetros:

ISBN: ISBN do livro a ser obtido
Resposta:

{
  "ISBN": "978-3-16-148410-0",
  "title": "Título do Livro",
  "author": "Nome do Autor",
  "year": 2023
}


Criar um novo livro

POST /books
Corpo da requisição:

{
  "ISBN": "978-3-16-148410-0",
  "title": "Novo Livro",
  "author": "Autor Desconhecido",
  "year": 2023
}
Resposta:

{
  "ISBN": "978-3-16-148410-0",
  "title": "Novo Livro",
  "author": "Autor Desconhecido",
  "year": 2023
}

Atualizar um livro existente

PUT /books/:ISBN
Parâmetros:

ISBN: ISBN do livro a ser atualizado
Corpo da requisição:

{
  "title": "Livro Atualizado",
  "author": "Autor Atualizado",
  "year": 2024
}
Resposta:

{
  "ISBN": "978-3-16-148410-0",
  "title": "Livro Atualizado",
  "author": "Autor Atualizado",
  "year": 2024
}

Deletar um livro

DELETE /books/:ISBN
Parâmetros:

ISBN: ISBN do livro a ser deletado
Resposta:

{
  "message": "Book deleted"
}


## Testes
Você pode testar a API usando ferramentas como Insomnia ou Postman. Siga as instruções da seção anterior para configurar e enviar requisições para a API.