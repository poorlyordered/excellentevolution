# Tech Context: Excellent Evolution

## Technologies Used
- **Frontend:** React 19, Next.js 15 (App Router), TypeScript.
- **UI:** Shadcn UI, Radix UI, Tailwind CSS.
- **AI:** Vercel AI SDK with Grok 3 Mini Beta LLM (`@ai-sdk/xai`).
- **Auth:** Stack Auth for user authentication, profile management, and transactional email.
- **Hosting:** Vercel for deployment and scaling.
- **Database:**
  - Neon (managed Postgres) for all environments (production and development, with branching for local/dev)
  - Direct Prisma Client usage in Next.js backend
  - Prisma ORM for type-safe queries

## Development Setup
- Local dev: Node.js, Vercel CLI, TypeScript compiler, Neon (managed Postgres, dev branch)
- CI/CD: Vercel Git integration for auto-deploys.
- IDE: VS Code with TypeScript, ESLint, Tailwind extensions.
- **Environment Variables:** All environment variables are now managed in the project root using `.env`, `.env.local`, `.env.production`, and `.env.example`. All frontend/.env* files have been removed. Best practices are documented in `cline_docs/env-file-management-best-practices.md`.

## Technical Constraints
- Relies on external assessment platforms and affiliate links.
- Must optimize for mobile with Next.js 15 SSR and React 19.
- LLM (Grok 3 Mini Beta) performance tied to Vercel AI SDK limits.

## Dependencies
- External APIs: Google Calendar (check-ins), Udemy (future courses)
- Libraries:
  - Vercel AI SDK (`ai`, `@ai-sdk/xai`)
  - Radix UI primitives (`@radix-ui/react-slot`, `@radix-ui/react-scroll-area`)
  - Stack Auth SDK, Sonner (notifications), Lucide React (icons)
  - Neon/Postgres Node.js driver
  - Model Context Protocol SDK

## Tool Usage Patterns
- TypeScript for strict typing in React 19 components
- Vercel AI SDK (`streamText` with `xai` provider) for AI chat and plan refinement via API routes
- Vercel AI SDK (`useChat` hook) for managing chat state in the frontend
- Stack Auth session for user profile/account management
- Tailwind CSS for rapid, responsive styling with Shadcn UI
- **Testing:** Playwright for integration and end-to-end testing.