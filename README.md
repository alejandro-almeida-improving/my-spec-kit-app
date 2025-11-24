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

## Development Guidelines

### Static-First Next.js
This project targets a static Next.js delivery. Prefer Server Components, declare metadata such as `export const revalidate`/`dynamicParams` when deviating from default static rendering, and keep client-only logic isolated to the minimal set of components that truly need interactivity. Follow the App Router best practices for layouts, caching, and data fetching to keep the site pre-renderable.

### Tailwind + Shadcn Styling
All UI work extends the existing Tailwind configuration and the Shadcn component set. Avoid introducing other CSS frameworks; use the shared theme tokens for spacing, typography, and color so the catalog appearance remains cohesive. When custom components are necessary, wrap or extend the Shadcn primitives so they remain consistent.

### Testing & Manual Verification
Playwright is the sole automation harness. Create Playwright suites after the UI implementation is feature-complete, cover the primary user journeys, and execute the tests locally (e.g., `npx playwright test`). Because there is no CI, every change should also document the manual lint/build/test commands that were run so reviewers can see how the work was validated.

### Manual Verification Log
Record your local verification results below or in a linked doc so the “no CI” policy is traceable. Replace the placeholder rows with real dates and outcomes.

| Date | Command | Result | Notes |
| --- | --- | --- | --- |
| 2025-11-24 | `npm run lint` | ✅ | Explain what passed or if there were warnings |
| 2025-11-24 | `npm run build` | ✅ | |
| 2025-11-24 | `npx playwright test` | ✅ | |

## Spec Kit commands

The following commands were used with Spec Kit during the development of this project:

### Establish project principles

```
/speckit.constitution Voy a crear una web estática con Next.js. Sigue los Next.js coding guidelines. Usare Shadcn y Tailwind CSS. Solo usare Playwright para testing; y se crearan los tests después de la implementación. No usaremos CI.
```

### Create the spec

```
/speckit.specify Quiero que diseñes una **página web tipo Netflix** para mostrar un catálogo de películas. La página debe ser atractiva, moderna.

Elementos que debe incluir:

1. **Encabezado / Header**  
   - Logo (puede ser ficticio)  
   - Barra de navegación mínima ("Inicio", "Películas", "Series", "Mi lista")  
   - Icono de usuario (perfil)  
   - Barra de búsqueda para buscar títulos  

2. **Sección principal ("Hero")**  
   - Un carrusel / slider grande (full-width) con entre 3 y 5 películas destacadas  
   - Cada slide debe mostrar el póster de la película, el título y una breve descripción (o tagline)  
   - Flechas para navegar ("anterior" / "siguiente") y también puntos o miniaturas para indicar el slide actual  
   - Opción para pausar la rotación automática (o que no rote automáticamente): permitir que el usuario controle el slider.  

3. **Catálogo de películas en carruseles**  
   - Debe haber múltiples filas (carouseles) con diferentes "categorías": por ejemplo, "Tendencias", "Nuevas", "Acción", "Comedia", etc.  
   - Cada carrusel debe mostrar miniaturas (posters pequeños) de películas, con scroll horizontal  
   - Cada miniatura debe tener al menos: la imagen (poster), el nombre de la película, y al pasar el mouse (hover) o al tocar (en dispositivos móviles) debería aparecer un botón (o overlay) para "Ver más" o "Agregar a mi lista"  

4. **Página de detalle de película**  
   - Cuando el usuario hace clic en una película, se abre una página con el detalle de la pelicula, pero por el momento no se implementara.

5. **Pie de página (footer)**  
   - Enlaces útiles (Ayuda, Términos, Privacidad)  
   - Redes sociales  
   - Copyright (ficticio)

6. **Diseño visual y experiencia de usuario**  
   - Usar un estilo oscuro / tema típico de streaming ("dark mode") para dar ese look de Netflix  
   - Transiciones suaves entre slides del carrusel  
   - Asegurarse de que el carrusel sea accesible (navegación por teclado, lectores de pantalla) y que no cause problemas de usabilidad. Por ejemplo, permitir que el usuario navegue con flechas o pagine manualmente.
```

### Create a technical implementation plan

```
/speckit.plan No necesitamos implementar ningún backend. Puedes usar el siguiente mockup de ejemplo: `mockups/netflix-movies.png`. Utiliza la librería `swiper` para mostrar las películas. Las imágenes de las películas están en: `public/images/movies/movie-*.jpg`.
```

### Break down into tasks

```
/speckit.tasks
```
