# HITL (Human-in-the-Loop) Protocol

## Overview

This protocol defines the approval gates for AI operations based on risk levels. Three tiers of human oversight ensure safety while maintaining productivity.

---

## Approval Tiers

### 🟢 GREEN: Auto-Execute (Risk < 0.3)

**Conditions:**
- Risk score calculated below 0.3
- No data sensitivity concerns
- Easily reversible changes
- Non-destructive operations

**Actions permitted:**
- UI component creation/modification
- Documentation updates
- Content generation
- Simple refactoring (<5 files)
- Code style fixes
- Test additions
- Lint fixes

**Execution:** Immediate, no human notification required

---

### 🟡 YELLOW: Passive Approval (Risk 0.3 - 0.7)

**Conditions:**
- Risk score between 0.3 and 0.7
- Moderate complexity
- Some data access
- Reversible with effort

**Actions requiring passive approval:**
- New feature implementation
- Service layer changes
- Context/API modifications
- Database schema additions (non-breaking)
- Third-party integrations
- UI framework upgrades
- Performance optimizations
- Brand guideline updates

**Execution:**
1. AI generates execution plan
2. Display 30-second countdown with summary
3. If no objection → execute automatically
4. If user intervenes → pause and await explicit approval

**Notification format:**
```
⚠️ YELLOW GATE: [Action Description]
Risk Score: [X.X]
Affected: [files/components]
Rollback: [command]
[30s countdown begins...]
```

---

### 🔴 RED: Explicit Approval (Risk > 0.7)

**Conditions:**
- Risk score above 0.7
- High complexity or data sensitivity
- Irreversible or difficult to reverse
- Production-impacting

**Actions requiring explicit approval (NEVER auto-execute):**

| Action | Risk Factors | Rollback Command |
|--------|--------------|------------------|
| Database migrations | Data loss, schema changes | `supabase migration revert` |
| Secret rotation | Auth breakage | Restore from backup |
| Production deploys | Service disruption | `vercel rollback` |
| Bulk deletions | Data loss | Restore from backup |
| RLS policy changes | Security exposure | Revert SQL |
| Schema drops | Data loss | N/A - critical |
| Payment integrations | Financial impact | Revert changes |
| OAuth changes | Auth breakage | Revert OAuth config |
| CDN/waf changes | Site availability | Revert config |

**Execution:**
1. AI generates detailed decision brief
2. Present to user with full context
3. Await explicit "approve" or "deny"
4. If approved → execute with monitoring
5. If denied → abort and suggest alternatives

---

## Decision Brief Format

For 🔴 RED gate tasks, present:

```markdown
## Decision Brief: [Action Name]

### Summary
[Brief description of what will happen]

### Risk Assessment
- Complexity: [1-10]
- Data Sensitivity: [1-10]
- Reversibility: [1-10]
- **Total Risk Score: [X.X]**

### Affected Components
- [File/Service/Table 1]
- [File/Service/Table 2]

### Execution Plan
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Rollback Plan
```bash
# Exact rollback commands
[command 1]
[command 2]
```

### Time Estimate
- Execution: [X minutes]
- Rollback: [Y minutes]

### Dependencies
- [Any external dependencies]

---
**Do you approve this action?**
[APPROVE] [DENY] [MODIFY]
```

---

## Critical Actions (Always Red)

The following actions NEVER bypass the red gate, regardless of calculated risk:

1. **Any SQL migration** - Even simple column additions
2. **Environment variable changes** - Any secrets or keys
3. **Authentication/Authorization changes** - RLS, OAuth, roles
4. **Data deletion** - Any bulk or cascade deletes
5. **External API integrations** - Payment, third-party services
6. **Production deployments** - Any deploy to production
7. **Billing changes** - Pricing, subscriptions, payments

---

## Passive Approval Timer

The 30-second passive approval timer:

```yaml
timer:
  duration: 30
  unit: seconds
  skippable: true
  displayFormat: "Approving in {seconds}s..."
  
actions:
  onTimeout: execute
  onInterrupt: pause
  onApprove: execute
  onDeny: abort
  
userActions:
  - "Press Enter to approve immediately"
  - "Type 'skip' to skip countdown"
  - "Type 'abort' to cancel"
```

---

## Emergency Abort

At any point, users can:
- Type `abort` to stop execution
- Press `Ctrl+C` to interrupt
- Type `rollback` to trigger automatic rollback

---

## Audit Log

All executed actions are logged with:

```json
{
  "timestamp": "ISO-8601",
  "action": "description",
  "gate": "green|yellow|red",
  "riskScore": 0.X,
  "actor": "ai|human",
  "userId": "optional",
  "rollbackAvailable": true,
  "filesChanged": ["list"]
}
```

---

## Tool-Specific Behavior

| Tool | Green | Yellow | Red |
|------|-------|--------|-----|
| Gemini | Auto | 30s wait | Block + notify |
| Claude | Auto | 30s wait | Request approval |
| KiloCode | Auto | 30s wait | Request approval |
| OpenCode | Auto | 30s wait | Request approval |

---

## Implementation Notes

- Risk scores are calculated using the governance-matrix.json formula
- Human approval state persists for 1 hour (configurable)
- Rollback commands must be tested before deployment
- All red gate actions require post-execution verification
