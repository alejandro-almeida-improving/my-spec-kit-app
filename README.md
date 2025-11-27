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
/speckit.specify Quiero construir una aplicación que ofrezca herramientas para mejorar la productividad de los desarrolladores, cada herramienta tendrá su propia pagina. La lista de herramientas es:

- Case Converter: Transformación de texto simple (lowercase, uppercase, title case, y camelCase).
- UUID Generator: Generación de identificadores únicos.
- Base64 Converter: Codificación y decodificación estándar.
- URL Encoder: Uso de funciones nativas como encodeURIComponent.
- Timestamp: Conversión de fechas (Unix timestamp a legible y viceversa).
- Hash Generator: Uso de librerías criptográficas estándar (MD5, SHA).
- Lorem Generator: Generación de texto aleatorio desde un banco de palabras.
- Number Base Converter: Conversión matemática entre bases (binario, hex, octal, y decimal).
```

### Clarify underspecified areas

```
/speckit.clarify
```

### Create a technical implementation plan

```
/speckit.plan Usaremos los componentes de shadcn para construir la app.
```

### Break down into tasks

```
/speckit.tasks
```

### Execute implementation

```
/speckit.implement
```
