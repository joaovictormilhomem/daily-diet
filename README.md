# Daily Diet - Projeto Fullstack

Projeto desenvolvido para a disciplina Programação Web II.

O objetivo da aplicação é permitir que um usuário registre refeições do dia a dia
e acompanhe se está seguindo a dieta. O sistema é composto por um **backend em Node.js**
e um **frontend em React**, totalmente integrados.

---

## Funcionalidades Atendidas

- Criar usuário e autenticar via token
- Registrar refeições com:
  - Nome
  - Descrição
  - Data e hora
  - Indicador se está dentro da dieta
- Listar refeições do usuário
- Visualizar uma refeição específica
- Editar uma refeição
- Excluir uma refeição
- Métricas:
  - Total de refeições
  - Total dentro da dieta
  - Total fora da dieta
  - Melhor sequência dentro da dieta
- Permissões aplicadas (cada usuário vê somente suas refeições)

---

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- SQLite
- JSON Web Token para autenticação

### Frontend
- React + Vite
- Axios
- React Router DOM

---

## Como Executar o Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm start
```

O backend estará rodando em:
```
http://localhost:3333
```

---

## Como Executar o Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse no navegador:
```
http://localhost:5173
```

---

## Login e Uso

1. Crie um usuário em `/register` pela interface do frontend.
2. Faça login.
3. Acesse a lista de refeições e registre novas entradas.

---

## Estrutura do Banco de Dados (Prisma)

```prisma
model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  password  String
  meals     Meal[]
}

model Meal {
  id          String   @id @default(uuid())
  name        String
  description String?
  datetime    DateTime
  inDiet      Boolean
  userId      String
  user        User     @relation(fields: [userId], references: [id])
}
```

---

## Autor

- Nome: João Victor Rocha Milhomem
- Curso: Análise e Desenvolvimento de Sistemas
- Disciplina: Programação Web II
- Professor: Bruno Bandeira Fernandes