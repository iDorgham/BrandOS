---
name: create-migration
description: Creates a Supabase/PostgreSQL migration file
---

# SKILL.md

Drafts a SQL migration script for Supabase database changes.

## Parameters
- `name`: Descriptive name for the migration.
- `sql`: The actual SQL commands to be included.

## Examples
### New Tables Migration
```bash
create-migration --name create_profiles --sql "CREATE TABLE profiles (id UUID...)"
```
