# Portfólio — Gabriel Passos

Site pessoal de portfólio, com apresentação profissional, experiência, projetos e formulário de contato.

🔗 Estrutura: Home, Sobre mim, Projetos (com página de detalhe por projeto) e Contato.

## Stack

- [Vue 3](https://vuejs.org/) (`<script setup>`) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`) + `@tailwindcss/typography`
- [@vueuse/core](https://vueuse.org/) e [@lucide/vue](https://lucide.dev/) (ícones)
- [Web3Forms](https://web3forms.com/) para envio do formulário de contato (sem back-end próprio)

## Estrutura do projeto

```
src/
├── assets/           # imagens, currículo em PDF e screenshots dos projetos
├── components/
│   ├── atoms/        # botão, badge, input, separador, etc.
│   ├── molecules/    # cards e itens compostos (ex: project-card, contact-banner)
│   └── organisms/    # header, layout, hero-banner, carousel
├── constants/        # rotas da aplicação
├── mock/             # dados estáticos de projetos e experiências profissionais
├── pages/            # home, about-me, contact, projects, project
├── router/           # configuração do vue-router
├── styles/           # estilos globais
├── types/            # tipagens (ex: Project)
└── utils/            # helpers (truncate, uuid)
```

Os projetos exibidos em "Projetos" são definidos em [src/mock/projects.ts](src/mock/projects.ts) e a experiência profissional em [src/mock/prefessional-exp.ts](src/mock/prefessional-exp.ts) — para atualizar o conteúdo do site, edite esses arquivos.

## Como rodar localmente

Pré-requisitos: Node.js e [Yarn](https://yarnpkg.com/) (o projeto usa `yarn.lock`).

```bash
yarn install
yarn dev
```

Outros scripts disponíveis:

```bash
yarn build     # type-check (vue-tsc) + build de produção
yarn preview   # serve o build de produção localmente
```

## Variáveis de ambiente

O formulário de contato usa o [Web3Forms](https://web3forms.com/) para envio de e-mails sem servidor próprio. Copie `env.example` para `.env` e informe sua chave pública:

```
VITE_WEB3FORMS_ACCESS_KEY=
```

A chave é obtida gratuitamente criando uma conta em [web3forms.com](https://web3forms.com).
