# Brand OS User Guide

**Welcome to Brand OS** — Transform your brand guidelines into an intelligent creative system.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating Your First Brand](#creating-your-first-brand)
3. [Understanding Brand DNA](#understanding-brand-dna)
4. [Generating Assets](#generating-assets)
5. [Using Mood Boards](#using-mood-boards)
6. [Managing Your Asset Library](#managing-your-asset-library)
7. [Deployment & Publishing](#deployment--publishing)
8. [Team Collaboration](#team-collaboration)
9. [Analytics & Insights](#analytics--insights)
10. [Best Practices](#best-practices)

---

## Getting Started

### Sign Up & Authentication

1. Navigate to [brandos.app](https://brandos.app)
2. Click **"Sign in with Google"**
3. Grant the necessary permissions
4. You'll be automatically redirected to your dashboard

### Dashboard Overview

Your dashboard displays:
- **Active Brands**: All brand profiles in your workspace
- **Recent Assets**: Latest generated assets
- **Quick Actions**: Create brand, generate asset, view analytics
- **System Status**: Platform health indicators

---

## Creating Your First Brand

### Step 1: Navigate to Brand Creation

1. Click the **"+New Brand"** button in the dashboard
2. Or navigate to **Dashboard → New Profile**

### Step 2: Define Basic Information

Fill in the essential details:

```
Brand Name: "Midnight Club"
Brand Doctrine: "Mysterious euphoria meets minimalist luxury. 
Our aesthetic embraces wabi-sabi imperfection with high-contrast precision."
```

### Step 3: Set Up Your Color Palette

1. Click **"Add Color"** to define your brand palette
2. For each color, provide:
   - **Label**: "Primary", "Secondary", "Accent"
   - **Hex Code**: #2A5C82
   - **Usage Guidelines** (optional): "Dominant color, 40-60% coverage"

**Pro Tip:** Upload reference images to auto-extract colors!

### Step 4: Configure Brand Grammar

Define your brand rules:

#### Composition Rules
- **Negative Space**: 30-40%
- **Logo Placement**: Top-left quadrant, 15% coverage
- **Typography Zone**: Bottom 25%, centered

#### Emotional Tags
Add keywords that define your brand's vibe:
- Mysterious
- Euphoric
- Minimalist
- Luxurious

### Step 5: Analyze Reference Images (Optional)

Upload 3-10 reference images that represent your brand:
1. Click **"Upload References"**
2. Select images from your computer
3. AI will extract:
   - Color ratios and palette
   - Compositional patterns
   - Stylistic signatures
   - Texture preferences

### Step 6: Review DNA Spectrum

Brand OS automatically calculates your brand's DNA:
- **Energy**: 78/100 (How dynamic vs. calm)
- **Warmth**: 42/100 (How warm vs. cool)
- **Sophistication**: 94/100 (How refined vs. casual)

---

## Understanding Brand DNA

### What is Brand DNA?

Brand DNA is a data-driven representation of your brand's visual identity that AI can interpret and apply consistently.

### DNA Spectrum Explained

| Dimension | Low (0-33) | Medium (34-66) | High (67-100) |
|-----------|------------|----------------|---------------|
| **Energy** | Calm, serene, contemplative | Balanced, approachable | Dynamic, bold, urgent |
| **Warmth** | Cool, technical, minimal | Neutral, versatile | Warm, friendly, inviting |
| **Sophistication** | Casual, playful, accessible | Professional, balanced | Luxury, refined, exclusive |

### Brand Grammar Rules

Grammar rules are IF/THEN constraints that AI follows:

```yaml
IF asset_type == "flyer"
THEN:
  - logo_placement: "top-left"
  - negative_space: ">35%"
  - primary_color_dominance: "40-60%"
```

---

## Generating Assets

### Quick Generation

1. Navigate to **Studio** view
2. Enter your prompt: `"Futuristic nightclub flyer for summer event"`
3. Select:
   - **Brand**: Midnight Club
   - **AI Model**: Gemini 3 Pro (recommended)
   - **Asset Type**: Flyer
4. Click **"Generate"**

### Advanced Generation

For more control, adjust **Intensity Sliders**:

- **Energy**: 80/100 → More dynamic, bold visuals
- **Warmth**: 45/100 → Cooler, technical aesthetic
- **Sophistication**: 90/100 → Highly refined outputs

**Batch Generation**: Generate 4-10 variations at once for more options.

### Understanding Compliance Scores

Each generated asset receives a compliance score (0-100%):

| Score | Meaning | Action |
|-------|---------|--------|
| 95-100% | Excellent brand alignment | Approved for use |
| 85-94% | Good with minor issues | Review suggested fixes |
| 70-84% | Moderate compliance | Regenerate with adjustments |

| <70% | Poor alignment | Review brand grammar rules |

### Iterative Refinement

If an asset scores below 90%:

1. Review **Compliance Details**:
   - Color Match: 92%
   - Spatial Compliance: 88%
   - Vibe Check: 85%

2. View **Suggested Fixes**:
   - "Increase negative space to 38%"
   - "Shift primary color coverage to 50%"

3. Click **"Regenerate with Fixes"** to apply suggestions automatically

---

## Using Mood Boards

### What are Mood Boards?

Interactive visual canvases where you assemble inspiration, brand rules, and creative direction before generating assets.

### Creating a Mood Board

1. Navigate to **Moodboard** view
2. Click **"+ New Moodboard"**
3. Name it: "Summer Campaign 2026"

### Adding Nodes

#### Image Reference Node
- Drag inspiration images onto the canvas
- AI extracts visual patterns and colors

#### Text Attribute Node
- Add text descriptions: "Wabi-sabi texture", "Asymmetrical balance"

#### Style Attribute Node
- Define specific styles: "Low saturation gradients", "Textural depth"

#### Logic Gate Node
- Create conditional rules: "IF outdoor scene THEN increase contrast by 20%"

### Connecting Nodes

Draw connections between nodes to create relationships:

```
Image Reference → Style Attributes → Prompt Generator → Asset Output
```

### Generating from Mood Board

1. Click **"Generate from Mood Board"**
2. AI synthesizes all nodes into a comprehensive prompt
3. Review the generated prompt before proceeding
4. Adjust prompt manually if needed
5. Click **"Generate Assets"**

---

## Managing Your Asset Library

### Library Overview

Your asset vault stores all generated creative assets with full metadata and compliance tracking.

### Filtering Assets

Use advanced filters to find specific assets:
- **Brand**: Filter by brand profile
- **Type**: Flyer, logo, social media, etc.
- **Compliance Score**: Show only assets above 90%
- **Date Range**: Last 7 days, 30 days, custom
- **Tags**: Custom tags you've added

### Asset Actions

For each asset, you can:
- **Download**: High-resolution download (8K)
- **Edit Metadata**: Update tags, descriptions
- **Analyze**: Re-run compliance analysis
- **Deploy**: Submit for approval workflow
- **Delete**: Remove from library

### Bulk Operations

Select multiple assets to:
- **Bulk Download**: Download as ZIP
- **Bulk Tag**: Add tags to multiple assets
- **Bulk Deploy**: Submit multiple assets for approval

---

## Deployment & Publishing

### Approval Workflow

Brand OS uses a multi-stage approval process:

```
Designer → Art Director → Deploy
```

#### Roles & Permissions

| Role | Can Create | Can Approve | Can Deploy |
|------|------------|-------------|------------|
| Designer | ✅ | ❌ | ❌ |
| Art Director | ✅ | ✅ | ❌ |
| Admin | ✅ | ✅ | ✅ |

### Submitting for Approval

1. Navigate to **Deployment Hub**
2. Click **"New Deployment Request"**
3. Select:
   - **Asset**: Choose from your library
   - **Platform**: Instagram, LinkedIn, Website, etc.
   - **Scheduled Date**: When to publish
   - **Caption/Notes**: Add context

4. Click **"Submit for Review"**

### Approval Process

**For Art Directors:**
1. Navigate to **Deployment Hub → Pending Approvals**
2. Review submitted assets
3. Click **"Approve"** or **"Request Changes"**
4. Add feedback if requesting changes

**Status Tracking:**
- 🟡 **Pending**: Awaiting approval
- 🟢 **Approved**: Ready for deployment
- 🔴 **Rejected**: Requires revisions
- ✅ **Deployed**: Successfully published

### Platform Integrations

#### Instagram
- Automatic posting to feed/stories
- Caption generation with brand voice
- Hashtag suggestions

#### LinkedIn
- Company page posting
- Carousel post support
- Professional caption formatting

#### Website/CMS
- Direct upload to content management system
- SEO-optimized metadata
- Automatic alt-text generation

---

## Team Collaboration

### Workspace Management

#### Creating a Workspace

1. Navigate to **Settings → Workspaces**
2. Click **"+ New Workspace"**
3. Enter workspace details:
   - Name: "Creative Agency 2026"
   - Description: "Main production workspace"

#### Inviting Team Members

1. Go to **Team** view
2. Click **"Invite Member"**
3. Enter email address
4. Select role: Designer, Art Director, or Admin
5. Click **"Send Invitation"**

### Real-Time Collaboration

#### Live Presence

See who's online and what they're working on:
- **Green dot**: Currently active
- **Yellow dot**: Away (5+ minutes idle)
- **Gray dot**: Offline

#### Commenting

Add comments to any asset:
1. Open an asset in the library
2. Click **"Add Comment"**
3. Type your feedback
4. Tag team members with `@username`
5. Click **"Post"**

#### Activity Feed

Track all workspace activity:
- Asset creations
- Brand updates
- Deployment approvals
- Comments and mentions

---

## Analytics & Insights

### Brand Health Dashboard

Navigate to **Analytics** to view:

#### Compliance Trends
- **Average Compliance Score**: 94.5%
- **Trend**: ↑ 2.3% from last month
- **Top Performing Assets**: List of highest-scoring assets

#### Creative Velocity
- **Assets Generated**: 156 this month
- **Deployment Rate**: 22 assets/week
- **Success Rate**: 98.2% deployment approval

#### Team Performance
- **Top Contributors**: Leaderboard by asset creation
- **Average Review Time**: 4.2 hours
- **Collaboration Index**: 87/100

### Predictive Insights

AI-powered recommendations:
- **"Your compliance scores are highest between 2-4 PM"** → Schedule important generations then
- **"Assets with 40-45% primary color usage score 8% higher"** → Adjust brand grammar
- **"Increasing negative space by 5% improves approval rate by 12%"** → Consider updating guidelines

---

## Best Practices

### Brand DNA Setup

✅ **DO:**
- Upload 5-10 high-quality reference images
- Be specific in your brand doctrine (not just "modern")
- Test brand rules with sample generations before finalizing
- Update DNA as your brand evolves

❌ **DON'T:**
- Copy generic brand descriptions
- Set conflicting grammar rules
- Ignore low compliance scores
- Overcomplicate with too many rules

### Asset Generation

✅ **DO:**
- Start with clear, descriptive prompts
- Use batch generation for more options
- Review compliance details, not just scores
- Iterate based on AI suggestions

❌ **DON'T:**
- Use vague prompts like "make it cool"
- Ignore brand grammar violations
- Skip the refinement loop
- Generate without reviewing mood boards first

### Team Collaboration

✅ **DO:**
- Comment on assets with specific feedback
- Use deployment workflows consistently
- Review analytics monthly
- Update workspace settings regularly

❌ **DON'T:**
- Bypass approval workflows
- Leave comments unresolved
- Ignore team activity
- Grant admin access unnecessarily

### Performance Optimization

✅ **DO:**
- Archive old brands and assets
- Use filters instead of scrolling
- Download assets in batches
- Schedule deployments during off-peak hours

❌ **DON'T:**
- Keep hundreds of unused assets
- Generate maximum batch sizes unnecessarily
- Leave drafts indefinitely
- Spam regenerations

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| New Brand | `Ctrl + N` | `⌘ + N` |
| Generate Asset | `Ctrl + G` | `⌘ + G` |
| Open Search | `Ctrl + K` | `⌘ + K` |
| Save Changes | `Ctrl + S` | `⌘ + S` |
| Toggle Sidebar | `Ctrl + B` | `⌘ + B` |
| Open Analytics | `Ctrl + A` | `⌘ + A` |

---

## Troubleshooting

### Common Issues

**Problem:** Low compliance scores on all assets  
**Solution:** Review your brand grammar rules for contradictions. Try regenerating with simplified rules first.

**Problem:** Slow generation times  
**Solution:** Large batch sizes (8-10) can take longer. Try smaller batches (3-4) for faster results.

**Problem:** Assets don't match reference images  
**Solution:** Upload more references and ensure they represent your brand accurately. AI learns from quantity and quality.

**Problem:** Deployment not working  
**Solution:** Verify platform integrations in Settings → Integrations. Re-authenticate if needed.

---

## Getting Help

- **Documentation**: [docs.brandos.app](https://docs.brandos.app)
- **Support Email**: support@brandos.app
- **Community Forum**: [community.brandos.app](https://community.brandos.app)
- **Video Tutorials**: [learn.brandos.app](https://learn.brandos.app)

---

**Welcome to the future of brand-aligned creativity!** 🎨✨
