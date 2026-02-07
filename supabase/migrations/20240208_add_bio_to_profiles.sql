-- Migration: Add bio column to profiles table
-- Date: 2024-02-08

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;

-- Update the handle_new_user function if it exists to include a default bio if needed
-- (Assuming it might be defined in a hidden base migration)
-- If we can't find it, we'll just rely on the column being nullable.

-- Ensure RLS is consistent with the id field
-- (Based on 20240207_rls_performance_optimization.sql)
-- Policies already use (id = auth.uid())
