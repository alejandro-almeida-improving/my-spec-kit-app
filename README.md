This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Spec Kit commands

The following commands were used with Spec Kit during the development of this project:

### Establish project principles

```
/speckit.constitution Voy a crear una web estática con Next.js. Sigue los Next.js coding guidelines. Usare Shadcn y Tailwind CSS. Solo usare Playwright para testing; y se crearan los tests después de la implementación. No usaremos CI.
```

### Create the spec

```
/speckit.specify Me gustaría crear una pagina muy parecida a la de Netflix pero usando los componentes de Shadcn. Esta es la pagina de Netflix: https://www.netflix.com/mx-en/browse/genre/34399. Usa el MCP de Playwright para revisar la pagina. Usa el MCP de Shadcn para instalar los componentes que necesites.

Descarga las imágenes de la pagina; ademas ten en cuenta que cada sección usa un Carousel para mostrar las películas.
```

### Clarify underspecified areas (recommended before `/speckit.plan`)

```
/speckit.clarify
```

### Create a technical implementation plan

```
/speckit.plan
```

### Break down into tasks

```
/speckit.tasks
```

### Execute implementation

```
/speckit.implement
```
