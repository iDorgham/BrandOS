# Undo Manifesto

## Core Principle

**Every action must have a rollback plan.**

Before executing any change, you must be able to undo it completely. This prevents irreversible damage and enables fearless experimentation.

---

## Rules

### 1. No Irreversible Changes Without Approval

- Never delete data without confirmed backups
- Never drop tables without migration scripts ready
- Never rotate secrets without rollback procedure
- Never modify production without tested rollback

### 2. Git-First Recovery

```bash
# Always commit before risky operations
git add -A && git commit -m "checkpoint before [action]"

# Branch for experimental work
git checkout -b feature/experiment

# Revert specific changes
git revert <commit>
git reset --hard <commit>
```

### 3. Migration Rollback Pattern

```sql
-- Always create UP and DOWN migrations
-- migrations/20260101_create_table.sql
-- migrations/20260101_create_table_undo.sql

-- Example rollback
ALTER TABLE users DROP COLUMN new_column;
```

### 4. Feature Flags for Risky Deployments

```typescript
// Use feature flags for gradual rollout
if (featureFlags.newFeature) {
  // new implementation
} else {
  // legacy implementation
}
```

### 5. Backup Before Data Changes

```bash
# Database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Files
tar -czf backup_$(date +%Y%m%d).tar.gz ./src/

# Environment
cp .env .env.backup
```

### 6. Canary Testing

```bash
# Deploy to subset of users first
vercel deploy --prod --domains=subset.users.com

# Monitor errors
# If errors < 1%, deploy to all
# If errors > 1%, rollback immediately
```

### 7. Atomic Operations

- Make one change at a time
- Verify each change before next
- Don't compound multiple changes

### 8. Rollback Commands Must Be Tested

```bash
# Test rollback in staging first
git checkout -b rollback-test
# Apply change
# Apply rollback
# Verify it works
# Merge rollback to main
```

---

## Rollback Decision Tree

```
Did something break?
├─ Yes
│  └─ Is it a simple code change?
│     ├─ Yes → git revert
│     └─ No → Is there a backup?
│        ├─ Yes → Restore and investigate
│        └─ No → Can you reproduce the issue?
│           ├─ Yes → Fix and redeploy
│           └─ No → Page someone for help
└─ No → Monitor for 10 minutes before leaving
```

---

## Emergency Contacts

Always know who to call:

- Database admin: [insert]
- DevOps: [insert]
- Security: [insert]
- Product owner: [insert]

---

## Post-Incident

After any rollback:

1. Document what went wrong
2. Update this manifesto with lessons
3. Add test case to prevent recurrence
4. Share learnings with team
