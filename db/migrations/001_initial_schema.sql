-- Create assessments table
CREATE TABLE assessments (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  type VARCHAR(20) NOT NULL CHECK (type IN ('MBTI', 'Enneagram', 'StrengthsFinder')),
  raw_results JSON NOT NULL,
  processed_insights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for user-based queries
CREATE INDEX idx_assessments_user_id ON assessments(user_id);
