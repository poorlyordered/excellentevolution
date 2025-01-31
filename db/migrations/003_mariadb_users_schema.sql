-- MariaDB Users Table Migration
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100),
  role ENUM('CLIENT', 'COACH', 'ADMIN') NOT NULL DEFAULT 'CLIENT',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create index for email-based queries
CREATE INDEX idx_users_email ON users(email);
