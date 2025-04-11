# System Patterns: Excellent Evolution

## System Architecture
- Single-page app with Next.js 15 (App Router) for frontend and server-side logic.
- Vercel-hosted with AI SDK integrating Grok 3 Mini Beta LLM for recommendations and chat.
- Client-side state management with React 19 hooks.

## Key Technical Decisions
- Next.js 15 for SSR and App Router, enhancing performance and routing.
- TypeScript for type-safe development across React 19 components.
- Shadcn UI/Radix UI with Tailwind CSS for reusable, styled components.
- Stack Auth for authentication, user management, and transactional email.
- Neon (managed Postgres) for all database operations, managed via Prisma ORM.

## Design Patterns in Use
- **Component-Based:** Reusable UI elements (e.g., score entry, gamification widgets)
- **Server Components:** Next.js 15 server-side rendering for initial loads
- **Event-Driven:**
  - Calendar check-ins trigger AI updates via Vercel AI SDK
  - Database changes handled within Next.js backend
- **Authentication:** Stack Auth for user authentication, session management, and transactional email (custom registration/login, user sync to Neon)
- **Database Access:**
  - Direct Prisma Client usage within Next.js API Routes/Server Actions
  - Connection pooling for performance (managed by Prisma Client)
  - Parameterized queries (handled by Prisma Client)

## Component Relationships
- Next.js Pages → React Components (Shadcn UI/Radix UI) → Tailwind CSS styling
- Vercel AI SDK (via `/api/ai/chat` and `/api/ai/refine-plan` routes) → Grok 3 Mini Beta LLM → `useAIRecommendations` hook → `AIChatInterface` component
- Stack Auth session → User profile/account management UI
- Calendar API → Next.js API Routes → User progress updates
- Next.js API Routes/Server Actions → Prisma Client → PostgreSQL

## Critical Implementation Paths
1. Auth setup with Stack Auth (user registration/login, transactional email, user sync to Neon) → Secure score storage → User profile/account management
2. Assessment score forms → LLM processing via Vercel AI SDK (Grok 3 Mini Beta) → Gamified/standard views
3. Calendar check-in scheduler → AI-driven prompts → Analytics refresh
4. User signup → Stack Auth welcome email → Engagement tracking
5. Database operations → Next.js API Routes/Server Actions → Prisma Client → Secure data access (Neon/Postgres)
6. AI Chat: `AIChatInterface` → `useAIRecommendations` hook → `/api/ai/chat` route → Vercel AI SDK → Grok 3 Mini Beta LLM → Streaming response