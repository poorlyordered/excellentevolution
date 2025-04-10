# ExcellentEvolution AI Coaching Platform Rules

## Core Principles
1. Maintain Memory Bank integrity through strict documentation
2. Follow Next.js 14/15 best practices with App Router  
3. Implement MariaDB security best practices  
4. Use Zustand for global state management  
5. Enforce TypeScript strict mode  

## Development Process Rules
### General Workflow
- After making changes, ALWAYS start up a new server for testing
- Always look for existing code to iterate on first
- Avoid drastic pattern changes without first iterating on existing ones
- Kill all related servers before starting new ones
- Always prefer simple solutions
- Avoid code duplication by checking for existing similar functionality
- Write code that accounts for dev, test, and prod environments
- Only make changes that are requested or clearly understood
- When fixing bugs, exhaust existing patterns before introducing new ones
- Remove old implementations when introducing new patterns
- Keep the codebase clean and organized
- Avoid one-time scripts in files
- Refactor files exceeding 200-300 lines
- Only mock data for tests, never for dev/prod
- Never add fake data patterns to dev/prod code
- Never overwrite .env files without confirmation
- Focus only on code relevant to the task
- Write thorough tests for major functionality
- Avoid major architectural changes to working features
- Consider impact on other code areas when making changes

### Analysis Process
1. **Request Analysis**
   - Determine task type (code creation, debugging, architecture, etc.)
   - Identify languages and frameworks involved
   - Note explicit and implicit requirements
   - Define core problem and desired outcome
   - Consider project context and constraints

2. **Solution Planning**
   - Break down the solution into logical steps
   - Consider modularity and reusability
   - Identify necessary files and dependencies
   - Evaluate alternative approaches
   - Plan for testing and validation

3. **Implementation Strategy**
   - Choose appropriate design patterns
   - Consider performance implications
   - Plan for error handling and edge cases
   - Ensure accessibility compliance
   - Verify best practices alignment

## Code Style and Structure
### General Principles
- Write concise, readable TypeScript code
- Use functional and declarative programming patterns
- Follow DRY (Don't Repeat Yourself) principle
- Implement early returns for better readability
- Structure components logically: exports, subcomponents, helpers, types

### Naming Conventions
- Use descriptive names with auxiliary verbs (isLoading, hasError)
- Prefix event handlers with "handle" (handleClick, handleSubmit)
- Use lowercase with dashes for directories (components/auth-wizard)
- Favor named exports for components

### TypeScript Usage
- Use TypeScript for all code
- Prefer interfaces over types
- Avoid enums; use const maps instead
- Implement proper type safety and inference
- Use `satisfies` operator for type validation

## Tech Stack
- **Frontend**: Next.js 14/15 (App Router) with TypeScript  
- **Database**: MariaDB with TypeORM  
- **Auth**: JWT with role-based access  
- **State**: Zustand stores  
- **Styling**: Tailwind CSS + Shadcn/ui  
- **AI**: OpenAI GPT-4 API  

## React 19 and Next.js 15 Best Practices
### Component Architecture
- Favor React Server Components (RSC) where possible
- Minimize 'use client' directives
- Implement proper error boundaries
- Use Suspense for async operations
- Optimize for performance and Web Vitals

### State Management
- Use `useActionState` instead of deprecated `useFormState`
- Leverage enhanced `useFormStatus` with new properties (data, method, action)
- Implement URL state management with 'nuqs'
- Minimize client-side state

### Async Request APIs
```typescript
// Always use async versions of runtime APIs
const cookieStore = await cookies()
const headersList = await headers()
const { isEnabled } = await draftMode()

// Handle async params in layouts/pages
const params = await props.params
const searchParams = await props.searchParams
```

## Architectural Patterns
### Data Flow
1. User Input → API Routes → AI Processing  
2. Assessment Results → Zustand Store → Plan Generation  
3. Versioned Plans → Historical Tracking → Progress Analysis  

### MariaDB Integration
- Implement MySQL roles/grants for access control  
- Use TypeORM with TypeScript entities  
- Follow prepared statements for all queries  
- Enable strict mode in my.cnf  
- Use connection pooling with max limits  
- Implement query logging for security audits  
- Set up automated backups with point-in-time recovery  

## Database Security
1. Separate user accounts per service tier  
2. Encrypt sensitive columns using AES-256  
3. Regular privilege audits with mysql_secure_installation  
4. Implement fail2ban for brute force protection  
5. Use SSL for all database connections  

## Documentation Requirements
### Mandatory Files
```
cline_docs/
├── productContext.md
├── techContext.md
├── systemPatterns.md
├── activeContext.md
└── progress.md
```

### Update Triggers
- Major architectural changes  
- Technology stack updates  
- Phase transitions  
- Security model modifications  

## Security Protocols
1. JWT validation for all API routes  
2. Session management through httpOnly cookies  
3. Quarterly security audits  
4. Automated dependency scanning  

## Testing Requirements
- Unit tests for Zustand stores  
- Integration tests for AI workflows  
- E2E tests for auth flows  
- Performance testing for plan generation  

## Git Practices
```bash
# Commit Message Structure
feat: MariaDB SetUp
fix: Resolve session hydration issue
refactor: Migrate to App Router structure
docs: Update Memory Bank documentation
