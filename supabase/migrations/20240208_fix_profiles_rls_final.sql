-- Migration: Fix Profiles RLS and Schema Final
-- Date: 2024-02-08
-- This migration fixes the incorrect RLS policies that were using 'id' instead of 'user_id'.

BEGIN;

-- 1. Ensure columns and constraints exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;

-- Ensure user_id is unique so we can use it as a conflict target for upserts
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'profiles_user_id_key' 
        AND conrelid = 'public.profiles'::regclass
    ) THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);
    END IF;
END $$;

-- 2. Drop incorrect/legacy policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 3. Create corrected policies using user_id
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (user_id = (SELECT auth.uid()));

COMMIT;
