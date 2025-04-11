# Excellent Evolution Information Architecture

```mermaid
%% Information Architecture Diagram
graph TD
    A[User] --> B[Authentication]
    B -->|Stack Auth| C[Frontend]
    C --> D[App Router]
    D --> E[Dashboard]
    D --> F[Assessments]
    D --> G[Development]
    D --> H[Coaching]
    
    E --> I[Status Cards]
    E --> J[Quick Actions]
    
    F --> K[Assessment Types]
    G --> L[Progress Tracking]
    H --> M[Session Management]
    
    C --> N[API Routes]
    N --> O[Vercel AI SDK]
    O --> P[Sonnet 3.7 LLM]
    
    N --> Q[Database]
    Q --> R[Prisma ORM]
    Q --> S[Neon (Postgres)]
    
    I --> T[Gamification Elements]
    L --> U[Analytics]
    M --> V[Calendar Integration]
```

## Core Components

### 1. Authentication Layer
- **Stack Auth Integration**: Handles user signup/login flows, transactional email, and user profile management
- **Middleware**: Next.js middleware.ts for route protection
- **Session Management**: Session and JWT handling via Stack Auth provider

### 2. Frontend Structure
```plaintext
src/app/
├── (auth)/                 # Authentication routes
│   ├── login/[[...sign-in]]/
│   └── register/[[...sign-up]]/
├── dashboard/              # Main user interface
│   ├── layout.tsx          # Dashboard shell
│   └── page.tsx            # Dashboard content (cards/actions)
├── assessments/            # Assessment flows
├── development/            # Planning tools
├── coaching/               # Session management
└── layout.tsx              # Root layout with StackAuthProvider
```

### 3. Data Flow Pipeline
1. User interaction triggers API route
2. Vercel AI SDK processes request with Sonnet 3.7 LLM
3. Database updates via Prisma ORM (Neon managed Postgres)
4. UI updates through React state management

## Gap Analysis
- 🚧 Missing gamification components in dashboard
- 🚧 Assessment tracking not implemented in database schema
- 🚧 AI recommendations not visible in UI
- 🚧 Calendar integration placeholder without functionality

## Next Steps
1. Expand database schema for assessment tracking
2. Implement gamification components
3. Add AI recommendation displays
4. Integrate calendar functionality
5. Create analytics dashboard