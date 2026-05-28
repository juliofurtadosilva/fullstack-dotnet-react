# Desafio Fullstack .NET + React

Aplicacao simples de gerenciamento de tarefas com API REST em .NET/C#,
persistencia em SQLite e interface React.

## Funcionalidades

- Criar tarefa
- Listar tarefas
- Atualizar tarefa
- Alterar status da tarefa
- Filtrar tarefas por status
- Excluir tarefa
- Impedir edicao de tarefas concluidas pela interface e pela API

## Stack

- Backend: .NET 9, ASP.NET Core, Entity Framework Core, SQLite
- Frontend: React, Axios

## Como executar

### Backend

```bash
cd desafio.API
dotnet restore
dotnet run
```

A API inicia em `http://localhost:5000`. O arquivo SQLite `tasks.db` e criado
automaticamente na primeira execucao.

### Frontend

Em outro terminal:

```bash
cd desafio-ui
npm install
npm start
```

O React inicia em `http://localhost:3000` e consome a API em
`http://localhost:5000/tasks`.

Tambem existe o comando `npm run start:full` dentro de `desafio-ui` para subir
React e API ao mesmo tempo.

Se precisar usar outra URL para a API, crie `desafio-ui/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/tasks
```

## Endpoints

### `POST /tasks`

Cria uma tarefa. `createdAt` e `updatedAt` sao gerados pelo backend.

```json
{
  "title": "Preparar teste tecnico",
  "description": "Finalizar fluxo completo",
  "status": "pending"
}
```

### `GET /tasks`

Lista todas as tarefas.

### `GET /tasks?status=pending`

Filtra tarefas por status. Valores aceitos:

- `pending`
- `in_progress`
- `done`

### `PUT /tasks/{id}`

Atualiza titulo, descricao e status de uma tarefa ainda nao concluida.

```json
{
  "title": "Preparar teste tecnico",
  "description": "Validar backend e frontend",
  "status": "in_progress"
}
```

### `DELETE /tasks/{id}`

Remove uma tarefa.

## Estrutura

```text
desafio.API/
  Controllers/
  Data/
  Dtos/
  Models/
  Validation/
desafio-ui/
  src/
    api/
    components/
    constants/
    hooks/
```

## Validacoes e erros

- `title` e obrigatorio e possui limite de 120 caracteres.
- `description` possui limite de 1000 caracteres.
- `status` aceita apenas `pending`, `in_progress` ou `done`.
- Recursos inexistentes retornam `404`.
- Dados invalidos retornam `400`.
- Erros inesperados retornam `500` com resposta `application/problem+json`.

## Versionamento no GitHub

```bash
git init
git add .
git commit -m "Implementa gerenciador de tarefas"
git branch -M main
git remote add origin <url-do-repositorio>
git push -u origin main
```
