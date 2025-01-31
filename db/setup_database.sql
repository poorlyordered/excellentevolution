-- MariaDB Database Setup Script

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS professional_coaching_db;

-- Use the database
USE professional_coaching_db;

-- Create application user with limited privileges
CREATE USER IF NOT EXISTS 'coaching_app_user'@'localhost' IDENTIFIED BY 'REPLACE_WITH_SECURE_PASSWORD';

-- Grant necessary privileges
GRANT SELECT, INSERT, UPDATE, DELETE 
ON professional_coaching_db.* 
TO 'coaching_app_user'@'localhost';

-- Flush privileges to ensure changes take effect
FLUSH PRIVILEGES;
