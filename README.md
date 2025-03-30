# 🧱 TypeScript REST API Boilerplate

A clean and minimal boilerplate for building RESTful APIs with TypeScript, Prisma, Joi, and best practices out of the box.

## ✨ Features

- ⚡ **Fast setup** – Ready-to-use REST API structure
- 🧬 **Prisma ORM** – For modern and type-safe database interaction
- ✅ **Joi Validation** – Request data validation made easy
- 📦 **Docker Compose** – Spin up a local database in seconds
- 🎯 **TypeScript** – Fully typed codebase for better developer experience
- 🧹 **ESLint & Prettier** – For consistent code formatting and linting

---

## 📁 Project Structure

```bash
API-BOILERPLATE
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   └── template.ts
│   ├── middlewares/
│   │   └── validate.ts
│   ├── routers/
│   │   ├── index.ts
│   │   └── template.ts
│   ├── schemas/
│   │   └── template.ts
│   ├── services/
│   │   ├── index.ts
│   │   └── template.ts
│   └── types/
│       └── template.ts
├── .env.example
├── docker-compose.yml
├── eslint.config.mjs
├── .prettierrc
├── .prettierignore
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ts-rest-api-boilerplate.git
cd ts-rest-api-boilerplate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and set your database URL:

```bash
cp .env.example .env
```

Edit .env and fill in your credentials

---

## 🐳 Optional: Start Dev Database with Docker

Make sure Docker is installed, then spin up the local database:

```bash
npm run start:db
```

To manage the container:

- 🔄 Restart: `npm run db:restart`
- 📜 Logs: `npm run db:logs`
- 🛑 Stop: `npm run db:stop`
- 📊 Status: `npm run db:ps`

---

## 🔧 Scripts

| Script       | Description                              |
| :----------- | :--------------------------------------- |
| `dev`        | Start development server with hot-reload |
| `build`      | Compile TypeScript with `tsup`           |
| `start`      | Run the built JavaScript code            |
| `lint`       | Run ESLint to check code quality         |
| `lint:fix`   | Automatically fix ESLint issues          |
| `db:start`   | Start Docker dev database                |
| `db:stop`    | Stop Docker database                     |
| `db:logs`    | View Docker container logs               |
| `db:restart` | Restart the Docker container             |
| `db:ps`      | Show running Docker services             |

---

## 📚 Stack Overview

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Joi](https://www.joi.dev/)
- [ESLint](https://eslint.org/)
- [Docker](https://docs.docker.com/get-started/get-docker/)

---

## 📝 License

MIT © [Gregory Letourneur](https://github.com/GregLtrnr)
