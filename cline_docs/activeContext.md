# Active Context: Excellent Evolution

## Current Work Focus
- UI/UX refinement and polish based on user feedback (landing page, dashboard)
- Memory Bank documentation update
- Completed migration from MariaDB to PostgreSQL for all backend operations (Neon SaaS for production)
- Authentication system migration: Clerk → NextAuth.js (custom registration & login flows)
- Assessment suite refactor: removed MBTI, Enneagram, StrengthsFinder; scaffolded required assessments per project brief
- Profile completion enforcement on first login/registration
- Navigation and user flow alignment with updated requirements
- Awaiting further direction for next feature development (calendar integration and Playwright testing remain postponed/paused)

## Recent Changes
- Migrated backend database from MariaDB to PostgreSQL 17 (schema, environment, and Prisma config updated; Neon SaaS for production)
- Migrated all AI features to Grok 3 Mini Beta via Vercel AI SDK (`@ai-sdk/xai`)
- Removed Clerk authentication and user management
- Implemented NextAuth.js for authentication (credentials provider, Prisma adapter)
- Added custom registration API route with password hashing
- Added custom login and registration forms (NextAuth.js flows)
- Updated landing page hero section:
  - New headline: "Unlock your Next Full Step"
  - Larger, centered subtitle: "powered by AI, driven by you"
  - Combined supporting text into a single paragraph
- Dashboard improvements:
  - Personalized welcome message ("Welcome {user.firstName}")
- General UI/UX refinements per iterative user feedback
- Committed and pushed all changes to remote repository
- **Assessment suite now matches project brief:** Big Five (OCEAN), 16PF, Holland Code (RIASEC), DiSC, TalentSmartEQ EI Appraisal, Career Values Scale
- **Removed MBTI, Enneagram, StrengthsFinder assessments and pages**
- **Scaffolded new assessment pages for all required types**
- **Prisma schema and client updated and synced for all required assessment types**
- **Profile completion is now enforced before dashboard access**
- **Navigation and user flow updated (Growth Center, profile logic, etc.)**

## Next Steps
- Implement assessment entry forms and API/database integration for all required assessments
- Continue UI/UX improvements based on user feedback
- Calendar check-in integration (Postponed)
- Implement remaining Playwright integration tests (Paused)

## Active Decisions and Considerations
- Decision: Use PostgreSQL 17 for all backend data storage (migrated from MariaDB)
- Decision: Use Grok 3 Mini Beta via Vercel AI SDK for all AI-powered features
- Decision: Use NextAuth.js for authentication and user management (replaces Clerk)
- Decision: Keep development plans as editable Markdown for flexibility
- Decision: Strictly follow project brief for assessment suite; remove non-required assessments
- Decision: Enforce profile completion before dashboard access
- Consideration: Balance between structure and customization in templates
- Decision: Use Playwright for integration testing (setup complete, implementation paused)
- Decision: Use direct Prisma Client access from Next.js backend instead of separate MCP server for database operations

## Important Patterns and Preferences
- Pattern: Separate data processing (markdown generator) from presentation (viewer)
- Preference: Reusable components for development plan sections
- Pattern: Use Playwright's global setup for authentication state management in tests

## Learnings and Insights
- PostgreSQL migration with Prisma is straightforward but requires privilege and schema adjustments
- Grok 3 Mini Beta via Vercel AI SDK provides a flexible, modern LLM integration path
- Clerk UserButton simplifies user profile and account management
- Iterative UI/UX feedback leads to a more polished, user-friendly product
- Markdown provides good balance of structure and flexibility for plans
- Users may want to customize generated plans while keeping core structure
- Playwright offers robust features for testing modern web apps (auto-waits, cross-browser)
- Keeping schema, client, and codebase in sync is critical for rapid iteration
- Enforcing user flow and profile completion improves onboarding and data quality