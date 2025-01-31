-- MariaDB Assessments Table Migration
CREATE TABLE assessments (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  type ENUM('MBTI', 'Enneagram', 'StrengthsFinder') NOT NULL,
  raw_results JSON NOT NULL,
  processed_insights TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create index for user-based queries
CREATE INDEX idx_assessments_user_id ON assessments(user_id);
