# Tech Context: Excellent Evolution

## Technologies Used
- **Frontend:** React 19, Next.js 15 (App Router), TypeScript.
- **UI:** Shadcn UI, Radix UI, Tailwind CSS.
- **AI:** Vercel AI SDK with Grok 3 Mini Beta LLM (`@ai-sdk/xai`).
- **Auth:** Clerk.com for user authentication and profile management (UserButton).
- **Email:** Resend for transactional emails
- **Hosting:** Vercel for deployment and scaling.
- **Database:**
  - PostgreSQL 17 for local development and production
  - Direct Prisma Client usage in Next.js backend
  - Prisma ORM for type-safe queries

## Development Setup
- Local dev: Node.js, Vercel CLI, TypeScript compiler, PostgreSQL 17
- CI/CD: Vercel Git integration for auto-deploys.
- IDE: VS Code with TypeScript, ESLint, Tailwind extensions.

## Technical Constraints
- Relies on external assessment platforms and affiliate links.
- Must optimize for mobile with Next.js 15 SSR and React 19.
- LLM (Grok 3 Mini Beta) performance tied to Vercel AI SDK limits.

## Dependencies
- External APIs: Google Calendar (check-ins), Udemy (future courses)
- Libraries:
  - Vercel AI SDK (`ai`, `@ai-sdk/xai`)
  - Radix UI primitives (`@radix-ui/react-slot`, `@radix-ui/react-scroll-area`)
  - Clerk React (UserButton), Resend SDK, Sonner (notifications), Lucide React (icons)
  - PostgreSQL Node.js driver
  - Model Context Protocol SDK

## Tool Usage Patterns
- TypeScript for strict typing in React 19 components
- Vercel AI SDK (`streamText` with `xai` provider) for AI chat and plan refinement via API routes
- Vercel AI SDK (`useChat` hook) for managing chat state in the frontend
- Clerk UserButton for user profile/account management
- Tailwind CSS for rapid, responsive styling with Shadcn UI
- **Testing:** Playwright for integration and end-to-end testing.