# System Patterns: Excellent Evolution

## System Architecture
- Single-page app with Next.js 15 (App Router) for frontend and server-side logic.
- Vercel-hosted with AI SDK integrating Sonnet 3.7 LLM for recommendations.
- Client-side state management with React 19 hooks.

## Key Technical Decisions
- Next.js 15 for SSR and App Router, enhancing performance and routing.
- TypeScript for type-safe development across React 19 components.
- Shadcn UI/Radix UI with Tailwind CSS for reusable, styled components.

## Design Patterns in Use
- **Component-Based:** Reusable UI elements (e.g., score entry, gamification widgets)
- **Server Components:** Next.js 15 server-side rendering for initial loads
- **Event-Driven:**
  - Calendar check-ins trigger AI updates via Vercel AI SDK
  - Database changes trigger MCP server events
- **Authentication:** Clerk.com for user auth with Next.js middleware integration
- **Email:** Resend for transactional emails with React email templates
- **Database Access:**
  - MCP server for secure database operations
  - Connection pooling for performance
  - Parameterized queries for security

## Component Relationships
- Next.js Pages → React Components (Shadcn UI/Radix UI) → Tailwind CSS styling
- Vercel AI SDK → Sonnet 3.7 LLM → Client-side recommendation display
- Calendar API → Next.js API Routes → User progress updates
- MCP Server → MariaDB → Prisma ORM → Type-safe database operations

## Critical Implementation Paths
1. Auth setup with Clerk.com → Next.js middleware → Secure score storage
2. Assessment score forms → LLM processing via Vercel AI SDK → Gamified/standard views
3. Calendar check-in scheduler → AI-driven prompts → Analytics refresh
4. User signup → Resend welcome email → Engagement tracking
5. Database operations → MCP server → Parameterized queries → Secure data access