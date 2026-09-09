# Rede Social Pet 🐾

Rede social com foco em pets, desenvolvida como entrega do **Desafio 1 (Full Stack — nível iniciante)** da trilha de estágio do Atlântico.

Aplicação full-stack completa: os usuários criam um perfil, publicam posts sobre seus pets, curtem e comentam publicações, seguem outros usuários, buscam pessoas e posts, recebem notificações de atividades e conversam por chat privado.

## 🧱 Stack

**Frontend**
- React 19 + Vite 7
- React Router 7
- Axios
- React Hook Form
- Bootstrap 5

**Backend**
- Node.js + Express 5
- Prisma 6 (ORM)
- PostgreSQL
- JWT + bcryptjs (autenticação)

## 📁 Estrutura

```
rede-social-pet/
├── backend/          # API REST (Express + Prisma)
│   ├── prisma/       # schema.prisma + migrations
│   └── src/
│       ├── controllers/  # lógica das requisições
│       ├── models/       # acesso ao banco via Prisma
│       ├── routes/       # definição dos endpoints
│       ├── middlewares/  # authMiddleware (JWT)
│       └── app.js        # configuração do Express
└── frontend/         # SPA em React
    └── src/
        ├── pages/        # telas
        ├── components/   # componentes reutilizáveis
        ├── services/     # camada de chamadas à API (axios)
        └── contexts/     # AuthContext
```

O backend segue um padrão em camadas repetível: **route → controller → model**.

## 🚀 Como rodar

### Pré-requisitos
- Node.js 18+
- PostgreSQL rodando em `localhost:5432`

### 1. Configurar variáveis de ambiente

Copie os exemplos e preencha:

```bash
# backend
cp backend/.env.example backend/.env
#   DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/rede_social_pet?schema=public"
#   JWT_SECRET="uma-string-secreta"

# frontend
cp frontend/.env.example frontend/.env
#   VITE_API_URL=http://localhost:3000
#   VITE_TOKEN_KEY=rede_social_pet_token
#   VITE_USER_KEY=rede_social_pet_user
```

### 2. Backend

```bash
cd backend
npm install
npx prisma migrate dev     # cria o banco + aplica as migrations (e roda o seed)
npm run seed               # (opcional) popula/reseta os dados de demonstração
npm run dev                # http://localhost:3000
```

> O `npm run seed` popula o banco com dados de exemplo (usuários, posts, curtidas,
> comentários, seguidores, notificações e chat). Contas criadas — senha `123456`:
> `ana@latidos.com`, `beto@latidos.com`, `carla@latidos.com`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev                # http://localhost:5173
```

## ✨ Funcionalidades

- ✅ **Cadastro e login** com autenticação via JWT
- ✅ **Perfil** de usuário com foto, bio e contato
- ✅ **Posts** com texto, imagem e vídeo
- ✅ **Curtidas e comentários** nas publicações
- ✅ **Feed** com abas *Todos* e *Seguindo*
- ✅ **Seguir** outros usuários
- ✅ **Busca** de usuários e posts (por texto ou `#hashtag`)
- ✅ **Notificações** de curtidas, comentários e novos seguidores
- ✅ **Chat privado** entre usuários

## 📝 Observações

- O banco usa **PostgreSQL** (mesma categoria relacional de MySQL, sugerido no desafio).
- O CLI do Prisma está fixado na **v6** para casar com o `@prisma/client` (evitando o breaking change da v7).
- O projeto reaproveitou a base de uma aplicação de adoção própria, evoluída e enxugada para uma rede social.
