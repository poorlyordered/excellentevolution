# Excellent Evolution - Professional Development Platform

A comprehensive platform for professional development, coaching, and personal growth assessments.

## Project Structure

- `frontend/` - Next.js web application
- `webhook-server/` - Webhook handling server
- `db/` - Database migrations and setup
- `prisma/` - Prisma ORM configuration
- `cline_docs/` - Project documentation

## Prerequisites

- Node.js (v18 or higher)
- MySQL/MariaDB
- Git

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd excellent-evolution
```

2. Set up environment variables:
- Copy `.env.example` files and configure:
```bash
# Root directory
cp .env.example .env

# Frontend
cd frontend
cp .env.example .env.local

# Webhook server
cd ../webhook-server
cp .env.example .env
```

3. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Webhook server
cd ../webhook-server
npm install
```

4. Set up the database:
```bash
# Run database migrations
cd db
mysql -u [username] -p [database_name] < migrations/001_initial_schema.sql
mysql -u [username] -p [database_name] < migrations/002_mariadb_assessments_schema.sql
mysql -u [username] -p [database_name] < migrations/003_mariadb_users_schema.sql
```

5. Start the development servers:
```bash
# Frontend (from frontend directory)
npm run dev

# Webhook server (from webhook-server directory)
npm run dev
```

## Environment Configuration

### Frontend (.env.local)
- `DATABASE_URL`: MySQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key
- `CLERK_SECRET_KEY`: Clerk secret key
- `CLERK_WEBHOOK_SECRET`: Webhook secret for Clerk
- `RESEND_API_KEY`: API key for email service

### Webhook Server (.env)
- `PORT`: Server port (default: 3001)
- `CLERK_WEBHOOK_SECRET`: Webhook secret for Clerk
- `FORWARD_URL`: URL to forward webhooks to

## Development Workflow

1. Create a new branch for each feature/fix
2. Make changes and test locally
3. Ensure all environment variables are properly configured
4. Run tests (when implemented)
5. Create a pull request

## Available Scripts

### Frontend
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server

### Webhook Server
- `npm run dev`: Start development server
- `npm run build`: Build TypeScript
- `npm start`: Start production server

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[License Type] - See LICENSE file for details
