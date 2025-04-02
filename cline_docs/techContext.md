# Tech Context: Excellent Evolution

## Technologies Used
- **Frontend:** React 19, Next.js 15 (App Router), TypeScript.
- **UI:** Shadcn UI, Radix UI, Tailwind CSS.
- **AI:** Vercel AI SDK with Sonnet 3.7 LLM.
- **Auth:** Clerk.com for user authentication
- **Email:** Resend for transactional emails
- **Hosting:** Vercel for deployment and scaling.
- **Database:**
  - MariaDB 10.11 for local development
  - MCP Server for secure database interactions
  - Prisma ORM for type-safe queries

## Development Setup
- Local dev: Node.js, Vercel CLI, TypeScript compiler.
- CI/CD: Vercel Git integration for auto-deploys.
- IDE: VS Code with TypeScript, ESLint, Tailwind extensions.

## Technical Constraints
- Relies on external assessment platforms and affiliate links.
- Must optimize for mobile with Next.js 15 SSR and React 19.
- LLM (Sonnet 3.7) performance tied to Vercel AI SDK limits.

## Dependencies
- External APIs: Google Calendar (check-ins), Udemy (future courses)
- Libraries:
  - Vercel AI SDK, Radix UI primitives, Clerk React, Resend SDK
  - MariaDB Node.js driver
  - Model Context Protocol SDK

## Tool Usage Patterns
- TypeScript for strict typing in React 19 components
- Vercel AI SDK for prompting Sonnet 3.7 with assessment data
- Tailwind CSS for rapid, responsive styling with Shadcn UI
- MCP tools for secure database operations:
  - execute_query: Parameterized SQL execution
  - get_tables: Schema inspection
  - get_table_columns: Table structure analysis