# Migration Plan: MariaDB to PostgreSQL (Local) for Excellent Evolution

## Overview
This plan details the steps to migrate the backend database from MariaDB to PostgreSQL, running locally, for the Excellent Evolution platform. The migration leverages Prisma ORM, ensuring minimal disruption to the Next.js 15 backend and associated workflows.

---

## 1. Preparation

- **Backup MariaDB Data**
  - Export all existing MariaDB data using `mysqldump` or a similar tool.
- **Install PostgreSQL Locally**
  - Download and install the latest stable PostgreSQL version.
  - Set up a new local database and user with appropriate privileges.
- **Install PostgreSQL Client Tools**
  - Ensure `psql` and other client tools are available for import/export.

---

## 2. Update Prisma Configuration

- **Change Prisma Provider**
  - In `prisma/schema.prisma`, update the `provider` from `mysql` to `postgresql`.
- **Update Connection String**
  - Modify `.env` to use the new PostgreSQL connection string (e.g., `DATABASE_URL="postgresql://user:password@localhost:5432/dbname"`).
- **Review Prisma Schema**
  - Check for any MariaDB/MySQL-specific types or attributes and update to PostgreSQL-compatible types.
  - Pay special attention to:
    - `@default` values (e.g., `autoincrement()` is supported, but `uuid()` and timestamp defaults may differ)
    - Enum definitions
    - Indexes and constraints

---

## 3. Data Migration

- **Export MariaDB Data**
  - Use `mysqldump` to export data in a format suitable for transformation.
- **Transform Data**
  - Convert data types and formats as needed (e.g., date/time, booleans, enums).
  - Use tools like `csvkit`, custom scripts, or ETL tools for transformation.
- **Import Data into PostgreSQL**
  - Use `psql`, `pgAdmin`, or Prisma's `db seed` to import data into the new database.

---

## 4. Migrate and Deploy Prisma

- **Generate New Prisma Migrations**
  - Run `npx prisma migrate dev` to create and apply migrations for PostgreSQL.
- **Regenerate Prisma Client**
  - Run `npx prisma generate` to update the client for PostgreSQL.
- **Test Database Access**
  - Run all Prisma queries and mutations in a local dev environment to ensure compatibility.

---

## 5. Update Application Code

- **Review SQL Queries**
  - Check for any raw SQL queries or database-specific logic in the codebase.
  - Update queries to PostgreSQL syntax if needed.
- **Update Seed Scripts**
  - Ensure any seed scripts are compatible with PostgreSQL.

---

## 6. Testing

- **Run Automated Tests**
  - Execute all unit, integration, and E2E tests (especially Playwright tests) to verify functionality.
- **Manual Testing**
  - Manually test critical flows: authentication, assessment data, AI features, and plan management.

---

## 7. Documentation & DevOps

- **Update Documentation**
  - Revise `techContext.md`, `.env.example`, and any setup guides to reflect PostgreSQL usage.
- **Update CI/CD**
  - Ensure CI/CD pipelines use PostgreSQL for testing and deployment environments.
- **Remove MariaDB Artifacts**
  - Clean up MariaDB-specific scripts, configs, and documentation.

---

## 8. Rollback Plan

- **Retain MariaDB Backups**
  - Keep MariaDB backups until PostgreSQL migration is fully validated.
- **Rollback Steps**
  - Document steps to revert to MariaDB if critical issues arise.

---

## Migration Flow Diagram

```mermaid
flowchart TD
    A[Backup MariaDB Data] --> B[Install PostgreSQL Locally]
    B --> C[Update Prisma Schema & Config]
    C --> D[Transform & Import Data]
    D --> E[Run Prisma Migrations]
    E --> F[Update Application Code]
    F --> G[Testing]
    G --> H[Update Documentation & CI/CD]
    H --> I[Cleanup & Rollback Plan]
```

---

## Key Considerations

- Prisma abstracts most differences, but some manual schema and data adjustments may be required.
- Test thoroughly before removing MariaDB.
- Communicate changes to all developers and update onboarding docs.

---