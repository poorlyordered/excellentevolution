-- Excellent Evolution MariaDB Schema

CREATE TABLE User (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100),
  role ENUM('CLIENT', 'COACH', 'ADMIN') DEFAULT 'CLIENT',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE Assessment (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  type ENUM('BIG_FIVE', 'SIXTEEN_PF', 'HOLLAND_CODE', 'DISC', 'TALENTSMART_EQ', 'CAREER_VALUES') NOT NULL,
  raw_results JSON,
  processed_insights JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_assessment_user FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE DevelopmentPlan (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  title VARCHAR(255),
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_plan_user FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE QuarterlyReview (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Indexes
CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_assessment_user_id ON Assessment(user_id);
CREATE INDEX idx_plan_user_id ON DevelopmentPlan(user_id);
CREATE INDEX idx_review_user_id ON QuarterlyReview(user_id);

-- Table mappings (for Prisma compatibility, not required for MariaDB)
-- User: users
-- Assessment: assessments
-- DevelopmentPlan: development_plans
-- QuarterlyReview: quarterly_reviews
