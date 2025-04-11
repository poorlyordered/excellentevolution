# .env File Management Best Practices

## 1. Centralize All Environment Variables in the Project Root

- All `.env` files should reside in the project root (e.g., `.env`, `.env.local`, `.env.production`, `.env.example`).
- This ensures a single source of truth, simplifies deployment, and avoids confusion about which file is being loaded.
- **Exception:** If you have truly independent backend services (e.g., a separate `mariadb-server/` app), those may keep their own `.env` files. For a Next.js app with API routes, keep everything in the root.

---

## 2. Recommended .env File Types and Usage

| File Name         | Purpose                                      | Committed to VCS? |
|-------------------|----------------------------------------------|-------------------|
| `.env`            | Default values for all environments          | ❌ (if secrets)   |
| `.env.local`      | Local development overrides (secrets)        | ❌                |
| `.env.production` | Production-specific overrides                | ❌                |
| `.env.example`    | Template with all required variable names    | ✅                |

- **Never commit files with secrets** (`.env`, `.env.local`, `.env.production`).
- **Always commit `.env.example`** with placeholder values and comments.

---

## 3. Variable Naming and Scoping

- **Frontend-exposed variables** must be prefixed with `NEXT_PUBLIC_` (Next.js requirement).
- **Backend-only variables** (e.g., DB credentials, API secrets) should never be prefixed with `NEXT_PUBLIC_`.
- **Document all required variables** in `.env.example`, including which are public and which are secret.

---

## 4. Consolidation & Migration Steps

### a. Inventory All Variables
- List all variables from every existing `.env*` file (root and frontend/).
- Identify duplicates and environment-specific values.

### b. Create/Update Root .env Files
- Move all variables to the root `.env`, `.env.local`, `.env.production` as appropriate.
- Remove all `.env*` files from `frontend/` after migration.

### c. Update .env.example
- Ensure `.env.example` in the root contains all required variable names, with comments and no secrets.

### d. Update .gitignore
- Ensure `.env`, `.env.local`, `.env.production` are listed in `.gitignore`.

### e. Update Documentation
- Document the .env file structure and usage in your README or a dedicated section.

---

## 5. Security and Workflow Best Practices

- **Never commit secrets** to version control.
- **Rotate secrets** regularly and after any suspected leak.
- **Use different values** for dev, test, and prod environments.
- **Automate environment variable injection** in CI/CD pipelines (e.g., using GitHub Actions secrets).
- **Audit environment variables** periodically for unused or duplicate entries.

---

## 6. Example Directory Structure

```
/
├── .env
├── .env.local
├── .env.production
├── .env.example
├── frontend/
│   └── (no .env files here)
├── mariadb-server/
│   └── .env (if needed for standalone service)
```

---

## 7. Sample .env.example

```dotenv
# Database
DATABASE_URL=

# Prisma
PRISMA_CLIENT_ENGINE_TYPE=

# Clerk Auth (Frontend)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
CLERK_FRONTEND_API=
CLERK_API_URL=
CLERK_JWKS_URL=
CLERK_JWKS_PUBLIC_KEY=

# StackAuth
NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=

# Unsplash API
UNSPLASH_ACCESS_KEY=
UNSPLASH_SECRET_KEY=

# Email (Resend)
RESEND_API_KEY=
```

---

## 8. .env File Loading Flow

```mermaid
flowchart TD
    A[Start: App Boot] --> B{Which Environment?}
    B -- Development --> C[Load .env]
    C --> D[Override with .env.local]
    B -- Production --> E[Load .env]
    E --> F[Override with .env.production]
    D & F --> G[App Receives Final Env Vars]