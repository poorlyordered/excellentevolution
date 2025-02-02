# System Patterns

## Authentication and User Management
- Using Clerk for authentication and user management
- Email/password authentication enabled
- Social authentication providers can be added as needed

### Webhook Configuration
1. Clerk Webhook Setup:
   - Go to Clerk Dashboard > Webhooks
   - Create a new webhook endpoint: `{your-domain}/api/webhooks/clerk`
   - Copy the signing secret and add it to `.env.local`:
     ```
     CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
     ```
   - Subscribe to the following events:
     * user.created
     * user.updated
     * user.deleted

2. Webhook Security:
   - All webhooks are verified using Svix for signature validation
   - Environment variables are validated using Zod
   - Comprehensive error handling and logging implemented

3. Webhook Event Handling:
   - Welcome email sent on user creation
   - Events are validated before processing
   - Type-safe payload handling with Zod schemas

## Email System
- Using Resend for transactional emails
- React Email for email templates
- Email templates located in `src/emails/`
- Emails sent asynchronously to prevent blocking

## Database
- MariaDB for data storage
- Prisma as ORM
- Type-safe database queries
- Migrations managed through Prisma

## API Structure
- Next.js App Router for API routes
- API routes in `src/app/api/`
- RESTful endpoints
- Type-safe request/response handling

## Frontend Architecture
- Next.js for server-side rendering
- React for UI components
- Tailwind CSS for styling
- TypeScript for type safety

## Error Handling
- Centralized error handling
- Structured error responses
- Comprehensive error logging
- User-friendly error messages

## Security
- CSRF protection through Clerk
- Input validation using Zod
- Secure headers
- Environment variable validation
- Webhook signature verification

## Development Workflow
1. Local development setup:
   ```bash
   npm install
   npm run dev
   ```

2. Environment Configuration:
   - Copy `.env.example` to `.env.local`
   - Add required environment variables
   - Never commit sensitive values

3. Code Quality:
   - ESLint for code linting
   - Prettier for code formatting
   - TypeScript for type checking
   - Husky for pre-commit hooks

4. Testing:
   - Jest for unit tests
   - React Testing Library for component tests
   - API integration tests
   - E2E tests with Cypress
