# Rule: Database Security

Security is paramount. All database operations must follow security best practices.

## Core Principles

1. **Never expose secrets** - No API keys, passwords, or tokens in code
2. **Use RLS** - Row Level Security on all tables
3. **Validate input** - Sanitize all user data before database operations
4. **Use migrations** - Never modify production schema directly

## RLS Requirements

- All tables must have RLS enabled
- Policies must restrict access based on user ownership
- Use `auth.uid()` for user-based access control

## Migration Pattern

```sql
-- migrations/YYYYMMDDHHMMSS_description.sql
CREATE TABLE table_name (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own data"
ON table_name FOR ALL
USING (auth.uid() = user_id);
```
