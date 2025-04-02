# Active Context: Excellent Evolution

## Current Work Focus
- Updating memory bank files for self-serve model under the name Excellent Evolution.
- Incorporating gamification and calendar check-ins into planning.

## Recent Changes
- Renamed product to Excellent Evolution from CareerCompass AI
- Shifted to fully self-serve platform, removing coach features
- Updated tech stack: TypeScript, React 19, Next.js 15 (App Router), Vercel AI SDK, Shadcn UI, Radix UI, Tailwind CSS, with Sonnet 3.7 LLM
- Added Clerk.com for authentication and Resend for transactional emails
- Added gamification view and future course affiliate plans
- Implemented MariaDB MCP server for secure database operations:
  - Parameterized query execution
  - Schema inspection tools
  - Connection pooling

## Next Steps
- Design gamification elements (e.g., levels, badges) for development view
- Prototype calendar check-in feature with Next.js and Vercel AI SDK
- Implement Clerk authentication flows and Resend email templates
- Explore Udemy affiliate integration feasibility
- Expand MCP server capabilities:
  - Assessment tracking
  - Progress analytics
  - Performance optimization

## Active Decisions and Considerations
- Decision: Remove coach features, focus on self-service with calendar support.
- Consideration: Balance gamification complexity with usability—start simple.

## Important Patterns and Preferences
- Preference for TypeScript for type safety in React 19/Next.js 15
- Pattern of using Vercel AI SDK for seamless LLM (Sonnet 3.7) integration
- Database access pattern:
  - Always use MCP server for security
  - Parameterized queries only
  - Connection pooling for performance

## Learnings and Insights
- Self-serve model simplifies scope but requires strong UX to guide users.
- Gamification could boost engagement but risks overcomplication—needs testing.