# Agent Communication Protocol

## Overview

This specification defines how AI agents communicate within the Brand DNA ecosystem. Agents can request information, delegate tasks, share context, and collaborate on complex workflows.

---

## Message Envelope

Every inter-agent message follows this envelope structure:

```json
{
  "version": "1.0.0",
  "type": "REQUEST|RESPONSE|EVENT|ERROR|HEARTBEAT",
  "messageId": "uuid-v4",
  "timestamp": "ISO-8601",
  "correlationId": "uuid-v4",
  "sender": {
    "agentId": "string",
    "agentName": "string",
    "domain": "string",
    "capabilities": ["string"]
  },
  "receiver": {
    "agentId": "string|optional",
    "agentName": "string|optional",
    "domain": "string|optional"
  },
  "payload": {},
  "metadata": {
    "priority": "low|normal|high|critical",
    "ttl": 300,
    "retryable": true,
    "requiresAck": true
  },
  "security": {
    "signature": "hmac-sha256",
    "encrypted": false
  }
}
```

---

## Message Types

### REQUEST

Used when one agent needs another agent to perform work.

```json
{
  "type": "REQUEST",
  "payload": {
    "action": "create-component",
    "parameters": {
      "name": "BrandCard",
      "props": {...}
    },
    "context": {
      "brandId": "uuid",
      "style": "minimal"
    },
    "constraints": {
      "deadline": "ISO-8601",
      "tokenBudget": 5000
    }
  }
}
```

### RESPONSE

Used to reply to a REQUEST.

```json
{
  "type": "RESPONSE",
  "payload": {
    "status": "success|partial|failure",
    "result": {},
    "artifacts": ["file paths"]
  }
}
```

### EVENT

Used for asynchronous notifications.

```json
{
  "type": "EVENT",
  "payload": {
    "event": "component-created",
    "data": {
      "componentId": "uuid",
      "path": "web/src/components/ui/BrandCard.tsx"
    }
  }
}
```

### ERROR

Used when something goes wrong.

```json
{
  "type": "ERROR",
  "payload": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid component props",
    "details": {},
    "recoverable": true
  }
}
```

### HEARTBEAT

Used for health checks and availability.

```json
{
  "type": "HEARTBEAT",
  "payload": {
    "status": "ready|busy|unavailable",
    "load": 0.75,
    "capabilities": ["create-component", "design-component"]
  }
}
```

---

## Communication Patterns

### 1. Direct Request

Agent A → Agent B: "Create a button component"

```
REQUEST: copywriter → ui-designer
Payload: { action: "design-component", parameters: {...} }
```

### 2. Broadcast

Agent A → All agents in domain: "New brand guidelines"

```
EVENT: brand-strategist → [all design agents]
Payload: { event: "guidelines-updated", data: {...} }
```

### 3. Chain

Agent A → Agent B → Agent C: Sequential handoff

```
REQUEST: product-planner → system-architect (architecture spec)
RESPONSE → fullstack-developer (implementation)
RESPONSE → qa-engineer (testing)
```

### 4. Parallel

Agent A → [Agent B, Agent C, Agent D]: Concurrent work

```
REQUEST: creative-director → [copywriter, ui-designer, graphic-designer]
All receive same context, work in parallel
```

---

## Sender/Receiver Identification

### Agent ID Format

```
[domain]-[role]-[instance]

Examples:
- development-react-specialist
- content-copywriter-1
- branding-creative-director
```

### Domain Routing

| Domain | Agents |
|--------|--------|
| development | system-architect, fullstack-developer, react-specialist, supabase-expert, security-engineer, devops-engineer, qa-engineer |
| content | copywriter, content-strategist, technical-writer |
| design | ui-designer, ux-researcher, graphic-designer |
| branding | brand-strategist, creative-director |
| marketing | marketing-strategist, advertising-specialist |
| automation | automation-specialist, ai-automation-engineer |
| ai | prompt-engineer, generative-ai-specialist |
| planning | project-manager, product-planner |
| social | social-media-manager, social-media-strategist |

---

## Security

### Message Signing

All messages include HMAC-SHA256 signature:

```javascript
signature = HMAC-SHA256(payload, agentSecret)
```

### Encryption

For sensitive payloads:

```json
{
  "security": {
    "encrypted": true,
    "encryption": "AES-256-GCM",
    "keyId": "key-uuid"
  }
}
```

### Access Control

- Agents can only message within their trust domain
- Cross-domain messages require explicit routing rules
- Sensitive operations require encrypted payloads

---

## Retry Logic

### Retry Policy

```json
{
  "retry": {
    "maxAttempts": 3,
    "backoff": "exponential",
    "baseDelay": 1000,
    "maxDelay": 30000,
    "retryableCodes": [
      "TIMEOUT",
      "AGENT_UNAVAILABLE",
      "RATE_LIMITED"
    ]
  }
}
```

### Error Handling

| Error Code | Behavior |
|------------|----------|
| TIMEOUT | Retry with exponential backoff |
| AGENT_UNAVAILABLE | Queue message, retry later |
| INVALID_REQUEST | Return error, do not retry |
| AUTH_FAILURE | Do not retry, alert user |
| RATE_LIMITED | Wait and retry with backoff |

---

## Message Flow Examples

### Example: Feature Creation

```
1. user → product-planner: "Add user authentication"

2. product-planner (REQUEST) → system-architect:
   "Design auth architecture"
   
3. system-architect (RESPONSE) → product-planner:
   { schema: {...}, flow: {...} }

4. product-planner (REQUEST) → [react-specialist, supabase-expert]:
   "Implement auth UI and backend"

5. [react-specialist, supabase-expert] (RESPONSE) → product-planner:
   { components: [...], migrations: [...] }

6. product-planner (REQUEST) → qa-engineer:
   "Test auth flow"

7. qa-engineer (RESPONSE) → product-planner:
   { tests: [...], coverage: 95% }

8. product-planner → user: "Auth feature complete"
```

### Example: Brand Campaign

```
1. user → marketing-strategist: "Launch summer campaign"

2. marketing-strategist (REQUEST) → brand-strategist:
   "Get brand guidelines"

3. brand-strategist (RESPONSE) → marketing-strategist:
   { guidelines: {...} }

4. marketing-strategist (PARALLEL REQUEST) → [copywriter, ui-designer, social-media-manager]:
   "Create campaign content"

5. All respond with artifacts

6. marketing-strategist (EVENT) → all stakeholders:
   "Campaign launched"
```

---

## Implementation

### Message Queue

Messages are queued and processed asynchronously:

- In-memory queue for immediate delivery
- Persistent queue for reliability
- Dead letter queue for failed messages

### Acknowledgment

For REQUEST messages requiring acknowledgment:

```json
{
  "metadata": {
    "requiresAck": true,
    "ackTimeout": 30000
  }
}
```

If acknowledgment not received within timeout, retry or escalate.

---

## Agent Registry

Each agent maintains a registry of available agents:

```json
{
  "agents": [
    {
      "id": "development-react-specialist",
      "name": "React Specialist",
      "domain": "development",
      "capabilities": ["create-component", "create-hook", "refactor-code"],
      "status": "ready",
      "load": 0.3
    }
  ]
}
```

---

## Best Practices

1. **Minimize messages**: Batch related information
2. **Include context**: Provide enough info for the receiver to act
3. **Set TTL**: Don't wait forever for responses
4. **Handle errors**: Always have fallback plans
5. **Log everything**: Track all inter-agent communication
6. **Timeout gracefully**: Don't block indefinitely
7. **Use correlation IDs**: Track message chains
