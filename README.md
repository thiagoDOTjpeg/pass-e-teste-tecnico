# To-Do List - Teste Técnico Full Stack

Aplicação de lista de tarefas (To-Do List) com CRUD completo, desenvolvida como parte de um teste técnico para a posição de Full Stack Developer.

## Tecnologias Utilizadas

### Backend

- **Laravel 12** - Framework PHP
- **PostgreSQL** - Banco de dados relacional
- **Laravel Sanctum** - Autenticação via tokens

### Frontend

- **React 19** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Inertia.js** - SPA sem API separada
- **Tailwind CSS + shadcn/ui** - Estilização

### DevOps

- **Docker & Docker Compose** - Containerização
- **Cypress** - Testes E2E

---

## Como Rodar o Projeto

### Com Docker Compose (Recomendado)

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/pass-e-teste-tecnico.git
cd pass-e-teste-tecnico
```

2. Suba os containers:

```bash
docker compose up -d --build
```

3. Acesse a aplicação:

```
http://localhost:8000
```

4. Acesso com os usuários padrões

```
email: teste@dasilva.com
senha: senha123
```

O Docker Compose irá automaticamente:

- Criar o banco PostgreSQL
- Gerar a `APP_KEY`
- Executar as migrations
- Iniciar o servidor Laravel

### Variáveis de Ambiente (Docker)

Você pode customizar as credenciais do banco via variáveis de ambiente:

```bash
DB_USER=meu_usuario DB_PASSWORD=minha_senha DB_NAME=meu_banco docker compose up -d --build
```

Valores padrão:
| Variável | Valor Padrão |
|----------|--------------|
| DB_USER | admin |
| DB_PASSWORD | admin123 |
| DB_NAME | passe_db |

---

### Desenvolvimento Local (Sem Docker)

#### Pré-requisitos

- PHP 8.2+
- Composer
- Node.js 18+
- PostgreSQL (ou SQLite)

#### Passos

1. Instale as dependências:

```bash
composer install
npm install
```

2. Configure o ambiente:

```bash
cp .env.example .env
```

3. Gere a chave de criptografia:

```bash
php artisan key:generate
```

4. Configure o banco de dados no `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=passe_db
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

Ou para SQLite:

```env
DB_CONNECTION=sqlite
DB_DATABASE=/caminho/absoluto/para/database.sqlite
```

Para subir o banco de dados via docker

```
docker compose up -d postgres-db
```

5. Execute as migrations:

```bash
php artisan migrate
```

6. Inicie o servidor de desenvolvimento:

```bash
# Terminal 1 - Backend
php artisan serve

# Terminal 2 - Frontend (Vite)
npm run dev
```

7. Acesse em `http://localhost:8000`

---

## Gerando APP_KEY Manualmente

A `APP_KEY` é necessária para criptografia de sessões e dados sensíveis.

```bash
# Gerar e salvar no .env automaticamente
php artisan key:generate

# Apenas exibir a chave (sem salvar)
php artisan key:generate --show
```

No Docker, a chave é gerada automaticamente ao iniciar o container.

---

## API REST

### Endpoints

| Método | Endpoint          | Descrição                 |
| ------ | ----------------- | ------------------------- |
| POST   | `/api/register`   | Criar conta               |
| POST   | `/api/login`      | Login (inicia sessão)     |
| POST   | `/api/logout`     | Logout                    |
| GET    | `/api/todos`      | Listar tarefas (paginado) |
| POST   | `/api/todos`      | Criar tarefa              |
| PUT    | `/api/todos/{id}` | Atualizar tarefa          |
| DELETE | `/api/todos/{id}` | Remover tarefa            |

### Autenticação

A API usa **Laravel Sanctum** com autenticação baseada em **cookies/sessions** (SPA mode).

O fluxo de autenticação:

1. Obtenha o CSRF token:

```
GET /sanctum/csrf-cookie
```

2. Faça login (as credenciais são armazenadas em cookie de sessão):

```
POST /api/login
Content-Type: application/json

{"email": "user@example.com", "password": "senha"}
```

3. As requisições subsequentes são autenticadas automaticamente via cookie.

### Parâmetros de Listagem (GET /api/todos)

| Parâmetro | Tipo | Descrição                  |
| --------- | ---- | -------------------------- |
| page      | int  | Página atual               |
| per_page  | int  | Itens por página (máx: 50) |
| completed | bool | Filtrar por status         |

Exemplo:

```
GET /api/todos?page=1&per_page=10&completed=true
```

### Validações

| Campo     | Regras                                  |
| --------- | --------------------------------------- |
| title     | Obrigatório, string, máx 120 caracteres |
| completed | Boolean                                 |

---

## Testes

### Testes de Feature (PHPUnit)

```bash
php artisan test

# Ou específico
php artisan test --filter=TodoControllerTest
```

### Testes E2E (Cypress)

```bash
# Com interface gráfica
npm run cypress:open

# Headless
npm run cypress:run
```

---

## Erros Comuns

### 1. "SQLSTATE[08006] Connection refused"

**Causa:** Banco de dados não acessível

**Solução:**

- Verifique se o PostgreSQL está rodando
- Confira as credenciais no `.env`
- No Docker, aguarde o healthcheck do banco:

```bash
docker compose logs postgres-db
```

---

### 2. "Vite manifest not found"

**Causa:** Assets do frontend não foram compilados

**Solução:**

```bash
npm run build
```

---

### 3. Container reiniciando em loop

**Causa:** Erro na inicialização

**Solução:**

```bash
# Ver logs
docker compose logs app

# Rebuild completo
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

---

### 5. Erro 500 genérico

**Causa:** Diversos

**Solução:**

```bash
# Ver logs detalhados
docker exec passe-app cat storage/logs/laravel.log | tail -50

# Ou localmente
tail -f storage/logs/laravel.log
```

---

## Estrutura do Projeto

```
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   └── TodoController.php
│   │   └── Requests/
│   │       └── TodoRequest.php
│   └── Models/
│       ├── Todo.php
│       └── User.php
├── resources/js/
│   ├── components/      # Componentes React reutilizáveis
│   ├── pages/           # Páginas da aplicação
│   └── types/           # Tipos TypeScript
├── routes/
│   ├── api.php          # Rotas da API
│   └── web.php          # Rotas web (Inertia)
├── tests/
│   └── Feature/
│       ├── AuthControllerTest.php
│       └── TodoControllerTest.php
├── docker-compose.yml
├── Dockerfile
└── .dockerignore
```

---

## Funcionalidades

### Implementadas (Requisitos)

- [x] CRUD completo de tarefas
- [x] Paginação com `page` e `per_page`
- [x] Filtro por status (`completed`)
- [x] Ordenação por mais recentes
- [x] Validações com mensagens de erro
- [x] Status codes corretos (200, 201, 404, 422)
- [x] Testes de feature (PHPUnit)

### Bônus

- [x] Docker Compose (app + PostgreSQL)
- [x] Autenticação com Sanctum
- [x] Interface moderna com shadcn/ui
- [x] TypeScript no frontend
- [x] Testes E2E com Cypress
- [x] Confirmação ao remover tarefa

---
