# System Patterns

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

### Database Security
1. Separate user accounts per service tier  
2. Encrypt sensitive columns using AES-256  
3. Regular privilege audits with mysql_secure_installation  
4. Implement fail2ban for brute force protection  
5. Use SSL for all database connections  

## Authentication and User Management
- Using Clerk for authentication and user management
- Email/password authentication enabled
- Social authentication providers can be added as needed

### Webhook Configuration
1. Local Development Webhook Setup:
   - Install ngrok globally: `npm install -g ngrok`
   - Start the webhook server:
     ```bash
     cd webhook-server
     npm run dev
     ```
   - Start ngrok tunnel:
     ```bash
     ngrok http 3001
     ```
   - Use the generated ngrok URL (e.g., https://xxxx-xx-xx-xxx-xx.ngrok-free.app/webhook) in Clerk Dashboard

2. Clerk Webhook Setup:
   - Go to Clerk Dashboard > Webhooks
   - Create a new webhook endpoint using the ngrok URL + "/webhook"
   - Copy the signing secret and add it to both:
     ```
     # In frontend/.env.local
     CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here

     # In webhook-server/.env
     CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
     ```
   - Subscribe to the following events:
     * user.created (for welcome emails)
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

### Assessment Data Schema
1. MBTI Results Table:
   ```prisma
   model MBTIResult {
     id          String   @id @default(cuid())
     userId      String   @map("user_id")
     primaryType String   @map("primary_type")
     energySource String  @map("energy_source")
     energyStrength Int   @map("energy_strength")
     informationGathering String @map("information_gathering")
     informationStrength Int @map("information_strength")
     decisionMaking String @map("decision_making")
     decisionStrength Int @map("decision_strength")
     lifestyle String
     lifestyleStrength Int @map("lifestyle_strength")
     cognitiveFunctions Json @map("cognitive_functions")
     insights String? @db.Text
     createdAt DateTime @default(now()) @map("created_at")
     updatedAt DateTime @updatedAt @map("updated_at")

     @@index([userId])
     @@map("mbti_results")
   }
   ```

2. Enneagram Results Table:
   ```prisma
   model EnneagramResult {
     id          String   @id @default(cuid())
     userId      String   @map("user_id")
     primaryType Int      @map("primary_type")
     wing        Int?
     instinctualVariants Json @map("instinctual_variants")
     tritype     Json
     insights    String?  @db.Text
     createdAt   DateTime @default(now()) @map("created_at")
     updatedAt   DateTime @updatedAt @map("updated_at")

     @@index([userId])
     @@map("enneagram_results")
   }
   ```

3. StrengthsFinder Results Table:
   ```prisma
   model StrengthsFinderResult {
     id          String   @id @default(cuid())
     userId      String   @map("user_id")
     topStrengths Json    @map("top_strengths")
     strengthDescriptions Json @map("strength_descriptions")
     domainRankings Json  @map("domain_rankings")
     insights    String?  @db.Text
     createdAt   DateTime @default(now()) @map("created_at")
     updatedAt   DateTime @updatedAt @map("updated_at")

     @@index([userId])
     @@map("strengthsfinder_results")
   }
   ```

### Database Design Patterns
1. JSON Field Usage:
   - Store complex data structures in JSON fields
   - Use for flexible data that doesn't need to be queried directly
   - Examples: cognitive functions, instinctual variants, tritype

2. Indexing Strategy:
   - Primary index on id fields
   - Secondary index on userId for quick user-specific queries
   - Consider additional indexes based on query patterns

3. Data Validation:
   - Use Zod schemas for input validation
   - Implement database-level constraints
   - Validate data integrity in application layer

4. Timestamps:
   - All tables include createdAt and updatedAt
   - Automatic timestamp management through Prisma
   - Useful for tracking assessment history

5. Naming Conventions:
   - Snake case for database fields
   - Camel case for application code
   - Consistent prefix/suffix patterns

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
