# Brandin.Studio - Comprehensive Website Content Plan

**Document Version:** 1.0  
**Date:** February 8, 2026  
**Purpose:** Complete content strategy for all website pages with SEO optimization and component recommendations

---

## Table of Contents

1. [Page Architecture & Grouping](#page-architecture--grouping)
2. [SEO Strategy Overview](#seo-strategy-overview)
3. [Marketing Pages](#marketing-pages)
4. [Product Pages](#product-pages)
5. [Company Pages](#company-pages)
6. [Legal & Compliance Pages](#legal--compliance-pages)
7. [Technical & Support Pages](#technical--support-pages)
8. [Component Library Reference](#component-library-reference)

---

## Page Architecture & Grouping

### Information Architecture

```
├── Marketing Hub
│   ├── Landing (/)
│   ├── Product (/product)
│   ├── Identity (/identity)
│   └── Doctrine (/doctrine)
│
├── Platform Hub
│   ├── Studio (/studio)
│   ├── Audit (/audit)
│   └── API Reference (/api)
│
├── Company Hub
│   ├── Company (/company)
│   ├── Manifesto (/manifesto)
│   ├── Careers (/careers)
│   └── Press (/press)
│
├── Support Hub
│   ├── Contact (/contact)
│   ├── Resources (/resources)
│   ├── Documentation (/docs)
│   └── Status (/status)
│
└── Legal Hub
    ├── Legal (/legal)
    ├── Terms (/terms)
    ├── Privacy (/privacy)
    ├── Cookies (/cookies)
    ├── Security (/security)
    └── Licenses (/licenses)
```

---

## SEO Strategy Overview

### Global SEO Requirements

**Primary Keywords:**
- AI Branding Platform
- Brand Operating System
- Automated Brand Consistency
- AI Brand Management
- Generative AI for Brands

**Secondary Keywords:**
- Brand DNA System
- Creative Brand Automation
- Brand Prompt Generation
- Visual Brand Guidelines AI
- Brand Identity Automation

**Technical SEO Checklist:**
- [ ] Unique meta titles (50-60 characters)
- [ ] Compelling meta descriptions (150-160 characters)
- [ ] Structured data (Organization, Product, Article)
- [ ] Open Graph tags for social sharing
- [ ] XML sitemap with priority weights
- [ ] Mobile-responsive design
- [ ] Core Web Vitals optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Internal linking strategy
- [ ] Image optimization (WebP, lazy loading, alt text)
- [ ] Schema markup for breadcrumbs

### Page Priority Matrix

| Priority | Pages | Monthly Updates | SEO Focus |
|----------|-------|----------------|-----------|
| P0 (Critical) | Landing, Product, Studio | Weekly | High competition keywords |
| P1 (High) | Identity, Doctrine, Audit, Documentation | Bi-weekly | Mid-tail keywords |
| P2 (Medium) | Company, Careers, Resources, API Reference | Monthly | Long-tail keywords |
| P3 (Low) | Legal pages, Status | Quarterly | Informational |

---

## Marketing Pages

### 1. Landing Page (/)

**Status:** Content refined ✓ (see `landing_page_refined.md`)

**SEO Configuration:**

```html
<!-- Meta Tags -->
<title>Brandin Studio | AI Brand Operating System for Scalable Brands</title>
<meta name="description" content="The first AI-powered Brand Operating System. Lock your visual DNA, generate infinite on-brand creative assets with 92%+ consistency. Built for creators, agencies, and fast-growing brands.">

<!-- Keywords -->
<meta name="keywords" content="AI branding platform, brand operating system, automated brand consistency, generative AI branding, brand DNA system, creative automation">

<!-- Open Graph -->
<meta property="og:title" content="Brandin Studio - AI Brand Operating System">
<meta property="og:description" content="Generate infinite on-brand creative assets with AI. Lock your visual DNA once, maintain 92%+ brand consistency forever.">
<meta property="og:image" content="https://brandin.studio/og-landing.jpg">
<meta property="og:url" content="https://brandin.studio/">

<!-- Schema.org -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Brandin Studio",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

**Components:** (Already defined in refined doc)

---

### 2. Product Page (/product)

**SEO Configuration:**

```html
<title>Product Features | Brandin Studio - AI Brand Management Platform</title>
<meta name="description" content="Explore Brandin Studio's AI-powered brand management features: DNA Anchors, automated prompt generation, brand consistency auditing, and real-time portfolio analytics.">
<meta name="keywords" content="brand management software, AI brand features, brand consistency tools, automated creative generation, brand analytics platform">
```

**Page Structure:**

#### Hero Section
**H1:** The Complete Brand Operating System

**Subheadline:**  
Every tool you need to lock your brand identity and generate infinite on-brand creative assets with AI—from DNA definition to compliance auditing.

**CTA Primary:** Start Free Trial  
**CTA Secondary:** Watch Demo (3 min)

**Carbon Components:** `Button`, `Grid`, `Column`

---

#### Feature Overview Grid

**H2:** Four Pillars of Brand Intelligence

**Carbon Components:** `Tile`, `StructuredList`, `Tag`

##### 1. DNA Definition Engine
**Icon:** 🧬 (Use Carbon Icon: `DNA`)

**Headline:** Lock Your Visual DNA in 60 Seconds

**Description:**  
Define your brand's immutable laws—Primary Signature, Color Law, Form Behavior, and Emotional Signal—using AI-assisted analysis or manual input. Our wizard extracts anchors from 3-8 reference images or preset templates.

**Features:**
- AI-powered anchor extraction via Gemini Vision
- 12 industry-specific presets (music, fashion, tech, hospitality)
- Real-time compliance scoring
- Version history with visual diffs
- Brand Kit upload (drag-and-drop)

**Component:** `Accordion` for feature details
```jsx
<Accordion>
  <AccordionItem title="AI-Assisted Setup">
    Upload 3-8 brand images. Our Gemini-powered analyzer identifies your visual patterns and suggests DNA anchors in seconds.
  </AccordionItem>
  <AccordionItem title="Manual Precision Mode">
    Fine-tune every anchor property. Set exact hex codes, define geometric rules, and craft emotional signals with pixel-perfect control.
  </AccordionItem>
</Accordion>
```

---

##### 2. Prompt Generation Studio
**Icon:** ✨ (Use Carbon Icon: `MagicWand`)

**Headline:** Generate Compliant Prompts in 10 Seconds

**Description:**  
Turn your Brand DNA into production-ready prompts for Midjourney, DALL-E, Flux, and Stable Diffusion. Our compiler ensures 92%+ anchor adherence while allowing creative variation through SVI inputs.

**Features:**
- Multi-AI syntax support (MJ v6, DALL-E 3, Flux.1)
- 15 preset use cases (album art, social posts, packaging, ads)
- Batch generation (4-20 variations)
- One-click regeneration with mood variations
- Negative prompt optimization

**Component:** `CodeSnippet` for prompt examples
```jsx
<CodeSnippet type="multi">
  {`[MIDJOURNEY v6 PROMPT]
/imagine [PRIMARY_SIGNATURE: Fractured obsidian monolith] 
centered in vast Saharan dunes at golden hour, 
[COLOR_LAW: 80% burnt umber #4A2E1F, 15% desert sand #C9A86A] 
with [EMOTIONAL_SIGNAL: mystical reverence], 
[FORM_BEHAVIOR: perfect bilateral symmetry], 
album cover for "Desert Frequencies" 
--ar 1:1 --style raw --v 6`}
</CodeSnippet>
```

---

##### 3. Brand Audit Suite
**Icon:** 🎯 (Use Carbon Icon: `CheckmarkOutline`)

**Headline:** Real-Time Compliance Monitoring

**Description:**  
Track brand consistency across every generation. Our linter analyzes prompt adherence, color accuracy, and emotional tone alignment—providing actionable health scores and drift warnings.

**Features:**
- Pre-generation validation (blocks non-compliant prompts)
- Post-generation vision analysis (Gemini-powered)
- Consistency trend charts (weekly/monthly)
- Anchor fidelity breakdowns (per-element scoring)
- Drift alerts with auto-correction suggestions

**Component:** `DataTable` for audit logs
```jsx
<DataTable
  headers={['Generation', 'Compliance', 'Anchors', 'Status']}
  rows={[
    { id: '1', generation: 'Album Art v3', compliance: '94%', anchors: '4/4', status: 'Pass' },
    { id: '2', generation: 'Social Post', compliance: '88%', anchors: '3/4', status: 'Warning' }
  ]}
/>
```

---

##### 4. Portfolio & Analytics
**Icon:** 📊 (Use Carbon Icon: `Dashboard`)

**Headline:** Organize, Export, and Analyze at Scale

**Description:**  
Manage unlimited generations with smart tagging, series grouping, and powerful search. Export brand books, ZIP archives, or share public portfolios—all with built-in analytics.

**Features:**
- Masonry gallery with filters (date, mood, preset, compliance)
- Campaign series grouping
- PDF Brand Book export (includes DNA definition)
- ZIP bundle downloads
- Public portfolio links (password-protected option)
- Generation heatmaps and top-performing moods

**Component:** `Tabs` for portfolio views
```jsx
<Tabs>
  <Tab label="Gallery">Masonry view with filters</Tab>
  <Tab label="Series">Campaign-grouped assets</Tab>
  <Tab label="Analytics">Insights dashboard</Tab>
  <Tab label="Exports">PDF/ZIP downloads</Tab>
</Tabs>
```

---

#### Technical Specifications

**H2:** Built for Scale and Speed

**Carbon Component:** `StructuredList`

**Performance Guarantees:**
- ⚡ Prompt generation: <10 seconds (p95)
- 🎨 Image analysis: <5 seconds per upload
- 📦 Batch processing: 20 variations in <60 seconds
- 🔄 Real-time updates: WebSocket-powered dashboard
- 💾 Storage: Unlimited generations (Pro tier)

**Integration Capabilities:**
- **API Access:** RESTful API with SDKs (JS, Python, Ruby)
- **Webhooks:** Real-time generation notifications
- **Zapier:** 3,000+ app integrations
- **Direct Exports:** Canva, Figma, Google Drive, Dropbox
- **Team Collaboration:** Slack/Discord bot for approvals

**Component:** `ProgressIndicator` for system health
```jsx
<ProgressIndicator currentIndex={4}>
  <ProgressStep label="API" description="99.9% uptime" />
  <ProgressStep label="Storage" description="Unlimited" />
  <ProgressStep label="Speed" description="<10s generations" />
</ProgressIndicator>
```

---

#### Comparison Table

**H2:** How Brandin Compares

**Carbon Component:** `DataTable` with sorting

| Feature | Brandin Studio | Traditional Brand Tools | Generic AI Generators |
|---------|---------------|------------------------|---------------------|
| Brand Consistency | 92%+ guaranteed | Manual enforcement | 40-60% (uncontrolled) |
| Setup Time | <60 seconds | Days/weeks | N/A |
| Multi-AI Support | ✓ (4 platforms) | N/A | Single-platform |
| Real-time Auditing | ✓ | Manual reviews | None |
| Team Collaboration | ✓ | Limited | None |
| API Access | ✓ | Rare | Limited |
| Price (starting) | Free/$9/mo | $50-500/mo | $10-30/mo |

---

#### Pricing Teaser

**H2:** Start Free, Scale as You Grow

**Brief pricing overview (detailed on dedicated pricing page)**

**Carbon Component:** `Tile` for tier cards

**Free Tier:** 1 brand, 20 generations/month  
**Pro ($9/mo):** Unlimited brands & generations  
**Agency ($49/mo):** Team seats, advanced analytics  

**CTA:** See Full Pricing →

---

#### Final CTA

**H1:** Lock Your Brand DNA. Unlock Infinite Creativity.

**Subheadline:**  
Join 1,000+ creators, agencies, and brands using Brandin Studio to maintain perfect brand consistency at scale.

**CTA Primary:** Start Your Free Brand  
**CTA Secondary:** Schedule Demo

**Carbon Component:** `Button`, `Grid`

---

### 3. Identity Page (/identity)

**Status:** Content refined ✓ (see `dna_anchors_refined.md`)

**SEO Configuration:**

```html
<title>DNA Anchors | Brand Identity Framework - Brandin Studio</title>
<meta name="description" content="Learn about DNA Anchors, the strategic framework behind our Brand OS. Transform core brand values into executable rules for design, copy, and product decisions.">
<meta name="keywords" content="brand identity framework, core brand values, brand strategy system, brand DNA definition, strategic brand anchors">
```

**Additional Components:**

**Carbon Component:** `Modal` for Anchor examples
```jsx
<Modal
  modalHeading="Example: Fintech Brand Anchors"
  primaryButtonText="Apply to My Brand"
>
  <p><strong>Anchor:</strong> Empower Through Clarity</p>
  <p><strong>Design Rule:</strong> IF designing UI, THEN prioritize simplicity over features</p>
  <p><strong>Copy Rule:</strong> IF writing, THEN use plain language, eliminate jargon</p>
</Modal>
```

---

### 4. Doctrine Page (/doctrine)

**SEO Configuration:**

```html
<title>Brand Doctrine | Our Philosophy on Identity - Brandin Studio</title>
<meta name="description" content="Explore Brandin Studio's brand philosophy: why constraints fuel creativity, how recognition beats novelty, and why brand consistency is your competitive moat.">
<meta name="keywords" content="brand philosophy, brand doctrine, brand consistency principles, creative constraints, brand recognition strategy">
```

**Page Structure:**

#### Hero Section

**H1:** The Brandin Doctrine

**Subheadline:**  
Our fundamental beliefs about brand identity, creative constraints, and the future of generative branding.

**Carbon Component:** `Breadcrumb`
```
Home > Company > Doctrine
```

---

#### Core Principles

**H2:** Seven Laws of Brand Intelligence

**Carbon Component:** `Accordion` for expandable principles

##### Principle 1: Recognition > Novelty
**Tagline:** "Familiarity is Your Competitive Moat"

**Body:**  
In a world of infinite content, instant recognition is the ultimate asset. Customers don't remember "interesting"—they remember *consistent*. A brand that looks different every time trains customers to forget it. We believe a recognizable brand is a valuable brand.

**Proof Point:**  
Coca-Cola hasn't changed its script logo in 130 years. Apple's minimalism is instantly identifiable. Consistency compounds recognition over time—and recognition drives trust, which drives revenue.

**Component:** `Tile` with stat callout
```
📊 Brands with consistent presentation increase revenue by 23% (Forbes, 2023)
```

---

##### Principle 2: Constraints Fuel Creativity
**Tagline:** "Rules Don't Kill Art—They Focus It"

**Body:**  
Unlimited freedom paralyzes. A painter with every color often creates mud. But give an artist three colors and watch genius emerge. DNA Anchors aren't restrictions—they're creative accelerants. When 80% is locked, your team's energy focuses on the 20% that matters: the story, the emotion, the variation.

**Proof Point:**  
Twitter's 140-character limit spawned a new form of wit. Haiku's 5-7-5 structure created centuries of poetry. Creativity doesn't need infinite options—it needs *intelligent boundaries*.

**Component:** `Tag` for philosophical concepts
```jsx
<Tag type="purple">Constraint-Based Design</Tag>
<Tag type="blue">Essentialism</Tag>
<Tag type="green">Minimalist Systems</Tag>
```

---

##### Principle 3: Brand is Code, Not Opinion
**Tagline:** "Engineering Identity, Not Debating It"

**Body:**  
Traditional branding is subjective chaos. "Does this feel on-brand?" is an endless argument. We believe brand rules should be executable—if-then statements that eliminate ambiguity. DNA Anchors translate vision into logic, so teams execute instead of deliberate.

**Component:** `CodeSnippet` for brand logic
```js
// Brand as Code
if (designingUI) {
  applyRule("Empower Through Clarity");
  // → Use simple layouts, minimal cognitive load
}

if (writingCopy) {
  applyRule("Security is Silent");
  // → Emphasize reliability, avoid feature lists
}
```

---

##### Principle 4: AI Amplifies Identity
**Tagline:** "Generative AI Without Governance is Chaos"

**Body:**  
Tools like Midjourney and DALL-E democratized creativity—but introduced brand drift. Without constraints, every generation is a gamble. We believe AI's true power emerges when paired with structure. Our system doesn't replace creativity; it *multiplies* it by removing inconsistency.

**Stat:**  
> "AI-generated content increases output by 10x but brand drift by 40% without governance systems." —Brandin Internal Study, 2025

---

##### Principle 5: Speed is a Feature
**Tagline:** "Fast Feedback Loops Beat Perfection"

**Body:**  
In modern markets, velocity wins. A "good enough" asset shipped today beats a perfect one shipped next week. Our 10-second prompt generation and <60-second brand setup aren't just conveniences—they're competitive advantages. Speed doesn't compromise quality when constraints are intelligent.

**Component:** `ProgressIndicator` showing speed milestones
```jsx
<ProgressIndicator>
  <ProgressStep label="Brand Setup" description="60 seconds" complete />
  <ProgressStep label="First Generation" description="10 seconds" complete />
  <ProgressStep label="Portfolio Export" description="30 seconds" complete />
</ProgressIndicator>
```

---

##### Principle 6: Brand Equity is Measurable
**Tagline:** "What You Can't Measure, You Can't Manage"

**Body:**  
Brand consistency should be quantified, not guessed. Our compliance scoring (color accuracy, signature presence, emotional tone) transforms brand health from art to science. When you measure consistency at 92%+, you can confidently scale without drift.

**Component:** `Meter` for compliance visualization
```jsx
<Meter
  value={92}
  max={100}
  label="Average Brand Compliance"
  status="success"
/>
```

---

##### Principle 7: Open > Closed
**Tagline:** "Your Brand, Your Data, Your Control"

**Body:**  
We believe users own their creative outputs. Our API-first design, export flexibility, and transparent pricing mean you're never locked in. Brandin is infrastructure, not a walled garden.

**Component:** `Tag` for open principles
```jsx
<Tag type="cyan">API-First</Tag>
<Tag type="teal">Data Portability</Tag>
<Tag type="green">No Lock-In</Tag>
```

---

#### Manifesto Quote Block

**H2:** Our Commitment

**Carbon Component:** `Quote`

> "We're building the future where brand consistency is automatic, creativity is accelerated, and recognition is earned through intelligent repetition—not random variation."
> 
> — Yasser, Founder of Brandin Studio

---

#### Visual Philosophy

**H2:** Design Principles in Action

**Carbon Component:** `Tile` grid with visual examples

##### Symmetry as Signal
**Image:** Example of centered, symmetrical brand compositions  
**Caption:** "Our UI mirrors our belief: structure creates clarity."

##### Color as Law
**Image:** Brand color palettes with exact hex codes  
**Caption:** "#4A2E1F at 80% dominance—not 'dark brown-ish.' Precision matters."

##### Recognition Patterns
**Image:** Side-by-side of inconsistent vs. consistent brand examples  
**Caption:** "Left: Chaos. Right: Recognition. Consistency compounds."

---

#### Further Reading

**H2:** Explore Our Thinking

**Carbon Component:** `StructuredList` with links

- 📄 [The Recognition Manifesto](link) — Full essay on brand consistency
- 🎨 [Case Study: How EchoForge Achieved 96% Compliance](link)
- 🧠 [The Psychology of Visual Anchors](link) — Research white paper
- 🎧 [Podcast: AI, Creativity, and Constraint](link) — 45-minute interview

---

#### CTA

**H1:** Align Your Team with Brand Intelligence

**Subheadline:**  
Stop debating brand decisions. Start engineering them.

**CTA:** Build Your Brand DNA →

---

## Product Pages

### 5. Studio Page (/studio)

**SEO Configuration:**

```html
<title>Studio | Create On-Brand Assets with AI - Brandin Studio</title>
<meta name="description" content="Access your Brand Studio: generate AI prompts, manage portfolios, audit compliance, and export brand books—all in one unified workspace.">
<meta name="keywords" content="brand studio platform, AI creative studio, brand asset management, creative workflow automation, brand generation tool">
```

**Page Structure:**

#### Hero Section

**H1:** Your Brand Command Center

**Subheadline:**  
Generate, audit, organize, and export—everything you need to maintain perfect brand consistency across infinite creative projects.

**CTA Primary:** Launch Studio (requires login)  
**CTA Secondary:** Watch Studio Tour (2 min)

**Carbon Component:** `Button`, `Video Player` (embedded demo)

---

#### Studio Interface Overview

**H2:** Four Workspaces, One Unified Flow

**Carbon Component:** `Tab` for interface sections

##### Tab 1: Generator
**Description:**  
The heart of your creative workflow. Select presets, input SVI (mood/context/twist), and generate batches of compliant prompts in seconds.

**Key Features:**
- Preset library (15 categories)
- Custom prompt builder
- Batch size control (1-20)
- Real-time compliance preview
- One-click copy to clipboard
- Multi-AI syntax toggle (MJ/DALL-E/Flux)

**Component:** `Form` mockup
```jsx
<FormGroup>
  <Select labelText="Preset" options={['Album Art', 'Social Post', 'Pattern']} />
  <TextInput labelText="Mood (SVI)" placeholder="e.g., melancholic, energetic" />
  <TextInput labelText="Context (SVI)" placeholder="e.g., desert sunset, urban rooftop" />
  <TextInput labelText="Twist (SVI)" placeholder="e.g., vintage film grain" />
  <NumberInput label="Batch Size" value={5} min={1} max={20} />
  <Button>Generate Prompts</Button>
</FormGroup>
```

---

##### Tab 2: Portfolio
**Description:**  
Your searchable archive of every generation. Filter by date, mood, preset, or compliance score. Group into campaigns, favorite standouts, and export entire series.

**Key Features:**
- Masonry gallery view
- Advanced filters (8 parameters)
- Smart tagging (AI-powered)
- Series grouping
- Bulk actions (export/delete/tag)
- Public link sharing

**Component:** `DataTable` + `OverflowMenu`
```jsx
<DataTable
  headers={['Thumbnail', 'Prompt', 'Date', 'Compliance', 'Actions']}
  rows={portfolioData}
  toolbar={
    <TableToolbar>
      <TableToolbarSearch />
      <TableToolbarContent>
        <Button>Export Selected</Button>
      </TableToolbarContent>
    </TableToolbar>
  }
/>
```

---

##### Tab 3: Audit
**Description:**  
Real-time brand health monitoring. Track compliance trends, identify drift, and get actionable recommendations to maintain consistency.

**Key Features:**
- Compliance timeline chart
- Anchor-level breakdowns
- Drift alerts (email/Slack)
- Top-performing moods
- Generation heatmaps
- Health score (0-100)

**Component:** `LineChart` for trends
```jsx
<LineChart
  title="Brand Consistency Over Time"
  data={complianceData}
  options={{
    axes: {
      bottom: { title: 'Date', scaleType: 'time' },
      left: { title: 'Compliance %', domain: [0, 100] }
    }
  }}
/>
```

---

##### Tab 4: Export
**Description:**  
Transform your work into deliverables. Generate PDF brand books, ZIP portfolios, or sync directly to cloud storage.

**Key Features:**
- PDF Brand Book (includes DNA definition)
- ZIP archive (all assets + metadata)
- Google Drive sync
- Dropbox export
- Custom watermarking
- Resolution control

**Component:** `Tile` for export options
```jsx
<Tile>
  <h4>PDF Brand Book</h4>
  <p>Complete brand guide with DNA anchors and generation samples</p>
  <Button kind="tertiary">Export PDF</Button>
</Tile>
```

---

#### Workflow Example

**H2:** From Concept to Asset in 3 Clicks

**Carbon Component:** `ProgressIndicator` with steps

**Step 1: Select Preset**  
Choose "Album Art" from 15 pre-configured use cases.

**Step 2: Add Variation**  
Input SVI: Mood ("melancholic"), Context ("abandoned train station"), Twist ("lomography film")

**Step 3: Generate & Export**  
Batch creates 5 compliant prompts. One-click copy to Midjourney. Save to portfolio.

---

#### Keyboard Shortcuts

**H2:** Power User Shortcuts

**Carbon Component:** `StructuredList`

| Shortcut | Action |
|----------|--------|
| `Cmd + G` | Generate batch |
| `Cmd + K` | Quick preset search |
| `Cmd + S` | Save to portfolio |
| `Cmd + E` | Export current view |
| `Cmd + /` | Show all shortcuts |

---

#### Studio Updates

**H2:** What's New in Studio

**Carbon Component:** `Notification` for changelog

- **v2.3** (Feb 2026): Added Flux.1 syntax support
- **v2.2** (Jan 2026): Portfolio series grouping
- **v2.1** (Dec 2025): Real-time compliance preview

**CTA:** See Full Changelog →

---

### 6. Audit Page (/audit)

**SEO Configuration:**

```html
<title>Brand Audit | Measure Consistency & Health - Brandin Studio</title>
<meta name="description" content="Track brand consistency with real-time audits. Measure compliance scores, analyze drift patterns, and get AI-powered recommendations to maintain brand integrity.">
<meta name="keywords" content="brand audit tool, brand consistency measurement, brand health analytics, visual identity compliance, brand governance software">
```

**Page Structure:**

#### Hero Section

**H1:** Measure What Matters: Brand Consistency

**Subheadline:**  
Turn brand governance from guesswork into data science. Track compliance, identify drift, and maintain 92%+ consistency across every creative asset.

**CTA Primary:** Audit Your Brand (Free)  
**CTA Secondary:** See Sample Report

**Carbon Component:** `Button`, `Grid`

---

#### Why Audit?

**H2:** The Hidden Cost of Inconsistency

**Carbon Component:** `Tile` with stats

**Stat 1:**  
📉 **40% Brand Drift**  
Average inconsistency in AI-generated content without governance (Brandin Study, 2025)

**Stat 2:**  
⏱️ **8 Hours/Week Wasted**  
Time teams spend fixing off-brand assets retroactively (Adobe Survey, 2024)

**Stat 3:**  
💰 **23% Revenue Loss**  
Impact of inconsistent brand presentation on sales (Forbes, 2023)

**Body:**  
Every off-brand asset dilutes recognition, confuses customers, and wastes resources. Our audit suite quantifies the problem—and automates the solution.

---

#### Audit Methodology

**H2:** How We Score Brand Compliance

**Carbon Component:** `Accordion`

##### Anchor Presence (30%)
**What We Check:**  
Is your Primary Signature visible and correctly positioned?

**Scoring Logic:**
- 100%: Signature present, unobstructed, correct scale
- 75%: Present but partially obscured or incorrect scale
- 0%: Missing or unrecognizable

---

##### Color Accuracy (25%)
**What We Check:**  
Do colors match your defined Color Law (hex codes + proportions)?

**Scoring Logic:**
- Gemini Vision extracts dominant colors
- Compares hex codes (±5% tolerance)
- Measures color area proportions (±10% tolerance)
- 100%: Exact match on both hex and proportion
- 50%: One of two correct
- 0%: Neither matches

**Component:** `ColorPalette` visualization
```jsx
<ColorPalette>
  <ColorSwatch hex="#4A2E1F" label="Burnt Umber (80%)" status="match" />
  <ColorSwatch hex="#C9A86A" label="Desert Sand (15%)" status="match" />
  <ColorSwatch hex="#FFFFFF" label="White (5%)" status="warning" />
</ColorPalette>
```

---

##### Form Behavior (20%)
**What We Check:**  
Does composition follow your symmetry/geometry rules?

**Scoring Logic:**
- Analyzes layout structure
- Checks for centered/asymmetric/radial alignment
- Validates geometric patterns (circles, triangles, grids)

---

##### Emotional Signal (25%)
**What We Check:**  
Does the overall tone match your defined emotional anchors?

**Scoring Logic:**
- Gemini analyzes mood/atmosphere
- Compares against primary/secondary emotional signals
- Uses sentiment analysis on visual cues (lighting, texture, subject)

---

#### Real-Time Audit Features

**H2:** Automated Compliance at Scale

**Carbon Component:** `StructuredList`

##### Pre-Generation Linting
**Description:**  
Our compiler validates prompts *before* generation, blocking non-compliant requests and suggesting fixes.

**Example:**  
User submits prompt missing Color Law anchor → System warns: "Missing dominant color. Add burnt umber #4A2E1F at 80%" → Prompt auto-corrected.

---

##### Post-Generation Vision Analysis
**Description:**  
After image generation (Pro tier), Gemini Vision analyzes outputs and flags drift.

**Example:**  
Generated image scores 78% compliance → Anchor breakdown shows "Color Law: 60% (accent proportions off)" → Recommendation: "Increase desert sand presence in next variation."

---

##### Trend Monitoring
**Description:**  
Weekly compliance reports show consistency over time, highlighting improvement or degradation.

**Component:** `LineChart`
```jsx
<LineChart
  title="7-Day Compliance Trend"
  data={[
    { date: '2/1', compliance: 91 },
    { date: '2/2', compliance: 93 },
    { date: '2/3', compliance: 89 },
    { date: '2/4', compliance: 94 }
  ]}
/>
```

---

#### Audit Report Sample

**H2:** What You'll See

**Carbon Component:** `Modal` with interactive report preview

**Report Sections:**
1. **Overall Health Score** (0-100)
2. **Anchor-Level Breakdown** (per DNA element)
3. **Top Drift Patterns** (common inconsistencies)
4. **Recommendations** (AI-generated fixes)
5. **Comparison to Benchmark** (your brand vs. industry avg)

**CTA:** Download Sample Report (PDF) →

---

#### Pricing for Audit Features

**H2:** Audit Capabilities by Tier

**Carbon Component:** `DataTable`

| Feature | Free | Pro | Agency |
|---------|------|-----|--------|
| Pre-Generation Linting | ✓ | ✓ | ✓ |
| Post-Generation Vision Analysis | — | ✓ | ✓ |
| Compliance Trends | — | ✓ | ✓ |
| Drift Alerts (Email/Slack) | — | ✓ | ✓ |
| Custom Audit Reports | — | — | ✓ |
| API Access for Audits | — | — | ✓ |

---

#### CTA

**H1:** Stop Guessing. Start Measuring.

**Subheadline:**  
Run your first brand audit in 60 seconds. Get a compliance score, drift analysis, and actionable recommendations—free.

**CTA Primary:** Audit My Brand Now  
**CTA Secondary:** Learn About Pro Auditing

---

## Company Pages

### 7. Company Page (/company)

**SEO Configuration:**

```html
<title>About Brandin Studio | The Team Behind the Brand OS</title>
<meta name="description" content="Meet the team building the future of brand consistency. Learn about our mission, values, and vision for AI-powered creative automation.">
<meta name="keywords" content="brandin studio team, brand tech company, AI branding startup, creative automation company, brand management SaaS">
```

**Page Structure:**

#### Hero Section

**H1:** Building the Future of Brand Intelligence

**Subheadline:**  
We're a team of designers, engineers, and brand strategists united by one belief: brand consistency should be automatic, not manual.

**Carbon Component:** `Grid` with team photo

---

#### Mission Statement

**H2:** Our Mission

**Body:**  
To empower every creator, agency, and brand with AI-powered tools that maintain perfect visual consistency at scale—transforming brand identity from static guidelines into living, intelligent systems.

**Component:** `Quote`
> "Brand is the ultimate competitive moat. We're building the infrastructure to protect it." — Yasser, Founder

---

#### Company Values

**H2:** What We Stand For

**Carbon Component:** `Tile` grid

##### Value 1: Speed Without Sacrifice
**Description:**  
Fast execution shouldn't mean sloppy quality. We optimize for both—because modern brands need velocity *and* precision.

##### Value 2: Openness Over Control
**Description:**  
Your brand, your data, your freedom. We believe in API-first design, transparent pricing, and zero lock-in.

##### Value 3: Craft Over Hype
**Description:**  
We ship features that work, not promises that sound good. Our roadmap is user-driven, our updates are tested, and our quality bar is high.

##### Value 4: Accessibility by Design
**Description:**  
Brandin isn't just for agencies with $500/month budgets—it's for solo creators launching their first brand. Free tier means free forever.

---

#### Timeline

**H2:** Our Journey

**Carbon Component:** `ProgressIndicator` (timeline style)

**Q1 2025:** Concept & Research  
Founded by Yasser after witnessing brand drift in music industry clients. Initial PRD drafted.

**Q2 2025:** MVP Development  
Built React frontend, Supabase backend, Gemini integration. Alpha launch to 20 testers.

**Q3 2025:** Beta Launch  
Public beta with 200 users. Achieved 91% avg compliance score. Iterated on UI based on feedback.

**Q4 2025:** Feature Expansion  
Added portfolio management, PDF exports, and multi-AI syntax support.

**Q1 2026:** Scale & Growth  
Hit 1,000 active brands. Launched Pro tier. Onboarding major agencies.

---

#### Team

**H2:** Meet the Builders

**Carbon Component:** `Tile` with team member cards

##### Yasser - Founder & CEO
**Bio:**  
Former brand strategist for MENA music labels. Witnessed firsthand how AI tools enabled speed but destroyed consistency. Built Brandin to solve the problem he saw everywhere.

**LinkedIn:** [Link]  
**X/Twitter:** [@YasserBrandin]

##### [Other Team Members]
[Expand as team grows]

---

#### Investors & Partners

**H2:** Backed By

**Component:** Logo grid (if applicable, otherwise skip)

[Placeholder for investor/partner logos]

---

#### Press & Recognition

**H2:** Featured In

**Carbon Component:** `Tag` + links

- 🏆 **Product Hunt:** #3 Product of the Day (Jan 2026)
- 📰 **TechCrunch:** "The Figma for Brand Prompts"
- 🎙️ **The AI Creators Podcast:** Featured interview (Dec 2025)

**CTA:** See All Press →

---

#### Join Us

**H2:** We're Hiring

**Subheadline:**  
Help us build the Brand OS for every creator on the planet.

**Open Roles:**
- Senior Fullstack Engineer (React + Supabase)
- AI/ML Engineer (Prompt Engineering Focus)
- Growth Marketing Lead

**CTA:** View Open Positions →

---

### 8. Manifesto Page (/manifesto)

**SEO Configuration:**

```html
<title>The Brandin Manifesto | Our Vision for Creative Automation</title>
<meta name="description" content="Read our founding principles: why brand consistency matters, how AI amplifies creativity, and why the future belongs to constraint-driven systems.">
<meta name="keywords" content="brand manifesto, creative automation philosophy, AI branding vision, brand consistency principles, design systems philosophy">
```

**Page Structure:**

#### Hero Section

**H1:** The Brandin Manifesto

**Subheadline:**  
Our founding document. The beliefs that drive every feature, every decision, and every line of code.

**Carbon Component:** `Breadcrumb`
```
Home > Company > Manifesto
```

---

#### Preamble

**Body:**  
We live in a paradox: tools that enable infinite creation but produce forgettable results. Generative AI democratized speed, but it commoditized identity. Every brand now looks like a Midjourney prompt—beautiful, polished, and utterly generic.

We reject this future.

Brandin exists to prove that **constraints amplify creativity**, that **recognition beats novelty**, and that **brand equity is measurable, not mythical**.

This manifesto codifies our beliefs.

---

#### Principles (Expanded from Doctrine)

**H2:** What We Believe

[Include all 7 principles from Doctrine page, formatted as a long-form essay]

**Component:** `Accordion` for each principle with deeper philosophical exploration

---

#### The Future We're Building

**H2:** Where We're Going

**Body:**  
We envision a world where:
- Brand consistency is automatic, not manual
- AI generates infinite variations—all recognizable
- Teams debate strategy, not design details
- Every creator can build brand equity, regardless of budget
- Recognition is earned through intelligent repetition, not random experimentation

Brandin is infrastructure for this future.

---

#### Call to Action

**H1:** Join the Movement

**Subheadline:**  
Whether you're a solo creator or a global agency, Brandin is your partner in building lasting brand equity.

**CTA:** Start Building Your Brand DNA →

---

### 9. Careers Page (/careers)

**SEO Configuration:**

```html
<title>Careers at Brandin Studio | Join Our Team</title>
<meta name="description" content="Join Brandin Studio. We're hiring engineers, designers, and marketers to build the future of AI-powered brand consistency.">
<meta name="keywords" content="brandin studio jobs, AI startup careers, brand tech jobs, remote design jobs, SaaS engineering jobs">
```

**Page Structure:**

#### Hero Section

**H1:** Build the Brand OS for Every Creator

**Subheadline:**  
We're a small, ambitious team solving a massive problem: brand inconsistency at scale. Join us.

**CTA:** View Open Roles

**Carbon Component:** `Button`, `Grid`

---

#### Why Brandin?

**H2:** Why Join Us

**Carbon Component:** `Tile` grid

##### Tile 1: Impact
**Headline:** Real Users, Real Problems  
**Description:**  
1,000+ brands rely on Brandin daily. Your code ships to production weekly. Your work matters immediately.

##### Tile 2: Autonomy
**Headline:** Own Your Roadmap  
**Description:**  
We trust experts. You'll own features end-to-end—from spec to launch—with minimal overhead.

##### Tile 3: Growth
**Headline:** Learn By Doing  
**Description:**  
Work with cutting-edge AI (Gemini, Flux), modern stacks (React, Supabase), and ship constantly. Mentorship from experienced founders.

##### Tile 4: Remote-First
**Headline:** Work From Anywhere  
**Description:**  
Async culture. Global team. Quarterly offsites in MENA.

---

#### Benefits

**H2:** What We Offer

**Carbon Component:** `StructuredList`

- 💰 Competitive salary + equity
- 🏥 Health insurance (for eligible countries)
- 🌍 Remote-first culture
- 📚 $2,000/year learning budget
- 🎒 MacBook Pro + home office setup
- 🏖️ Unlimited PTO (minimum 20 days/year)
- 🚀 Quarterly in-person offsites

---

#### Open Positions

**H2:** We're Hiring

**Carbon Component:** `Accordion` for job listings

##### Senior Fullstack Engineer
**Location:** Remote (MENA timezone preferred)  
**Type:** Full-time

**Responsibilities:**
- Build and scale our React + Supabase platform
- Own features from design to deployment
- Optimize performance for 10,000+ concurrent users
- Collaborate with AI/ML team on Gemini integrations

**Requirements:**
- 5+ years React experience
- Strong Supabase or PostgreSQL knowledge
- API design & security best practices
- Portfolio of shipped products

**Apply:** [Link to application form]

---

##### AI/ML Engineer (Prompt Engineering)
**Location:** Remote  
**Type:** Full-time

**Responsibilities:**
- Design & optimize Gemini prompt pipelines
- Build compliance scoring algorithms
- Experiment with multi-modal AI models
- Research emerging generative AI platforms

**Requirements:**
- 3+ years ML/AI experience
- Deep knowledge of LLM prompt engineering
- Python + AI framework experience (PyTorch, TensorFlow)
- Familiarity with Gemini, GPT-4, or Claude APIs

**Apply:** [Link]

---

##### Growth Marketing Lead
**Location:** Remote (US/EU timezone)  
**Type:** Full-time

**Responsibilities:**
- Own entire growth funnel (awareness → conversion)
- Execute content marketing (SEO blog, case studies)
- Manage paid campaigns (Google Ads, Twitter, LinkedIn)
- Build referral & partnership programs

**Requirements:**
- 4+ years growth marketing in B2B SaaS
- SEO & content marketing expertise
- Data-driven decision-making (SQL, analytics tools)
- Portfolio of successful campaigns

**Apply:** [Link]

---

#### Hiring Process

**H2:** What to Expect

**Carbon Component:** `ProgressIndicator`

**Step 1:** Application Review (3-5 days)  
**Step 2:** Intro Call with Founder (30 min)  
**Step 3:** Technical/Portfolio Review (1-2 hours async)  
**Step 4:** Final Interview (1 hour, team meet)  
**Step 5:** Offer & Onboarding

**Total Time:** 10-14 days from application to offer

---

#### Not Seeing Your Role?

**H2:** We're Always Looking for Talent

**Body:**  
Even if there's no open position that fits, we'd love to hear from you. Send us your portfolio and a note about what you'd want to build at Brandin.

**CTA:** Email us at careers@brandin.studio

---

### 10. Press Page (/press)

**SEO Configuration:**

```html
<title>Press & Media | Brandin Studio News & Coverage</title>
<meta name="description" content="Media resources for Brandin Studio. Download press kit, read latest news, and access brand assets for journalists and content creators.">
<meta name="keywords" content="brandin studio press, brand tech news, AI startup media, press releases, brand kit download">
```

**Page Structure:**

#### Hero Section

**H1:** Press & Media

**Subheadline:**  
Resources, updates, and media assets for journalists, bloggers, and content creators covering Brandin Studio.

**CTA:** Download Press Kit (ZIP)

**Carbon Component:** `Button`

---

#### Latest News

**H2:** Recent Announcements

**Carbon Component:** `StructuredList` with dates

##### [Date: Feb 1, 2026] Brandin Studio Hits 1,000 Active Brands
**Summary:**  
Brandin Studio announced reaching 1,000 active brand profiles on its platform, with users generating over 50,000 AI prompts in Q4 2025. The milestone represents 400% growth since beta launch.

**Link:** Read full press release →

---

##### [Date: Jan 15, 2026] Series A Funding Announcement
**Summary:**  
Brandin Studio raised $2M in seed funding led by [Investor Name]. Funds will be used to expand AI model support and build team collaboration features.

**Link:** Read announcement →

---

#### Press Kit

**H2:** Media Resources

**Carbon Component:** `Tile` for downloadable assets

##### Brand Assets
- Logo files (SVG, PNG, JPG)
- Color palette (RGB, CMYK, HEX)
- Typography guidelines
- Product screenshots (high-res)
- Founder headshots

**Download:** Press Kit (12 MB ZIP)

---

##### Fact Sheet

**Company Name:** Brandin Studio  
**Founded:** Q1 2025  
**Founder:** Yasser [Last Name]  
**Headquarters:** [City], Egypt (Remote-first)  
**Employees:** [Number]  
**Funding:** $2M Seed (Jan 2026)  
**Website:** https://brandin.studio

**Product:**  
AI-powered Brand Operating System that enables creators, agencies, and brands to define "DNA Anchors" (visual identity rules) and generate infinite on-brand creative prompts with 92%+ consistency.

**Target Market:**  
Indie musicians, solopreneurs, small agencies, content creators—anyone needing fast, consistent visuals at scale.

**Key Metrics:**
- 1,000+ active brands
- 50,000+ prompts generated
- 92% average compliance score
- 4.8/5 user satisfaction

---

#### Press Coverage

**H2:** As Seen In

**Carbon Component:** `Tag` + links

- **TechCrunch** (Jan 2026): "Brandin Studio Wants to Be the Figma for AI Prompts"
- **Product Hunt** (Jan 2026): Featured #3 Product of the Day
- **The AI Creators Podcast** (Dec 2025): Founder interview on brand automation
- **VentureBeat** (Nov 2025): "How One Startup is Solving AI's Brand Consistency Problem"

**CTA:** See All Coverage →

---

#### Contact

**H2:** Media Inquiries

**Body:**  
For press inquiries, interviews, or media partnerships, contact our PR team.

**Email:** press@brandin.studio  
**Twitter:** @BrandinStudio  
**Response Time:** 24-48 hours

**Component:** `Form` for press inquiry
```jsx
<Form>
  <TextInput labelText="Your Name" required />
  <TextInput labelText="Publication" />
  <TextInput labelText="Email" type="email" required />
  <TextArea labelText="Inquiry Details" rows={4} />
  <Button type="submit">Submit</Button>
</Form>
```

---

## Support Hub

### 11. Contact Page (/contact)

**SEO Configuration:**

```html
<title>Contact Brandin Studio | Support & Inquiries</title>
<meta name="description" content="Get in touch with Brandin Studio. Sales inquiries, technical support, partnerships, and general questions—we're here to help.">
<meta name="keywords" content="brandin studio contact, brand tech support, customer service, sales inquiries, partnership opportunities">
```

**Page Structure:**

#### Hero Section

**H1:** Get in Touch

**Subheadline:**  
Have a question, need support, or want to explore partnerships? We'd love to hear from you.

**Carbon Component:** `Grid`

---

#### Contact Options

**H2:** How Can We Help?

**Carbon Component:** `Tile` grid for contact categories

##### Tile 1: Sales & Demos
**Icon:** 💼

**Description:**  
Interested in Pro or Agency tiers? Want a personalized demo? Let's talk.

**CTA:** Schedule a Demo →  
**Email:** sales@brandin.studio

---

##### Tile 2: Technical Support
**Icon:** 🛠️

**Description:**  
Experiencing issues? Need help with your brand setup? Our support team responds within 24 hours.

**CTA:** Submit a Support Ticket →  
**Email:** support@brandin.studio

**Tip:** Check our [Documentation](/docs) first—most questions are answered there!

---

##### Tile 3: Partnerships
**Icon:** 🤝

**Description:**  
Interested in integrations, reselling, or co-marketing? Let's explore opportunities.

**CTA:** Partner with Us →  
**Email:** partnerships@brandin.studio

---

##### Tile 4: Press & Media
**Icon:** 📰

**Description:**  
Journalists and content creators, visit our [Press Page](/press) for media kits and announcements.

**CTA:** View Press Resources →  
**Email:** press@brandin.studio

---

#### General Contact Form

**H2:** Send Us a Message

**Carbon Component:** `Form`

```jsx
<Form>
  <FormGroup>
    <TextInput
      id="name"
      labelText="Name"
      placeholder="Your full name"
      required
    />
  </FormGroup>
  
  <FormGroup>
    <TextInput
      id="email"
      labelText="Email"
      type="email"
      placeholder="you@example.com"
      required
    />
  </FormGroup>
  
  <FormGroup>
    <Select
      id="inquiry-type"
      labelText="Inquiry Type"
      defaultValue="general"
    >
      <SelectItem value="general" text="General Question" />
      <SelectItem value="sales" text="Sales/Demo Request" />
      <SelectItem value="support" text="Technical Support" />
      <SelectItem value="partnership" text="Partnership Opportunity" />
      <SelectItem value="press" text="Press/Media" />
    </Select>
  </FormGroup>
  
  <FormGroup>
    <TextArea
      id="message"
      labelText="Message"
      placeholder="Tell us how we can help..."
      rows={6}
      required
    />
  </FormGroup>
  
  <Button type="submit">Send Message</Button>
</Form>
```

**Response Time:** We aim to respond within 24-48 hours.

---

#### Office Information

**H2:** Where We Are

**Body:**  
Brandin Studio is a remote-first company with team members across MENA, Europe, and North America.

**Registered Office:**  
[Address]  
Qena, Egypt

**Timezone Coverage:**  
GMT+2 (MENA) to GMT-8 (PST)

---

#### Social Media

**H2:** Follow Us

**Carbon Component:** Social media icon links

- **Twitter/X:** [@BrandinStudio](link)
- **LinkedIn:** [Brandin Studio](link)
- **Instagram:** [@brandin.studio](link)
- **Discord:** [Join our community](link)

---

### 12. Resources Page (/resources)

**SEO Configuration:**

```html
<title>Resources | Guides, Templates & Tools - Brandin Studio</title>
<meta name="description" content="Free brand resources: prompt templates, DNA anchor worksheets, brand consistency guides, and AI prompting best practices for creators and agencies.">
<meta name="keywords" content="brand resources, free prompt templates, brand DNA guide, AI prompting tips, brand consistency checklist">
```

**Page Structure:**

#### Hero Section

**H1:** Free Resources for Brand Builders

**Subheadline:**  
Guides, templates, and tools to help you master brand consistency—whether you're a Brandin user or not.

**Carbon Component:** `Grid`

---

#### Resource Categories

**H2:** Browse by Category

**Carbon Component:** `Tab` for content types

##### Tab 1: Guides & Tutorials

**Carbon Component:** `StructuredList`

- 📘 **The Complete Guide to DNA Anchors** (PDF, 20 pages)  
  Learn how to define your brand's visual grammar from scratch.
  
- 🎨 **AI Prompting for Brand Consistency** (Blog post)  
  Best practices for engineering prompts that maintain identity.
  
- 🧠 **The Psychology of Visual Recognition** (White paper)  
  Research-backed insights on why consistency drives brand recall.
  
- 🎬 **Video Tutorial: First Brand Setup** (8 min)  
  Step-by-step walkthrough of creating your first DNA profile.

---

##### Tab 2: Templates & Worksheets

**Carbon Component:** `Tile` grid with download buttons

- 📝 **DNA Anchor Worksheet** (Notion template)  
  Structured framework for defining your 4 anchors manually.
  
- 🎯 **Brand Compliance Checklist** (PDF)  
  30-point audit for reviewing brand consistency.
  
- 🖼️ **Prompt Template Library** (Google Doc)  
  50+ pre-written prompt templates for common use cases.
  
- 📊 **Brand Health Scorecard** (Excel/Sheets)  
  Track consistency over time with this simple spreadsheet.

---

##### Tab 3: Case Studies

**Carbon Component:** `Card` grid

##### Case Study 1: EchoForge (Music Label)
**Tagline:** "How a Desert Music Label Achieved 96% Compliance"

**Summary:**  
EchoForge, a MENA-based music label, used Brandin Studio to maintain consistent visual identity across 50+ album releases in 6 months—while reducing design costs by 60%.

**Key Metrics:**
- 96% avg compliance score
- 200+ prompts generated
- 60% cost reduction vs. hiring designers

**CTA:** Read Full Case Study →

---

##### Case Study 2: NexusFlow (SaaS Startup)
**Tagline:** "Scaling a Brand from MVP to Series A"

**Summary:**  
NexusFlow maintained brand consistency during hypergrowth—from seed stage to Series A—using Brandin's automated prompt generation for all marketing assets.

**CTA:** Read Case Study →

---

##### Tab 4: Tools & Calculators

- 🧮 **Brand Consistency Calculator**  
  Input your current workflow; see potential time/cost savings with Brandin.
  
- 🎨 **Color Harmony Checker**  
  Validate your Color Law's visual appeal before locking it in.
  
- 📐 **Prompt Length Optimizer**  
  Analyze your prompts for optimal length and token efficiency.

---

#### Community Resources

**H2:** Learn from Other Users

**Body:**  
Join our Discord community to share prompts, get feedback, and learn from 1,000+ brand builders.

**CTA:** Join Discord Community →

---

#### Newsletter

**H2:** Stay Updated

**Subheadline:**  
Get monthly tips on AI prompting, brand strategy, and new Brandin features.

**Component:** `Form` (inline email signup)
```jsx
<Form inline>
  <TextInput
    id="email"
    labelText="Email"
    placeholder="you@example.com"
  />
  <Button type="submit">Subscribe</Button>
</Form>
```

---

### 13. Documentation Page (/docs)

**Status:** Content refined ✓ (see `system_docs_refined.md`)

**Additional Structure:**

#### Documentation Hub Layout

**Carbon Component:** `SideNav` for doc navigation

**Main Categories:**
1. Getting Started
2. Core Concepts
3. Brand Setup
4. Generation Workflows
5. Portfolio Management
6. API Reference
7. Integrations
8. Troubleshooting

**Each category uses `Accordion` for nested articles**

---

## Technical & Support Pages

### 14. API Reference Page (/api)

**SEO Configuration:**

```html
<title>API Reference | Brandin Studio Developer Docs</title>
<meta name="description" content="Complete API documentation for Brandin Studio. Integrate brand generation, compliance auditing, and portfolio management into your applications.">
<meta name="keywords" content="brandin api, brand automation api, ai prompt api, brand management api documentation, developer integration">
```

**Page Structure:**

#### Hero Section

**H1:** Brandin Studio API

**Subheadline:**  
RESTful API for integrating brand generation and compliance checking into your applications. Available on Agency tier.

**CTA:** Get API Key (requires Agency plan)

**Carbon Component:** `Button`, `Grid`

---

#### Quick Start

**H2:** Get Started in 5 Minutes

**Carbon Component:** `CodeSnippet` with tabs for languages

##### JavaScript
```javascript
// Install SDK
npm install @brandin/sdk

// Initialize
import Brandin from '@brandin/sdk';
const client = new Brandin({ apiKey: 'YOUR_API_KEY' });

// Generate prompts
const prompts = await client.generate({
  brandId: 'brand_abc123',
  preset: 'album-art',
  svi: {
    mood: 'melancholic',
    context: 'desert sunset',
    twist: 'vintage film grain'
  },
  batchSize: 5
});

console.log(prompts);
```

##### Python
```python
# Install SDK
pip install brandin-sdk

# Initialize
from brandin import Client
client = Client(api_key='YOUR_API_KEY')

# Generate prompts
prompts = client.generate(
    brand_id='brand_abc123',
    preset='album-art',
    svi={
        'mood': 'melancholic',
        'context': 'desert sunset',
        'twist': 'vintage film grain'
    },
    batch_size=5
)

print(prompts)
```

---

#### Authentication

**H2:** API Keys

**Body:**  
All API requests require authentication via an API key passed in the `Authorization` header.

**Component:** `CodeSnippet`
```bash
curl https://api.brandin.studio/v1/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"brandId": "brand_abc123", "preset": "album-art"}'
```

**Security Note:**  
Keep your API keys secret. Never expose them in client-side code or public repositories.

---

#### Core Endpoints

**H2:** Available Endpoints

**Carbon Component:** `Accordion` for each endpoint

##### POST /v1/generate
**Description:** Generate brand-compliant prompts

**Request Body:**
```json
{
  "brandId": "string (required)",
  "preset": "string (required)",
  "svi": {
    "mood": "string",
    "context": "string",
    "twist": "string"
  },
  "batchSize": "number (1-20, default: 5)",
  "targetAI": "string (midjourney|dalle|flux)"
}
```

**Response:**
```json
{
  "prompts": [
    {
      "id": "gen_xyz789",
      "text": "Full prompt text...",
      "negativePrompt": "Exclusion list...",
      "complianceScore": 0.94,
      "anchorBreakdown": {
        "primarySignature": 1.0,
        "colorLaw": 0.95,
        "formBehavior": 0.92,
        "emotionalSignal": 0.88
      }
    }
  ]
}
```

---

##### GET /v1/brands/:brandId
**Description:** Retrieve brand DNA definition

**Response:**
```json
{
  "id": "brand_abc123",
  "name": "EchoForge",
  "essence": "Sonic artifacts from deserts",
  "anchors": {
    "primarySignature": {
      "description": "Fractured obsidian monolith",
      "rigidity": "locked"
    },
    "colorLaw": {
      "dominant": { "hex": "#4A2E1F", "percent": 80 }
    }
  }
}
```

---

##### POST /v1/audit
**Description:** Audit compliance of an existing image

**Request:**
```json
{
  "brandId": "brand_abc123",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "complianceScore": 0.87,
  "anchorBreakdown": {
    "primarySignature": 0.9,
    "colorLaw": 0.75,
    "formBehavior": 1.0,
    "emotionalSignal": 0.85
  },
  "recommendations": [
    "Increase burnt umber (#4A2E1F) proportion from 65% to 80%"
  ]
}
```

---

#### Rate Limits

**H2:** API Usage Limits

**Carbon Component:** `DataTable`

| Tier | Requests/min | Requests/day | Burst |
|------|-------------|--------------|-------|
| Agency | 60 | 10,000 | 120 |
| Enterprise | Custom | Custom | Custom |

**Headers:**
- `X-RateLimit-Limit`: Total requests allowed
- `X-RateLimit-Remaining`: Requests left in window
- `X-RateLimit-Reset`: Unix timestamp for reset

---

#### SDKs

**H2:** Official Libraries

**Carbon Component:** `StructuredList`

- **JavaScript/TypeScript:** `npm install @brandin/sdk`
- **Python:** `pip install brandin-sdk`
- **Ruby:** `gem install brandin`
- **Go:** (Coming soon)

---

#### Webhooks

**H2:** Event Notifications

**Body:**  
Configure webhooks to receive real-time notifications for generation completions, audit results, and compliance warnings.

**Supported Events:**
- `generation.completed`
- `generation.failed`
- `audit.completed`
- `brand.updated`

**Component:** `CodeSnippet` for webhook payload example
```json
{
  "event": "generation.completed",
  "timestamp": "2026-02-08T12:00:00Z",
  "data": {
    "generationId": "gen_xyz789",
    "brandId": "brand_abc123",
    "complianceScore": 0.94
  }
}
```

---

#### Support

**H2:** Need Help?

**Body:**  
Check our [Documentation](/docs) for detailed guides, or email api@brandin.studio for technical support.

**Response Time:** 24 hours for Agency tier; 4 hours for Enterprise

---

### 15. Status Page (/status)

**SEO Configuration:**

```html
<title>System Status | Brandin Studio Uptime & Performance</title>
<meta name="description" content="Real-time status of Brandin Studio services. Check API uptime, generation speed, and system incidents.">
<meta name="keywords" content="brandin status, system uptime, api status, service health, system performance">
```

**Page Structure:**

#### Hero Section

**H1:** System Status

**Subheadline:**  
Real-time monitoring of Brandin Studio services.

**Current Status Indicator:**

**Carbon Component:** `InlineNotification`

```jsx
// If all systems operational
<InlineNotification
  kind="success"
  title="All Systems Operational"
  subtitle="Last updated: 2 minutes ago"
  hideCloseButton
/>

// If incident active
<InlineNotification
  kind="warning"
  title="Partial Service Disruption"
  subtitle="Generation API experiencing delays. Investigating."
  hideCloseButton
/>
```

---

#### Service Status

**H2:** Current Service Health

**Carbon Component:** `DataTable`

| Service | Status | Uptime (30d) | Avg Response Time |
|---------|--------|--------------|-------------------|
| Web App | 🟢 Operational | 99.95% | 1.2s |
| Generation API | 🟢 Operational | 99.87% | 8.3s |
| Audit API | 🟢 Operational | 99.92% | 4.1s |
| Gemini Integration | 🟢 Operational | 99.78% | 2.5s |
| Supabase Database | 🟢 Operational | 99.99% | 0.3s |
| Authentication | 🟢 Operational | 100% | 0.8s |

**Status Legend:**
- 🟢 Operational
- 🟡 Degraded Performance
- 🔴 Outage

---

#### Uptime Chart

**H2:** 90-Day Uptime History

**Carbon Component:** `LineChart` or `BarChart`

[Visual chart showing uptime percentage over 90 days]

---

#### Incident History

**H2:** Recent Incidents

**Carbon Component:** `Accordion`

##### [Resolved] Generation API Timeout - Feb 5, 2026
**Duration:** 23 minutes  
**Impact:** 15% of generation requests experienced >30s delays

**Timeline:**
- 14:32 UTC: Issue detected via monitoring
- 14:35 UTC: Identified Gemini API rate limit
- 14:42 UTC: Implemented fallback queue
- 14:55 UTC: All requests processing normally

**Resolution:**  
Increased Gemini API quota and added queue-based retry logic.

---

##### [Resolved] Database Connection Pool Exhaustion - Jan 28, 2026
**Duration:** 8 minutes  
**Impact:** 5% of users experienced login failures

**Resolution:**  
Increased Supabase connection pool size and optimized query patterns.

---

#### Subscribe to Updates

**H2:** Get Notified

**Body:**  
Receive email/SMS alerts for service disruptions.

**Component:** `Form`
```jsx
<Form inline>
  <TextInput
    id="email"
    labelText="Email"
    placeholder="you@example.com"
  />
  <Button type="submit">Subscribe</Button>
</Form>
```

---

#### System Metrics

**H2:** Performance Metrics (Last 24h)

**Carbon Component:** `Tile` grid with stats

- **Avg Generation Time:** 8.7s
- **API Success Rate:** 99.2%
- **Active Users:** 1,247
- **Prompts Generated:** 12,456

---

## Legal & Compliance Pages

### 16. Legal Hub Page (/legal)

**SEO Configuration:**

```html
<title>Legal | Brandin Studio Terms, Privacy & Policies</title>
<meta name="description" content="Legal information for Brandin Studio: terms of service, privacy policy, cookie policy, data security, and licensing terms.">
<meta name="keywords" content="brandin legal, terms of service, privacy policy, data protection, GDPR compliance, software licensing">
```

**Page Structure:**

#### Hero Section

**H1:** Legal & Policies

**Subheadline:**  
Transparency is core to our values. Here's everything you need to know about how we operate, protect your data, and define our terms.

**Carbon Component:** `Grid`

---

#### Policy Index

**H2:** Browse Our Policies

**Carbon Component:** `Tile` grid with links

##### Terms of Service
**Description:**  
Your rights and obligations when using Brandin Studio.

**Last Updated:** January 1, 2026

**CTA:** Read Terms →

---

##### Privacy Policy
**Description:**  
How we collect, use, and protect your personal data.

**Last Updated:** January 1, 2026  
**GDPR Compliant:** ✓

**CTA:** Read Privacy Policy →

---

##### Cookie Policy
**Description:**  
How we use cookies and similar tracking technologies.

**Last Updated:** January 1, 2026

**CTA:** Read Cookie Policy →

---

##### Security Policy
**Description:**  
Our commitment to data security and incident response.

**Last Updated:** January 1, 2026

**CTA:** Read Security Policy →

---

##### Licenses
**Description:**  
Software licenses, attribution, and open-source components.

**Last Updated:** January 1, 2026

**CTA:** View Licenses →

---

#### Contact Legal Team

**H2:** Questions About Our Policies?

**Body:**  
For legal inquiries, data requests (GDPR/CCPA), or compliance questions, contact our legal team.

**Email:** legal@brandin.studio

---

### 17. Terms of Service (/terms)

**SEO Configuration:**

```html
<title>Terms of Service | Brandin Studio User Agreement</title>
<meta name="description" content="Read Brandin Studio's Terms of Service: user rights, acceptable use policy, subscription terms, and intellectual property guidelines.">
```

**Page Structure:**

**Last Updated:** January 1, 2026

**H1:** Terms of Service

---

#### 1. Acceptance of Terms

**Body:**  
By accessing or using Brandin Studio ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part, do not use our Service.

---

#### 2. Description of Service

**Body:**  
Brandin Studio is a SaaS platform that enables users to:
- Define brand identity rules ("DNA Anchors")
- Generate AI prompts for creative assets
- Audit brand compliance
- Manage portfolios of generated content

---

#### 3. Account Registration

**Body:**  
To use certain features, you must create an account. You are responsible for:
- Maintaining confidentiality of your password
- All activities under your account
- Notifying us immediately of unauthorized access

**Carbon Component:** `InlineNotification` (info)
```jsx
<InlineNotification
  kind="info"
  title="Account Security"
  subtitle="Enable 2FA in Settings for enhanced protection"
/>
```

---

#### 4. Acceptable Use Policy

**H2:** Prohibited Uses

You may not use Brandin Studio to:
- Generate content that infringes copyright, trademark, or IP rights
- Create misleading, fraudulent, or deceptive materials
- Distribute malware, viruses, or harmful code
- Harass, abuse, or harm others
- Violate any applicable laws or regulations

**Enforcement:**  
We reserve the right to suspend or terminate accounts violating this policy.

---

#### 5. Intellectual Property

**H3:** User Content

You retain ownership of content you create ("User Content"). By using our Service, you grant us a limited license to:
- Store and process User Content to provide the Service
- Display User Content in portfolios (if you enable sharing)

**H3:** Brandin IP

All Service features, UI, branding, and code are proprietary to Brandin Studio. You may not:
- Reverse engineer our platform
- Extract or scrape data via automated means (except via official API)
- Resell or redistribute our Service without permission

---

#### 6. Subscription & Payment Terms

**H3:** Billing

- **Free Tier:** No payment required; subject to usage limits
- **Paid Tiers:** Billed monthly or annually via Stripe
- **Refunds:** Pro-rated refunds available within 30 days of upgrade (contact support)

**H3:** Cancellation

You may cancel your subscription anytime via Settings. Access continues until end of billing period.

**H3:** Price Changes

We may modify pricing with 30 days' notice. Existing subscribers are grandfathered at current rate for 12 months.

---

#### 7. Data & Privacy

**Body:**  
Your use of the Service is governed by our [Privacy Policy](/privacy). We collect, use, and protect data as described there.

---

#### 8. AI-Generated Content Disclaimer

**Body:**  
Brandin Studio generates prompts for AI platforms (Midjourney, DALL-E, etc.). We do not:
- Guarantee specific outputs from third-party AI services
- Control final image results (those are generated by external platforms)
- Take responsibility for content generated by users on external platforms

**Recommendation:**  
Review each platform's terms before using generated prompts.

---

#### 9. Limitation of Liability

**Body:**  
To the fullest extent permitted by law:
- Brandin Studio is provided "as is" without warranties
- We are not liable for indirect, incidental, or consequential damages
- Our total liability is limited to fees paid in the 12 months prior to claim

**Carbon Component:** `InlineNotification` (warning)
```jsx
<InlineNotification
  kind="warning"
  title="Important"
  subtitle="This is a legally binding limitation. Read carefully."
/>
```

---

#### 10. Termination

**Body:**  
We may suspend or terminate your account if you:
- Violate these Terms
- Engage in fraudulent activity
- Abuse our systems or staff

Upon termination, your access ends immediately. You may export your data within 30 days.

---

#### 11. Governing Law

**Body:**  
These Terms are governed by the laws of [Jurisdiction, e.g., Egypt]. Disputes will be resolved via binding arbitration in [City].

---

#### 12. Changes to Terms

**Body:**  
We may update these Terms periodically. Material changes will be announced via email and in-app notification.

**Continued use after changes constitutes acceptance.**

---

#### 13. Contact

**Body:**  
Questions about these Terms?  
Email: legal@brandin.studio

---

### 18. Privacy Policy (/privacy)

**SEO Configuration:**

```html
<title>Privacy Policy | Brandin Studio Data Protection</title>
<meta name="description" content="Brandin Studio Privacy Policy: How we collect, use, and protect your personal data. GDPR and CCPA compliant.">
```

**Last Updated:** January 1, 2026

**H1:** Privacy Policy

---

#### 1. Introduction

**Body:**  
At Brandin Studio, we take your privacy seriously. This Privacy Policy explains:
- What data we collect
- How we use it
- Your rights and choices

We are GDPR (EU) and CCPA (California) compliant.

---

#### 2. Data We Collect

**H3:** Information You Provide
- **Account Data:** Name, email, password (hashed)
- **Brand Data:** DNA anchors, prompts, portfolio assets
- **Payment Data:** Credit card info (processed by Stripe; we don't store card numbers)
- **Support Data:** Messages sent to support@brandin.studio

**H3:** Automatically Collected Data
- **Usage Data:** Pages visited, features used, session duration
- **Device Data:** IP address, browser type, OS
- **Cookies:** See [Cookie Policy](/cookies)

**Carbon Component:** `Accordion` for data types

---

#### 3. How We Use Your Data

**Purposes:**
- **Provide Service:** Process generations, store portfolios, deliver features
- **Improve Service:** Analyze usage patterns, fix bugs, optimize performance
- **Communication:** Send account updates, security alerts, and (if opted-in) marketing emails
- **Security:** Detect fraud, prevent abuse
- **Legal Compliance:** Respond to lawful requests (e.g., subpoenas)

**Legal Basis (GDPR):**
- Contract performance (providing Service)
- Legitimate interests (improvement, security)
- Consent (marketing emails)

---

#### 4. Data Sharing

**We Do NOT sell your data.**

**Third-Party Services:**
- **Supabase:** Database hosting (data stored in US/EU regions)
- **Google (Gemini):** AI processing (prompts sent for analysis; no storage)
- **Stripe:** Payment processing
- **Analytics:** Google Analytics, Mixpanel (anonymized)

**All third parties are contractually bound to protect your data.**

---

#### 5. Data Retention

**Body:**
- **Account Data:** Retained while your account is active
- **Portfolio Data:** Retained indefinitely unless you delete
- **Deleted Data:** Purged within 30 days of account closure

**Exceptions:**  
We may retain data longer if required by law (e.g., tax records: 7 years).

---

#### 6. Your Rights (GDPR/CCPA)

**You have the right to:**
- **Access:** Request a copy of your data
- **Correction:** Update inaccurate information
- **Deletion:** Request account and data deletion
- **Portability:** Export your data in machine-readable format
- **Opt-Out:** Unsubscribe from marketing emails
- **Restrict Processing:** Limit how we use your data

**How to Exercise Rights:**  
Email privacy@brandin.studio with your request. We respond within 30 days.

---

#### 7. Security Measures

**Body:**  
We use industry-standard security practices:
- **Encryption:** TLS for data in transit; AES-256 for data at rest
- **Access Control:** Role-based permissions; 2FA available
- **Monitoring:** 24/7 intrusion detection
- **Audits:** Annual third-party security reviews

**See [Security Policy](/security) for details.**

---

#### 8. International Transfers

**Body:**  
Your data may be transferred to/stored in countries outside your residence (e.g., US for Supabase hosting). We ensure adequate protections via:
- Standard Contractual Clauses (EU)
- Privacy Shield frameworks (where applicable)

---

#### 9. Children's Privacy

**Body:**  
Brandin Studio is not intended for users under 16. We do not knowingly collect data from children.

If you believe a child has provided data, contact privacy@brandin.studio.

---

#### 10. Changes to Privacy Policy

**Body:**  
We may update this policy to reflect legal or operational changes. Material changes will be announced via email.

**Continued use after changes constitutes acceptance.**

---

#### 11. Contact

**Body:**  
Questions about privacy?  
**Data Protection Officer:** privacy@brandin.studio

---

### 19. Cookie Policy (/cookies)

**SEO Configuration:**

```html
<title>Cookie Policy | Brandin Studio Tracking & Analytics</title>
<meta name="description" content="Learn about Brandin Studio's cookie usage: essential cookies, analytics, and how to manage your preferences.">
```

**Last Updated:** January 1, 2026

**H1:** Cookie Policy

---

#### What Are Cookies?

**Body:**  
Cookies are small text files stored on your device by websites you visit. They help us:
- Remember your login
- Analyze site usage
- Personalize your experience

---

#### Types of Cookies We Use

**Carbon Component:** `Accordion`

##### 1. Essential Cookies (Required)
**Purpose:** Enable core functionality (login, session management)

**Examples:**
- `session_id`: Maintains your login state
- `csrf_token`: Prevents security attacks

**Can You Disable?** No—these are required for the Service to function.

---

##### 2. Analytics Cookies (Optional)
**Purpose:** Understand how users interact with our platform

**Services:**
- Google Analytics (anonymized IP)
- Mixpanel (event tracking)

**Can You Disable?** Yes—via cookie banner or [Manage Preferences](/cookies/manage)

---

##### 3. Marketing Cookies (Optional)
**Purpose:** Deliver relevant ads (if we run retargeting campaigns)

**Currently:** We do NOT use marketing cookies. This may change in future.

---

#### Cookie Management

**H2:** Control Your Preferences

**Option 1:** Cookie Banner  
On first visit, you'll see a banner where you can accept/reject optional cookies.

**Option 2:** Browser Settings  
Configure cookie preferences in your browser (Chrome, Firefox, Safari, etc.).

**Option 3:** Opt-Out Tools  
- Google Analytics Opt-Out: [Link](https://tools.google.com/dlpage/gaoptout)

**Carbon Component:** `Button`
```jsx
<Button href="/cookies/manage">Manage Cookie Preferences</Button>
```

---

#### Data Retention

**Body:**  
- Session cookies: Expire when you close browser
- Persistent cookies: Stored for up to 2 years (analytics)

---

#### Updates

**Body:**  
We may update this Cookie Policy. Changes will be reflected on this page with a new "Last Updated" date.

---

### 20. Security Policy (/security)

**SEO Configuration:**

```html
<title>Security Policy | Brandin Studio Data Protection & Incident Response</title>
<meta name="description" content="Learn about Brandin Studio's security practices: encryption, access controls, incident response, and compliance certifications.">
```

**Last Updated:** January 1, 2026

**H1:** Security Policy

---

#### Our Commitment

**Body:**  
Security is foundational to Brandin Studio. We employ industry-standard practices to protect your data, prevent unauthorized access, and respond to incidents swiftly.

---

#### Security Measures

**H2:** How We Protect Your Data

**Carbon Component:** `Accordion`

##### 1. Encryption
- **In Transit:** TLS 1.3 for all data transmission
- **At Rest:** AES-256 encryption for database and file storage

---

##### 2. Access Control
- **Role-Based Access Control (RBAC):** Team members access only necessary data
- **2FA Enforcement:** Required for admin accounts
- **Password Policies:** Minimum 12 characters, complexity requirements

---

##### 3. Infrastructure Security
- **Hosting:** Supabase (SOC 2 Type II certified)
- **Monitoring:** 24/7 intrusion detection via Cloudflare
- **Firewall:** Rate limiting and DDoS protection

---

##### 4. Application Security
- **Input Validation:** All user inputs sanitized to prevent injection attacks
- **CSRF Protection:** Tokens on all state-changing requests
- **Regular Audits:** Annual penetration testing by third-party firms

---

##### 5. Data Backup
- **Frequency:** Automated daily backups
- **Retention:** 30-day backup history
- **Encryption:** Backups encrypted at rest

---

#### Incident Response

**H2:** If a Breach Occurs

**Process:**
1. **Detection:** Automated alerts + 24/7 monitoring
2. **Containment:** Isolate affected systems within 1 hour
3. **Investigation:** Root cause analysis within 24 hours
4. **Notification:** Affected users notified within 72 hours (GDPR compliance)
5. **Remediation:** Patch vulnerabilities, enhance controls

**Contact for Security Issues:**  
security@brandin.studio

**Bug Bounty Program:** (Coming Q2 2026)

---

#### Compliance Certifications

**H2:** Standards We Meet

**Carbon Component:** `Tag`

- 🔒 **GDPR:** EU data protection compliance
- 🛡️ **CCPA:** California privacy law compliance
- 🏆 **SOC 2 Type II:** (In progress—target Q3 2026)
- 🔐 **ISO 27001:** (Roadmap for 2027)

---

#### Responsible Disclosure

**H2:** Report a Vulnerability

**Body:**  
If you discover a security issue, please report it responsibly:

**Email:** security@brandin.studio  
**PGP Key:** [Link to public key]

**What to Include:**
- Detailed description of vulnerability
- Steps to reproduce
- Potential impact

**Response Time:** We acknowledge reports within 48 hours and provide updates every 5 business days.

---

#### User Security Best Practices

**H2:** Protect Your Account

**Recommendations:**
- ✅ Enable 2FA in Settings
- ✅ Use a unique, strong password
- ✅ Never share your API key
- ✅ Review connected apps regularly
- ✅ Log out on shared devices

---

### 21. Licenses Page (/licenses)

**SEO Configuration:**

```html
<title>Open Source Licenses | Brandin Studio Attributions</title>
<meta name="description" content="View open-source licenses and attributions for third-party software used in Brandin Studio.">
```

**Last Updated:** January 1, 2026

**H1:** Open Source Licenses & Attributions

---

#### Our Commitment to Open Source

**Body:**  
Brandin Studio is built on the shoulders of incredible open-source projects. We're grateful to the maintainers and contributors of these tools.

---

#### Core Dependencies

**Carbon Component:** `DataTable`

| Library | License | Purpose |
|---------|---------|---------|
| React | MIT | Frontend framework |
| Supabase | Apache 2.0 | Backend infrastructure |
| Tailwind CSS | MIT | UI styling |
| Zustand | MIT | State management |
| Lucide React | ISC | Icon library |
| React Hook Form | MIT | Form handling |
| docx | MIT | Document generation |

---

#### Full License List

**Body:**  
For a complete list of all dependencies and their licenses, see our GitHub repository:

**CTA:** View Full Licenses on GitHub →

---

#### Compliance

**Body:**  
All third-party software is used in accordance with their respective licenses. If you believe we've made an error, contact legal@brandin.studio.

---

## Component Library Reference

### Carbon Design System Components Used

**Complete List for Implementation:**

#### Navigation & Structure
- `Header` - Main site navigation
- `SideNav` - Documentation sidebar
- `Breadcrumb` - Page hierarchy
- `Tabs` - Content organization
- `Accordion` - Expandable sections

#### Forms & Input
- `Form` - Contact forms, signup
- `TextInput` - Single-line text
- `TextArea` - Multi-line text
- `Select` - Dropdown menus
- `Checkbox` - Multi-option selection
- `RadioButton` - Single-option selection
- `NumberInput` - Numeric values
- `FileUploader` - Brand kit uploads
- `Button` - All CTAs
- `Search` - Search functionality

#### Data Display
- `DataTable` - Feature comparisons, API reference
- `StructuredList` - Ordered content lists
- `Tile` - Feature cards, pricing tiers
- `Tag` - Labels, categories
- `CodeSnippet` - Code examples
- `Modal` - Overlays, popups
- `Notification` / `InlineNotification` - Alerts, status updates

#### Visualization
- `LineChart` - Compliance trends
- `BarChart` - Usage metrics
- `PieChart` - Portfolio breakdowns
- `Meter` - Compliance scores
- `ProgressIndicator` - Multi-step flows

#### Feedback & Status
- `Loading` - Async operations
- `InlineLoading` - Partial updates
- `Skeleton` - Content placeholders
- `Toast` - Temporary messages

---

## Implementation Priority

### Phase 1: Critical Pages (Weeks 1-2)
1. Landing (refine existing)
2. Product
3. Studio
4. Documentation (refine existing)

### Phase 2: Company & Support (Weeks 3-4)
5. Company
6. Contact
7. Resources
8. Careers

### Phase 3: Legal & Technical (Week 5)
9. Terms
10. Privacy
11. API Reference
12. Status

### Phase 4: Polish & SEO (Week 6)
13. Doctrine
14. Manifesto
15. Identity (refine existing)
16. Press
17-21. Legal pages

---

## SEO Optimization Checklist

### Per-Page Requirements

- [ ] Unique H1 tag (matches page title)
- [ ] Meta title (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Target keywords integrated naturally
- [ ] Internal links to 3+ related pages
- [ ] External links to authoritative sources (where relevant)
- [ ] Image alt text on all visuals
- [ ] Structured data markup (where applicable)
- [ ] Mobile-responsive layout
- [ ] Page load speed <3s

---

## Content Tone & Voice Guidelines

**Brand Voice:** Professional yet approachable; confident without arrogance; technical but not jargon-heavy.

**Writing Principles:**
1. **Clarity over cleverness** - Direct language wins
2. **Active voice preferred** - "We built" not "It was built"
3. **Concrete > Abstract** - Use specific examples
4. **Benefit-driven** - Start with "what you get" not "what it is"
5. **Scannable** - Short paragraphs, clear headers

**Avoid:**
- Marketing hyperbole ("Revolutionary!" "Game-changing!")
- Vague claims without proof ("industry-leading")
- Unnecessary jargon
- Passive constructions

---

**End of Content Plan Document**

This plan provides the complete structure for all 21 pages. Implement using Carbon Design System components, follow SEO best practices, and maintain brand voice consistency across all content.
