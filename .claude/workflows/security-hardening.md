---
description: RLS audit, JWT validation, and security improvements
---

1. **Audit RLS Policies**: Use `security-engineer` to review database access control.
2. **Audit JWT Validation**: Verify secure token handling in API and services.
3. **Audit Environment Variables**: Check for exposed secrets or misconfigurations.
4. **Audit Supabase Client**: Ensure RLS is enforced at the client level.
5. **Consolidate Findings**: Group issues by severity and priority.
6. **Fix Critical Issues**: Remediate high-risk vulnerabilities immediately.
7. **Fix Medium Issues**: Address secondary security improvements.
8. **Validate Fixes**: Use `qa-engineer` for security-specific testing.
9. **Generate Report**: Create a detailed security posture summary.
