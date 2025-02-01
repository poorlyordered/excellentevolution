# System Patterns

## Authentication System

Implemented a robust authentication system using NextAuth.js to handle user sign-in with credentials. The authentication flow includes:

- **NextAuth.js Credentials Provider**: Allows users to sign in using their email and password.
- **Session Management**: Maintains user sessions for authenticated access.
- **Middleware for Protected Routes**: Ensures that certain routes are accessible only to authenticated users.
- **Environment Configuration**: Securely manages environment variables for authentication using `.env.local` and `frontend/.env`.

### Workflow

1. **Login Page**: Users enter their credentials, which are validated by NextAuth.js.
2. **Session Provider**: Wraps the application to provide session context.
3. **Middleware**: Protects routes by checking for valid authentication tokens.
4. **Error Handling**: Properly handles authentication errors and redirects.

### Technologies Used

- **NextAuth.js**: Provides authentication mechanisms.
- **React**: For building user interface components.
- **Next.js**: Framework facilitating server-side rendering and routing.
- **TypeScript**: Ensures type safety and better developer experience.
- **MariaDB**: Serves as the database for storing user and platform data.
