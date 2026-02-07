# Brand OS API Documentation

**Version:** 2.0  
**Last Updated:** February 7, 2026  
**Base URL:** `https://api.brandos.app/v1`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Brand Management API](#brand-management-api)
3. [Asset Management API](#asset-management-api)
4. [AI Service API](#ai-service-api)
5. [Workspace API](#workspace-api)
6. [Deployment API](#deployment-api)
7. [Analytics API](#analytics-api)
8. [WebSocket Events](#websocket-events)
9. [Error Handling](#error-handling)
10. [Rate Limiting](#rate-limiting)

---

## Authentication

Brand OS uses **Google OAuth 2.0** for authentication with JWT tokens for API access.

### Authentication Flow

```typescript
// 1. Initiate OAuth flow
GET /auth/google

// 2. OAuth callback
GET /auth/callback?code={auth_code}

// 3. Exchange for access token
POST /auth/token
{
  "code": "auth_code",
  "redirect_uri": "your_redirect_uri"
}

// Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

### Using Access Tokens

Include the access token in the `Authorization` header for all API requests:

```http
Authorization: Bearer {access_token}
```

---

## Brand Management API

### Get All Brands

Retrieve all brands for the authenticated user within their active workspace.

```http
GET /api/brands
```

**Query Parameters:**
- `workspace_id` (optional): Filter by workspace ID
- `limit` (optional): Number of results (default: 50, max: 100)
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "brands": [
    {
      "id": "brand_uuid",
      "name": "Nightclub Brand",
      "doctrine": "Mysterious euphoria aesthetic",
      "palette": [
        {
          "id": "color_uuid",
          "label": "Primary",
          "hex": "#2A5C82"
        }
      ],
      "dnaSpectrum": {
        "energy": 78,
        "warmth": 42,
        "sophistication": 94
      },
      "created_at": "2026-02-01T10:00:00Z",
      "updated_at": "2026-02-07T14:30:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

### Create Brand

Create a new brand profile with DNA configuration.

```http
POST /api/brands
```

**Request Body:**
```json
{
  "name": "New Brand",
  "doctrine": "Brand philosophy and aesthetic direction",
  "palette": [
    {
      "label": "Primary",
      "hex": "#2A5C82"
    },
    {
      "label": "Secondary",
      "hex": "#F4F1E9"
    }
  ],
  "background": "#262626",
  "negativeSpace": 35,
  "emotionalTags": ["mysterious", "euphoric"],
  "grammarRules": [
    {
      "type": "composition",
      "rule": "Logo must occupy top-left 15%",
      "priority": 1
    }
  ],
  "workspace_id": "workspace_uuid"
}
```

**Response:**
```json
{
  "id": "new_brand_uuid",
  "name": "New Brand",
  "doctrine": "Brand philosophy...",
  "created_at": "2026-02-07T15:00:00Z",
  "dnaSpectrum": {
    "energy": 65,
    "warmth": 50,
    "sophistication": 80
  }
}
```

### Update Brand

Update an existing brand profile.

```http
PUT /api/brands/:id
PATCH /api/brands/:id
```

**Request Body:** (same structure as Create Brand, all fields optional for PATCH)

### Delete Brand

Delete a brand and all associated assets.

```http
DELETE /api/brands/:id
```

**Response:**
```json
{
  "message": "Brand deleted successfully",
  "id": "brand_uuid"
}
```

---

## Asset Management API

### Get All Assets

Retrieve generated assets with filtering and pagination.

```http
GET /api/assets
```

**Query Parameters:**
- `brand_id` (optional): Filter by brand
- `asset_type` (optional): Filter by type (flyer, logo, social, etc.)
- `min_compliance` (optional): Minimum compliance score (0-100)
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "assets": [
    {
      "id": "asset_uuid",
      "url": "https://storage.brandos.app/assets/...",
      "prompt": "Futuristic nightclub flyer...",
      "asset_type": "flyer",
      "brand_id": "brand_uuid",
      "compliance_score": 95,
      "audit_details": {
        "color_match": 98,
        "spatial_compliance": 92,
        "vibe_check": 95,
        "feedback": "Excellent brand alignment",
        "suggested_fixes": []
      },
      "created_at": "2026-02-07T14:00:00Z"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

### Create Asset

Generate a new asset using AI.

```http
POST /api/assets
```

**Request Body:**
```json
{
  "prompt": "Futuristic nightclub flyer",
  "brand_id": "brand_uuid",
  "asset_type": "flyer",
  "model_id": "gemini-3-pro-preview",
  "intensities": {
    "energy": 80,
    "warmth": 45,
    "sophistication": 90
  },
  "batch_size": 4
}
```

**Response:**
```json
{
  "job_id": "generation_job_uuid",
  "status": "processing",
  "estimated_completion": "2026-02-07T15:05:00Z"
}
```

### Get Asset

Retrieve a single asset by ID.

```http
GET /api/assets/:id
```

### Update Asset

Update asset metadata or compliance scores.

```http
PATCH /api/assets/:id
```

**Request Body:**
```json
{
  "compliance_score": 97,
  "audit_details": {...},
  "tags": ["approved", "campaign-2026"]
}
```

### Delete Asset

Delete an asset.

```http
DELETE /api/assets/:id
```

---

## AI Service API

### Get Available Models

Retrieve list of available AI models and their capabilities.

```http
GET /api/ai/models
```

**Response:**
```json
{
  "models": [
    {
      "id": "gemini-3-pro-preview",
      "name": "Gemini 3 Pro",
      "provider": "google",
      "capabilities": ["text", "image", "analysis"],
      "recommended_for": "Complex brand alignment",
      "cost_per_request": 0.05,
      "max_batch_size": 10
    }
  ]
}
```

### Generate Content

Generate AI content with brand alignment.

```http
POST /api/ai/generate
```

**Request Body:**
```json
{
  "prompt": "Design a minimal poster",
  "brand_id": "brand_uuid",
  "model_id": "gemini-3-pro-preview",
  "parameters": {
    "aspect_ratio": "1:1",
    "resolution": "8K",
    "style_strength": 0.8
  }
}
```

### Analyze Content

Analyze content for brand compliance.

```http
POST /api/ai/analyze
```

**Request Body:**
```json
{
  "asset_url": "https://...",
  "brand_id": "brand_uuid",
  "analysis_type": "full"
}
```

**Response:**
```json
{
  "compliance_score": 92,
  "color_analysis": {
    "primary_color_usage": 45,
    "palette_adherence": 98
  },
  "spatial_analysis": {
    "negative_space": 38,
    "logo_placement": "correct"
  },
  "emotional_resonance": {
    "detected_mood": "mysterious, energetic",
    "alignment_score": 89
  },
  "suggestions": [
    "Increase negative space to 40% for better balance"
  ]
}
```

---

## Workspace API

### Get Workspaces

Retrieve all workspaces for the authenticated user.

```http
GET /api/workspaces
```

### Create Workspace

Create a new workspace.

```http
POST /api/workspaces
```

**Request Body:**
```json
{
  "name": "Agency Workspace",
  "description": "Main creative workspace"
}
```

### Invite Member

Invite a user to a workspace.

```http
POST /api/workspaces/:id/members
```

**Request Body:**
```json
{
  "email": "designer@example.com",
  "role": "designer"
}
```

---

## Deployment API

### Create Deployment Request

Submit an asset for deployment approval.

```http
POST /api/deployments
```

**Request Body:**
```json
{
  "asset_id": "asset_uuid",
  "platform": "instagram",
  "scheduled_date": "2026-02-10T09:00:00Z",
  "caption": "New campaign launch!"
}
```

### Get Deployment Status

Check deployment status.

```http
GET /api/deployments/:id
```

**Response:**
```json
{
  "id": "deployment_uuid",
  "status": "approved",
  "asset_id": "asset_uuid",
  "platform": "instagram",
  "deployed_at": "2026-02-10T09:00:00Z",
  "approval_chain": [
    {
      "approver": "designer@example.com",
      "role": "designer",
      "approved_at": "2026-02-08T10:00:00Z"
    },
    {
      "approver": "artdirector@example.com",
      "role": "art_director",
      "approved_at": "2026-02-09T11:00:00Z"
    }
  ]
}
```

---

## Analytics API

### Get Brand Analytics

Retrieve analytics for a specific brand.

```http
GET /api/analytics/brands/:id
```

**Query Parameters:**
- `start_date`: ISO 8601 date
- `end_date`: ISO 8601 date
- `metrics`: Comma-separated list (compliance, velocity, engagement)

**Response:**
```json
{
  "brand_id": "brand_uuid",
  "period": {
    "start": "2026-02-01T00:00:00Z",
    "end": "2026-02-07T23:59:59Z"
  },
  "metrics": {
    "average_compliance": 94.5,
    "total_assets": 156,
    "creative_velocity": 22,
    "deployment_success_rate": 98.2
  },
  "trends": {
    "compliance": [
      {"date": "2026-02-01", "value": 92},
      {"date": "2026-02-07", "value": 95}
    ]
  }
}
```

---

## WebSocket Events

Connect to real-time updates via WebSocket.

**Connection URL:** `wss://api.brandos.app/v1/ws`

**Authentication:**
```javascript
const ws = new WebSocket('wss://api.brandos.app/v1/ws');
ws.send(JSON.stringify({
  type: 'authenticate',
  token: 'access_token'
}));
```

### Event Types

#### brand-updated
```json
{
  "type": "brand-updated",
  "brand_id": "brand_uuid",
  "changes": {
    "palette": [...],
    "updated_by": "user_uuid"
  }
}
```

#### asset-created
```json
{
  "type": "asset-created",
  "asset_id": "asset_uuid",
  "brand_id": "brand_uuid"
}
```

#### deployment-status-changed
```json
{
  "type": "deployment-status-changed",
  "deployment_id": "deployment_uuid",
  "status": "approved"
}
```

#### user-presence
```json
{
  "type": "user-presence",
  "workspace_id": "workspace_uuid",
  "user_id": "user_uuid",
  "status": "online"
}
```

---

## Error Handling

All errors follow a consistent format:

```json
{
  "error": {
    "code": "INVALID_BRAND_ID",
    "message": "The specified brand ID does not exist",
    "details": {
      "brand_id": "invalid_uuid"
    },
    "request_id": "req_uuid"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or expired access token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request parameters |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Rate Limiting

API requests are rate-limited to ensure fair usage:

- **Free Tier:** 100 requests/hour
- **Pro Tier:** 1,000 requests/hour
- **Enterprise Tier:** 10,000 requests/hour

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1644249600
```

---

## SDK Examples

### JavaScript/TypeScript

```typescript
import { BrandOSClient } from '@brandos/sdk';

const client = new BrandOSClient({
  accessToken: 'your_access_token'
});

// Create a brand
const brand = await client.brands.create({
  name: 'New Brand',
  doctrine: 'Minimalist aesthetic',
  palette: [...]
});

// Generate assets
const job = await client.assets.create({
  prompt: 'Modern poster design',
  brand_id: brand.id,
  model_id: 'gemini-3-pro-preview'
});

// Subscribe to real-time updates
client.on('asset-created', (asset) => {
  console.log('New asset:', asset);
});
```

### Python

```python
from brandos_sdk import BrandOSClient

client = BrandOSClient(access_token='your_access_token')

# Create a brand
brand = client.brands.create(
    name='New Brand',
    doctrine='Minimalist aesthetic',
    palette=[...]
)

# Generate assets
job = client.assets.create(
    prompt='Modern poster design',
    brand_id=brand.id,
    model_id='gemini-3-pro-preview'
)
```

---

**For support and questions, visit:** https://docs.brandos.app or contact api-support@brandos.app
