-- Add active column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'users' AND column_name = 'active') THEN
        ALTER TABLE users ADD COLUMN active boolean;
    END IF;
END $$;

-- Convert old roles to new roles
UPDATE users SET role = 'USER' WHERE role = 'ROLE_USER';
UPDATE users SET role = 'ADMIN' WHERE role = 'ROLE_ADMIN';
UPDATE users SET role = 'STAFF' WHERE role = 'ROLE_STAFF';

-- Set default active status for existing users
UPDATE users SET active = true WHERE active IS NULL;

-- Add not null constraint to active column
ALTER TABLE users ALTER COLUMN active SET NOT NULL;
